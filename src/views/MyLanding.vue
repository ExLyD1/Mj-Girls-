<template>
  <div class="m-auto w-1240 full_landing flex flex-col justify-center">
    <my-PKH class="pkhComp"></my-PKH>
    <div class="container_landing text-white mt-5 w-full">
      <h1 class=" text-4xl flex justify-center">НАШИ МОДЕЛИ</h1>
      
    
      
      <div 
        class="slut_wrapper flex flex-row justify-center flex-wrap mt-8 gap-5 mb-8"
        v-if="!slutStore.isLoading && slutStore.sluts.length > 0"
      > 
        <slut-card
          v-for="slut in slutStore.sluts"
          :key="slut._id"
          :slut="slut"
          
        >
          <template #name>{{ slut.name }}</template>
          <template #isFavorite><img class="w-5 h-5" src="@/assets/landing/favorite_False.png" alt=""></template>
          <template #img><img class="w-159 h-full rounded-lg" :src="slut.photo_links[0]" alt=""></template>
          <template #city>{{ slut.city }}</template>
          <template #age>{{ slut.age }}</template>
          <template #height>{{ slut.height }}</template>
          <template #weight>{{ slut.weight }}</template>
          <template #boobs>{{ slut.boobs }}</template>
          <template #hour1Price>{{ slut.hourPrices[0].price }} ₽</template>
          <template #hour2Price>{{ slut.hourPrices[0].price }} ₽</template>
          <template #nightPrice>{{ slut.hourPrices[1].price }} ₽</template>
        
        </slut-card>

      </div>

      <div v-else class="text-4xl flex justify-center mt-10">Анкет нет</div>

      <div class="flex justify-center mb-24">
        <button @click="loadMore" v-if="slutStore.hasMoreAnkets && !slutStore.loading" class="rounded-lg text-center px-4 py-3 text-white bg-myRed text-xl">
          Загрузить ещё
        </button>
      </div>

      <div class="text-3xl text-white text-center" v-if="loading">Загрузка...</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import MyPKH from '@/components/landing/MyPKH.vue';
import SlutCard from '@/components/generalComponents/SlutCard.vue';
import { useSlutStore } from '@/stores/SlutStore.js';

const slutStore = useSlutStore();

const cityName = ref(localStorage.getItem('cityName') || 'Москва');



onMounted(() => { 

  slutStore.sluts = []

  if ( slutStore.sluts.length <= 1 ) {
    slutStore.loadAnkets(cityName.value.trim());
  }
});


const loadMore = () => {
  slutStore.loadAnkets(cityName.value);
};


</script>

<style scoped>
@media screen and (max-width:1300px) {
  .full_landing{
    width: 100% !important; 
  }
  .pkhComp{
    margin-left:30px;
  }
}
</style>