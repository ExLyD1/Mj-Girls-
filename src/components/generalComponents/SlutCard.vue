<template>
  <div class="flex flex-col bg-myDark rounded-xl p-2 w-400 text-white gap-3 card">

    <div class="flex flex-row justify-between w-full gap-3">
      <div class="text-2xl">
        <slot name="name"></slot>
      </div>
      <div class="bg-myLightDark rounded-lg p-2">
        <slot name="isFavorite"></slot>
      </div>
    </div>



    <div class="flex flex-row gap-3 w-full h-200">
      <div>
        <slot name="img"></slot>
      </div>
      <div class="flex flex-col gap-3 h-full w-222">
        <div class="flex flex-row justify-between gap-3">
          <div class="bg-myLightDark py-2 px-3 rounded-lg w-3/6 text-center">
            <slot name="city"></slot>
          </div>
          <div class="bg-myRed py-2 px-3 rounded-lg w-3/6 text-center">VIP</div>
        </div>
        <div class="bg-myLightDark py-2 px-3 h-159 w-full flex flex-col rounded-lg">
          <div class="text-xl">Характеристики:</div>
          <div class="flex flex-col">
            <div>Возраст: <slot name="age"></slot></div>
            <div>Рост: <slot name="height"></slot>см</div>
            <div>Вес: <slot name="weight"></slot>кг</div>
            <div>Грудь: <slot name="boobs"></slot></div>
          </div>
        </div>
      </div>
    </div>



    <div class="flex flex-row justify-between gap-3 h-24 prices">
      <div class="flex flex-col justify-between gap-3 hour_price whitespace-nowrap">
        <div class="bg-myLightDark py-2 px-3 rounded-lg">1 час - <slot name="hour1Price"></slot></div>
        <div class="bg-myLightDark py-2 px-3 rounded-lg">2 часа - <slot name="hour2Price"></slot></div>
      </div>
      <div class="w-222 h-full bg-myLightDark py-2 px-3 rounded-lg text-center flex justify-center items-center gap-3 night_price">
        <img src="@/assets/landing/moon.png" alt="">
        <div>Ночь - <slot name="nightPrice"></slot></div>
      </div>
    </div>



    <div class="flex flex-row w-full gap-3 text-sm categories_holder">
      <div class="bg-myLightDark rounded-xl catagories">
        <slot name="category1"></slot>
      </div>
      <div class="bg-myLightDark rounded-xl catagories">
        <slot name="category2"></slot>
      </div>
      <div class="bg-myLightDark rounded-xl catagories">
        <slot name="category3"></slot>
      </div>
      <div class="bg-myGreen rounded-xl catagories">
        <slot name="category4"></slot>
      </div>
    </div>



    <div @click="goToProfile(slut.id)" class="bg-myRed w-full flex items-center justify-center text-center rounded-lg h-12 p-2 cursor-pointer">Полная Анкета</div>

  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useSlutStore } from '@/stores/SlutStore.js';
import { useRouter } from 'vue-router';

const slutStore = useSlutStore();
const router = useRouter();

const props = defineProps({
  slut: {
    type: Object,
    required: true,
    default: () => ({}),
  },
})

function goToProfile(id) {
  router.push(`/slutPage/${id}`); 
}

</script>

<style scoped>
.catagories{
  padding: 8px 10px;
}
@media screen and (max-width:505px) {
  .card{
    width: 350px !important;
  }
  .categories_holder{
    flex-wrap: wrap;
    margin-top: 10px;
    justify-content: center;
  }
  .catagories{
    width: 45% !important;
    text-align: center;
  }
  .prices{
    flex-direction: column;
  }
  .hour_price{
    flex-direction: row;
  }
  .hour_price div{
    width:50% !important;
    text-align: center;
  }
  .night_price{
    width:100%;
  }
}
@media screen and (max-width:380px) {
  .card{
    transform: scale(0.9);
  }
}
</style>
