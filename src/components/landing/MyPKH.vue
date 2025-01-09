<template>
  
  <div class="bg-myDark rounded-xl flex flex-row full_holder relative">
    <!-- Основной контент -->
    <div class="p-5 z-10 flex flex-col relative main_text">
      <div class="flex flex-col gap-3 text-white w-436 text_color">
        <div class="text-xl">Блокировки РКН</div>
        <div class="text-sm">К сожалению, доступ к основному сайту часто блокируется Роскомнадзором. Несмотря на блокировку, сайт продолжает работать. Будь в курсе всех событий, а так же подпишись на наш Телеграм-канал, чтобы участвовать в розыгрышах</div>
      </div>
        
      <a href="https://t.me/+PcI-DvFPG2thZWM6" class="flex flex-row gap-2 items-center justify-center px-5 py-2 text-white bg-myRed rounded-xl mt-9 w-64 tg" to="/">
        <img src="@/assets/footer/telegram.png" alt="">
        <p>Telegram Канал</p>
      </a>
    </div>

    <!-- Картинка на заднем плане -->
    <div class="absolute right-0 bottom-0 z-0 img_holder">
      <img class="object-cover noAdapt" src="@/assets/landing/pkhBG.png" alt="">
      <img class="object-cover adapt" src="@/assets/landing/pkhBGAdapt.png" alt="">
    </div>
  </div>








  <div class="relative bg-myDark text-white rounded-lg p-6 overflow-hidden full_holder_adapt m-5">
    <!-- Основной контент -->
    <div class="relative z-10 text-center lg:text-left lg:max-w-lg p-6">
      <h2 class="text-xl font-bold mb-4">Блокировки РКН</h2>
      <p class="text-sm mb-4">
        К сожалению, доступ к основному сайту часто блокируется Роскомнадзором. Несмотря на блокировку, сайт продолжает работать. Будь в курсе всех событий, а так же подпишись на наш Телеграм-канал, чтобы участвовать в розыгрышах.
      </p>
      <router-link 
        to="/"
        class="inline-flex items-center px-8 py-2 bg-pink-600 text-white rounded-full shadow-md hover:bg-pink-700 mb-4 gap-4"
      >
        <img src="@/assets/footer/telegram.png" alt="Telegram Icon" class="w-6 h-6" />
        Telegram Канал
      </router-link>
    </div>

    <!-- Фоновое изображение -->
    <div 
      class="absolute inset-0 bg-cover bg-center opacity-30 lg:opacity-100"
      :style="{ backgroundImage: `url(${require('@/assets/landing/pkhBG.png')})` }"
    >
    </div>
  </div>





</template>

<script setup>
</script>

<style scoped>
.full_holder {
  max-width: 1240px;
  width: 100%;
  position: relative; /* Make sure the parent has a position context */
}
.full_holder_adapt{
  display: none;
}
.adapt{
  display: none;
}
@media screen and (max-width: 1300px) {
  .full_holder {
    width: calc(100% - 60px); 
    margin: auto;
  }
}
@media screen and (max-width:980px) {
  .full_holder{
    flex-direction: column;
    height: 350px;
  }
  .img_holder{
    left: 0;
    width: 100%;
    height: 100%;
  }
  .img_holder img {
    width: 100%;
    height: 100%;
  }
  .tg{
    margin-top: 160px;
  }
  .noAdapt{
    display: none;
  }
  .adapt{
    display: flex;
  }
  .text_color{
    color: white
  }


  .full_holder {
    display: none;
  }
  .full_holder_adapt{
    display: flex;
  }
}
@media screen and (max-width:545px) {
  .text_color{
    width: 100% !important;
  }
  .tg{
    position: absolute;
    top: 140px;
  }
}
</style>
