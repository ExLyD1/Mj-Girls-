<template>
  <div class="container_login m-auto w-620 full_landing flex flex-col pb-52 pt-24 gap-3">
    <h1 class="text-3xl text-white font-medium">Войти</h1>


    <div class="flex flex-col gap-2">
      <div class="flex items-center justify-between p-4 textAdapt">
        <label class="flex items-center cursor-pointer">
          <input type="checkbox" v-model="rememberMe" class="sr-only">
          <div class="relative">
            <div class="block w-10 h-6 bg-gray-600 rounded-full"></div>
            <div
              class="dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300"
              :class="rememberMe ? 'transform translate-x-full' : ''"
            ></div>
          </div>
          <span class="ml-3 text-white">Запомнить меня</span>
        </label>
        <a href="#" class="text-myRed">Забыли пароль?</a>
      </div>

      <input class="text-white bg-myDark rounded-lg px-5 py-2" placeholder="Введите логин" type="text">
      <input
        :type="passwordVisible ? 'text' : 'password'"
        v-model="password"
        class="text-white bg-myDark rounded-lg px-5 py-2 z-0"
        placeholder="Введите пароль"
      >
      <img
        @click="togglePasswordVisibility"
        :src="passwordVisible ? '@/assets/login/show.png' : '@/assets/login/show.png'"
        alt="Toggle Password Visibility"
        class="w-6 h-4 relative bottom-9 left-580 cursor-pointer imgShow"
      >
    </div>

    
    <button class="text-white bg-myRed rounded-lg flex items-center justify-center text-center py-2">Войти</button>


    <div class="flex flex-row justify-center gap-3">
      <div class="text-white text-sm">Отсутствует аккаунт?</div>
      <div class="text-myRed text-sm">Создать аккаунт</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Состояния для видимости пароля и значения пароля
const passwordVisible = ref(false);
const password = ref('');

// Функция для переключения видимости пароля
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const rememberMe = ref(false);
</script>


<style scoped>
input::placeholder{
  color: #808080;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
@media screen and (max-width:655px) {
  .container_login{
    width:100%;
    padding-left: 35px;
    padding-right: 35px;  
  }
  .imgShow{
    left: 93%;
  }
  input::placeholder, .textAdapt{
    font-size: 14px;
    white-space: nowrap;
  }
}
@media screen and (max-width:450px) {
  .imgShow{
    left: 90%;
  }
}
</style>