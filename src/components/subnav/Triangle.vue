<template>
  <div class="triangle" ></div>
</template>

<script>
export default {
  name:"Triangle",
}
</script>

<style scoped>
  .triangle{
    width: 0;
    height: 0;
    border-bottom: 8px solid rgb(194,12,12);
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 0px solid transparent;
  }
</style>