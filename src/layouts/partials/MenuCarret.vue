<style scoped>
.rotate90 {
  transform: rotateZ(90deg);
}
</style>

<template>
    <span class="sidebar-entry-button">
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            :class="{rotate90: rotate}" 
            height="1em" 
            width="1em" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke="currentColor">
            <g><polyline points="9 18 15 12 9 6" /></g>
        </svg>
    </span>
</template>

<script>
  export default { 
    props: [ 
      'rotate'
    ],
    name: 'MenuCarret'
  }
</script>