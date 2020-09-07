# Geo Fields

With GeoFields, developers are able to filter records based on geo-coordinates. This opens up a ton of possibilities for map and location based applications. For example, apartment listing services, dating apps, delivery apps, and more.

## Location Based Filtering and Queries

The current implementation of geo filtering querying and works with _Point_ type geo fields defined on 8base tables (i.e. `[latitude, longitude]`). There are number of different geo-coordinate based predicates that can get used to query specific records. That list includes the following:

- *equals*: GeoJSONCoordinates
- *not_equals*: GeoJSONCoordinates
- *within*: GeometryInput
- *not_within*: GeometryInput
- *touches*: GeometryInput
- *not_touches*: GeometryInput
- *inside_bounds*: GeometryBoundsInput
- *not_inside_bounds*: GeometryBoundsInput
- *distance*: GeometryDistanceFilterInput

Descriptions of these different types are as follows:

**GeoJSONCoordinates**

A (multidimensional) set of coordinates following x, y, z order.

```graphql
query($latitude: Float, $longitude: Float){
	tableNameList(filter: {
    location: {
      # Equals predicate would filter for all records with an identical location lat/lon location.
      equals: [$latitude, $longitude]

      # Not_Equals predicate would filter out all records with an identical location lat/lon location.
      not_equals: [$latitude, $longitude]
    }
  }) {
    count
    items {
      ...
    }
  }
}
```

**GeometryInput**

Object describing a single geographical Geometry input. It is comprised of a GeoJSONType and a GeoJsonCoordinates. Supported types include `Point`, `MultiPoint`, `LineString`, `MultiLineString`, `Polygon`, `MultiPolygon`, `GeometryCollection`, `Feature`, `FeatureCollection`.

```graphql
query($type: String, $coordinates: GeoJSONCoordinates){
	tableNameList(filter: {
    location: {
      # Within predicate would filter for all records that fall "within" specified boundary
      within: {
        type: $type
        coordinates: $coordinates
      }
      # Not_Within predicate would filter out all records that fall "within" specified boundary
      not_within: {
        type: $type
        coordinates: $coordinates
      }
      # Touches predicate would filter for all records that fall on a specified boundary
      touches: {
        type: $type
        coordinates: $coordinates
      }
      # Touches predicate would filter out all records that fall on a specified boundary
      not_touches: {
        type: $type
        coordinates: $coordinates
      }
    }
  }) {
    count
    items { ... }
  }
}
```

**GeometryBoundsInput**

Object describing a single geographical GeometryBounds input.

```graphql
query($sw: GeoJSONCoordinates, $ne: GeoJSONCoordinates){
	tableNameList(filter: {
    location: {
      # Inside_Bounds predicate would filter for all records that fall "within" south west / north east bounds.
      inside_bounds: {
        southWest: $sw
        northEast: $ne
      }

      # Not_Inside_Bounds predicate would filter for all records that fall "within" south west / north east bounds.
      not_inside_bounds: {
        southWest: $sw
        northEast: $ne
      }
    }
  }) {
    count
    items { ... }
  }
}
```

**GeometeryDistanceFilterInput**

Object describing a single geographical Geometry distance filter input. The FloatPredicate determines how the distance operation will handle inclusion (i.e. less than, greater than, equals, etc.), while the unit is a string and can be either `meters`, `km`, or `miles`.

```graphql
query($fromPoint: GeometryInput!, $floatPredicate: FloatPredicate!, $unit: DistanceUnitType){
  tableNameList(filter: {
    location: {
      # Distance predicate would filtering for records by distance from a supplied Point.
      distance: {
        unit: $unit
        from: $fromPoint
        value: $floatPredicate
      }
    }

  }) {
  count
    items { ... }
  }
}
```

## ExtraField distance calculations

While it’s important to be able to filter records based on locations and geographic bounds, sometimes it’s the calculated result that’s needed - regardless of whether a filter is used. With the introduction of extraFields to the API, developers are now able to specify calculated results that get returned in the API response.

### Returning Distance from a Point

Using `extraFields` to calculate and return a records location from a supplied latitude and longitude point.

**Query**

```graphql
query($latlong: GeoJSONCoordinates) {
  tableNameList(
    extraFields: {
      location: {
        as: "distance"
        fn: {
          distance: {
            from: { type: Point, coordinates: $latlong }
            unit: meters
          }
        }
      }
    }
  ) {
    items {
      id
      createdAt
      updatedAt
      _extraFields {
        distance: Float
      }
    }
  }
}
```

**Response**

```graphql
{
  "data": {
    "playlistsList": {
      "items": [
        {
          "id": "ckebqz1j4007v07l82c1fgp74",
          "_extraFields": {
            "distance": 1.23442
          }
        },
        {
          "id": "ckebqz1j4007v07l937t93d9g",
          "_extraFields": {
            "distance": 9.431445
          }
        }
      ]
    }
  }
}
```

### Using ExtraFields when Geo Filtering

Often a developer will want to both filter records based on a geo-coordinate while also returning the calculated value (i.e.) distance. In such cases, the `extraFields` generated can also be used in the filter.

**Query**

```graphql
query($latlong: GeoJSONCoordinates!) {
  playlistsList(
    filter: { _extraField: { alias: "distance", float: { lt: 5 } } }
    extraFields: {
      location: {
        as: "distance"
        fn: {
          distance: {
            from: { type: Point, coordinates: $latlong }
            unit: meters
          }
        }
      }
    }
  ) {
    items {
      id
      _extraFields {
        distance: Float
      }
    }
  }
}
```

**Response**

```graphql
{
  "data": {
    "playlistsList": {
      "items": [
        {
          "id": "ckebqz1j4007v07l82c1fgp74",
          "_extraFields": {
            "distance": 1.23442
          }
        }
      ]
    }
  }
}
```
