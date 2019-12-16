<style lang="scss" scoped>
  iframe {
    width: 100%
  }
</style>

<template>
  <div class="videoWrapper">
    <iframe 
      :src="src"  
      height="315" 
      frameborder="0"
      allowfullscreen
      allow="accelerometer; 
        encrypted-media; 
        gyroscope; 
        picture-in-picture" 
    />
  </div>
</template>

<script>
export default {
  props: {
    src: { type: String }
  }
}
</script>