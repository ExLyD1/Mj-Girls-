<template>
  <swiper
    :modules="[Thumbs]" 
    :thumbs="{ swiper: thumbsSwiper }"
    :slides-per-view="1"
    :space-between="50"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    loop="True"
    class="w-295"
  >
    <swiper-slide><img class="w-295 rounded-2xl" :src="model.link" alt=""></swiper-slide>
    <swiper-slide><img class="w-295 rounded-2xl" :src="model.link1" alt=""></swiper-slide>
    <swiper-slide><img class="w-295 rounded-2xl" :src="model.link2" alt=""></swiper-slide>
    <swiper-slide><img class="w-295 rounded-2xl" :src="model.link3" alt=""></swiper-slide>
  </swiper>

  <swiper
    :modules="[Thumbs]"
    watch-slides-progress
    @swiper="setThumbsSwiper"
    :space-between="15"
    :slides-per-view="4"
    class="w-295 mt-4"
    
  >
    <swiper-slide><img class="w-16 rounded-lg cursor-pointer" :src="model.link" alt=""></swiper-slide>
    <swiper-slide><img class="w-16 rounded-lg cursor-pointer" :src="model.link1" alt=""></swiper-slide>
    <swiper-slide><img class="w-16 rounded-lg cursor-pointer" :src="model.link2" alt=""></swiper-slide>
    <swiper-slide><img class="w-16 rounded-lg cursor-pointer" :src="model.link3" alt=""></swiper-slide>
  </swiper>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

const thumbsSwiper = ref(null);

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};

const props = defineProps({
  model: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

</script>

<style scoped>

</style>