<template>
  <div class="full_profile w-1240 m-auto mt-32 flex mb-96">

    <div class="flex flex-col gap-3 profile_left">
      <router-link to="/profile" class="butt py-3 px-5 w-295 rounded-2xl text-center bg-myRed text-white">Профиль</router-link>
      <router-link to="/favorite" class="butt py-3 px-5 w-295 rounded-2xl text-center bg-myLightDark text-white">Избранное</router-link>
      <router-link to="/changePass" class="butt py-3 px-5 w-295 rounded-2xl text-center bg-myLightDark text-white">Изменить пароль</router-link>
      <router-link to="/" class="butt py-3 px-5 w-295 rounded-2xl text-center border-2 border-myRed text-white">Выйти</router-link>
    </div>

    <adaptive-options class="hidden adaptOpt"></adaptive-options>


    <div class="flex flex-col flex-wrap gap-5 h-220 text-white ml-32 profile_items">
      <div class="flex flex-col gap-1">
        <h1>Ник</h1>
        <input class="py-3 px-5 rounded-xl bg-myLightDark text-white" type="text">
      </div>
      <div class="flex flex-col gap-1">
        <h1>Email</h1>
        <input class="py-3 px-5 rounded-xl bg-myLightDark text-white" type="text">
      </div>
      <div class="flex flex-col gap-1">
        <h1>Возраст</h1>
        <input class="py-3 px-5 rounded-xl bg-myLightDark text-white" type="text">
      </div>
      <button class="py-3 px-5 rounded-xl border-2 border-myRed text-white mt-6">Сохранить Изменения</button>
    </div>
  </div>
</template>

<script setup>
import AdaptiveOptions from '@/components/profile/AdaptiveOptions.vue';
</script>

<style scoped>
.profile_items h1{
  margin-left:5px;
}
@media screen and (max-width:1250px) {
  .full_profile{
    width: 100% !important;
  }
  .profile_left{
    margin-left:25px;
  }
}
@media screen and (max-width:940px) {
  .profile_items{
    flex-direction: column;
    height: auto;
    justify-content: center;
    margin: auto;
    margin-top: 30px;
  }
  .profile_left{
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  .full_profile{
    flex-direction: column;
    margin-top:0px;
  }
  .butt{
    width:45%;
  }
  .adaptOpt{
    display: block;
  }
  .profile_left{
    display: none;
  }
  .profile_items input {
    width:350px
  }
}
@media screen and (max-width:400px) {
  .profile_items input {
    width:270px
  }
}
</style>