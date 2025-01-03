<template>
  <div class="full_pass w-1240 m-auto mt-32 flex mb-96">

    <div class="flex flex-col gap-3 profile_left">
      <router-link to="/profile" class="butt py-3 px-5 w-295 rounded-2xl text-center bg-myLightDark text-white">Профиль</router-link>
      <router-link to="/favorite" class="butt py-3 px-5 w-295 rounded-2xl text-center bg-myLightDark text-white">Избранное</router-link>
      <router-link to="/changePass" class="butt py-3 px-5 w-295 rounded-2xl text-center bg-myRed text-white">Изменить пароль</router-link>
      <router-link to="/" class="butt py-3 px-5 w-295 rounded-2xl text-center border-2 border-myRed text-white">Выйти</router-link>
    </div>

    <adaptive-options class="hidden adaptOpt"></adaptive-options>

    
    <div class="flex flex-col gap-2 w-505 ml-60 password">
      <div class="flex flex-col text-white gap-1">
        <div>Введите старый пароль</div>
        <input class="py-3 px-5 rounded-xl bg-myLightDark w-full" type="text">
      </div>
      <div class="flex flex-col text-white gap-1">
        <div>Введите новый пароль </div>
        <input class="py-3 px-5 rounded-xl bg-myLightDark w-full" type="text">
      </div>
      <div class="flex flex-col text-white gap-1">
        <div>Повторите новый пароль</div>
        <input class="py-3 px-5 rounded-xl bg-myLightDark w-full" type="text">
      </div>
      <button class="w-full text-center bg-myRed rounded-xl text-white py-2 mt-2">Сохранить Изменения</button>
    </div>


  </div>
</template>

<script setup>
import AdaptiveOptions from '@/components/profile/AdaptiveOptions.vue';

</script>

<style scoped>
@media screen and (max-width:1250px) {
  .full_pass{
    width:100% !important;
  }
  .profile_left{
    margin-left:25px;
  } 
  .password{
    margin-left:10%;
    margin-top:-100px;
  }
}
@media screen and (max-width:940px){
  .adaptOpt{
    display: flex;
  }
  .profile_left{
    display: none;
  }
  .full_pass{
    flex-direction: column;
    margin-top: 0px;
  }
  .password{
    margin: 0 auto;
    margin-top:35px;
  }
}
@media screen and (max-width:550px) {
  .password{
    width:80%;
  }
}
</style>