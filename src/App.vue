<template>
  <div class="bg-myBg flex w-full">
    <div class="z-10 m-auto w-full">
      <!-- h-[100vh] flex flex-col justify-between" -->
      <my-header></my-header>
      <router-view></router-view>
      <my-footer class="bg-myDark w-full"></my-footer>
    </div>
    <div class="parabol z-0"></div>
  </div>
</template>

<script setup>
import MyHeader from './components/generalComponents/MyHeader.vue';
import MyFooter from './components/generalComponents/MyFooter.vue';


import { ref, onMounted } from 'vue'
import { useSlutStore } from '@/stores/SlutStore.js';

const slutStore = useSlutStore();


onMounted(async () => {
  await slutStore.fetchSluts(); // Загружаем данные при монтировании компонента
});
</script>

<style>
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
}
.parabol{
  position: fixed;
  background-image: url('@/assets/global/parabol_back.png');
  opacity: 90%;
  width:3225px;
  height: 3202px;
  top:32px;
  border: 2px;
}
::-webkit-scrollbar {
  background-color: #0E0E0E; /* Фон скроллбара */
  width: 10px;
}
::-webkit-scrollbar-thumb {
  background-color: #888; /* Цвет ползунка */
  border-radius: 10px; /* Скругление */
  border: 2px solid #555; /* Граница вокруг ползунка */
}
</style>
