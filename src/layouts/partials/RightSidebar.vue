<template>
    <div v-if="subtitles.length > 0 && subtitles[0].depth !== 3" class="sidebar sidebar--right hide-for-small">
        <h3>On this page</h3>
        <ul v-if="subtitles.length" class="menu-item submenu">
            <li class="submenu__item" :class="'submenu__item-depth-' + subtitle.depth" v-for="(subtitle, index) in subtitles" :key="subtitle.value + index">
            <a class="submenu__link" :href="subtitle.anchor">
                {{ subtitle.value }}
            </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  props: {
    subtitles: { type: Array, default: () => [] },
  }
}
</script>
