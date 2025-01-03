<template>
  <div class="full_favorite w-1240 m-auto mt-8 flex mb-96">
    <div class="flex flex-col gap-3 profile_left mt-24">
      <router-link to="/profile" class="butt py-3 px-5 w-295 rounded-2xl text-center bg-myLightDark text-white">Профиль</router-link>
      <router-link to="/favorite" class="butt py-3 px-5 w-295 rounded-2xl text-center bg-myRed  text-white">Избранное</router-link>
      <router-link to="/changePass" class="butt py-3 px-5 w-295 rounded-2xl text-center bg-myLightDark text-white">Изменить пароль</router-link>
      <router-link to="/" class="butt py-3 px-5 w-295 rounded-2xl text-center border-2 border-myRed text-white">Выйти</router-link>
    </div>


    <adaptive-options class="hidden adaptOpt"></adaptive-options>


    <div class="flex flex-row justify-center flex-wrap gap-5 mb-8">
      <slut-card
          v-for="(slut,index) in slutData"
          :key="index"
        >
        <template #name>{{ slut.name }}</template>
        <template #isFavorite><img class="w-5 h-5" src="@/assets/landing/favorite_True.png" alt=""></template>
        <template #img><img class="w-159 h-full rounded-lg" src="@/assets/landing/girl.jpg" alt=""></template>
        <template #city>{{ slut.city }}</template>
        <template #age>{{ slut.age }}</template>
        <template #height>{{ slut.height }}</template>
        <template #weight>{{ slut.weight }}</template>
        <template #boobs>{{ slut.boobs }}</template>
        <template #hour1Price>{{ slut.hour1Price }}</template>
        <template #hour2Price>{{ slut.hour2Price }}</template>
        <template #nightPrice>{{ slut.nightPrice }}</template>
        <template #category1>{{ slut.category1 }}</template>
        <template #category2>{{ slut.category2 }}</template>
        <template #category3>{{ slut.category3 }}</template>
        <template #category4>{{ slut.category4 }}</template>
        
      </slut-card>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import SlutCard from '@/components/generalComponents/SlutCard.vue';
import AdaptiveOptions from '@/components/profile/AdaptiveOptions.vue';

const slutData = ref([
  {
    name: 'Алина',
    city: 'Москва',
    age : '64',
    height : '200',
    weight : '83',
    boobs : '4',
    hour1Price : '200.000р',
    hour2Price : '200.000р',
    nightPrice : '200.000р',
    category1 : 'Выезд',
    category2 : 'Апартаменты',
    category3 : 'Мальчишники',
    category4 : 'Health+',
  },
  {
    name: 'Алина',
    city: 'Москва',
    age : '64',
    height : '200',
    weight : '83',
    boobs : '4',
    hour1Price : '200.000р',
    hour2Price : '200.000р',
    nightPrice : '200.000р',
    category1 : 'Выезд',
    category2 : 'Апартаменты',
    category3 : 'Мальчишники',
    category4 : 'Health+',
  },
  {
    name: 'Алина',
    city: 'Москва',
    age : '64',
    height : '200',
    weight : '83',
    boobs : '4',
    hour1Price : '200.000р',
    hour2Price : '200.000р',
    nightPrice : '200.000р',
    category1 : 'Выезд',
    category2 : 'Апартаменты',
    category3 : 'Мальчишники',
    category4 : 'Health+',
  },
  {
    name: 'Алина',
    city: 'Москва',
    age : '64',
    height : '200',
    weight : '83',
    boobs : '4',
    hour1Price : '200.000р',
    hour2Price : '200.000р',
    nightPrice : '200.000р',
    category1 : 'Выезд',
    category2 : 'Апартаменты',
    category3 : 'Мальчишники',
    category4 : 'Health+',
  },
  {
    name: 'Алина',
    city: 'Москва',
    age : '64',
    height : '200',
    weight : '83',
    boobs : '4',
    hour1Price : '200.000р',
    hour2Price : '200.000р',
    nightPrice : '200.000р',
    category1 : 'Выезд',
    category2 : 'Апартаменты',
    category3 : 'Мальчишники',
    category4 : 'Health+',
  },
  {
    name: 'Алина',
    city: 'Москва',
    age : '64',
    height : '200',
    weight : '83',
    boobs : '4',
    hour1Price : '200.000р',
    hour2Price : '200.000р',
    nightPrice : '200.000р',
    category1 : 'Выезд',
    category2 : 'Апартаменты',
    category3 : 'Мальчишники',
    category4 : 'Health+',
  },
  {
    name: 'Алина',
    city: 'Москва',
    age : '64',
    height : '200',
    weight : '83',
    boobs : '4',
    hour1Price : '200.000р',
    hour2Price : '200.000р',
    nightPrice : '200.000р',
    category1 : 'Выезд',
    category2 : 'Апартаменты',
    category3 : 'Мальчишники',
    category4 : 'Health+',
  },
  {
    name: 'Алина',
    city: 'Москва',
    age : '64',
    height : '200',
    weight : '83',
    boobs : '4',
    hour1Price : '200.000р',
    hour2Price : '200.000р',
    nightPrice : '200.000р',
    category1 : 'Выезд',
    category2 : 'Апартаменты',
    category3 : 'Мальчишники',
    category4 : 'Health+',
  },
  {
    name: 'Алина',
    city: 'Москва',
    age : '64',
    height : '200',
    weight : '83',
    boobs : '4',
    hour1Price : '200.000р',
    hour2Price : '200.000р',
    nightPrice : '200.000р',
    category1 : 'Выезд',
    category2 : 'Апартаменты',
    category3 : 'Мальчишники',
    category4 : 'Health+',
  },
]);
</script>

<style scoped>
@media screen and (max-width:1250px) {
  .full_favorite{
    width: 100%;
  }
  .profile_left{
    margin-left:25px;
  }
}

@media screen and (max-width:750px) {
  .full_favorite{
    flex-direction: column;
    margin-top:0px;
  }
  .profile_left{
    display: none;
  }
  .adaptOpt{
    display: flex !important;
    margin-bottom: 20px;
  }
}
</style>