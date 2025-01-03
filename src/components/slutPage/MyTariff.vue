<template>
  <div :class="$attrs.class" class="flex flex-row gap-3 rounded-lg w-44">
    <div  class=" flex flex-col gap-2 p-3 w-full">
      <div class="w-full flex flex-row justify-between">
        <slot name="tariff_img"></slot>
        <h1><slot name="time"></slot></h1>
      </div>
      <div class="w-full flex flex-row justify-between items-center mt-3">
        <p>У меня</p>
        <p><slot name="price_me"></slot></p>
      </div>
      <div class="w-full flex flex-row justify-between items-center">
        <p>У тебя</p>
        <p><slot name="price_you"></slot></p>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>

</style>