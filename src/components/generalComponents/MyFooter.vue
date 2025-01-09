<template>
  <div class="w-full">
    <footer class="flex flex-row justify-between gap-8 w-1240 m-auto text-myTextDark py-16 bg-myDark">

      <div class="flex flex-col gap-5 w-300 first_part_footer">
        <div>
          <img src="@/assets/global/logo.png" alt="">
          <p class="text-xs pt-2 blabla">ООО "Модельное Агентство "Модус"</p>
        </div>
        <div class="text-white font-medium">
          <p>Оформить заказ</p>
          <a href="https://t.me/MajesticGirlsSupport_Bot" class="flex flex-row items-center justify-center gap-3 mt-2 bg-myRed rounded-xl py-3 px-4 w-279 tg_button">
            <img src="@/assets/footer/telegram.png" alt="">
            <p class="text-xl">Написать в Telegram</p>
          </a>
        </div>
      </div>


      <div class="flex flex-row gap-14 all_options">
        <div class="flex flex-col gap-5 w-142 first_options">
          <router-link to="/">Главная</router-link>
          <router-link to="/">О проекте</router-link>
          <router-link to="/">Реклама на сайте</router-link>
          <router-link to="/">HEALTH+</router-link>
          <router-link to="/">Города</router-link>
        </div>
        <div class="flex flex-col gap-5 w-256 second_options">
          <a href="https://telegra.ph/Majestic-Girls---polzovatelskoe-soglashenie-dlya-klientov-07-17" target="_blank" rel="noopener noreferrer">Пользовательское соглашение для клиентов</a>
          <a href="https://telegra.ph/Majestic-Girls---polzovatelskoe-soglashenie-dlya-klientov-07-17" target="_blank" rel="noopener noreferrer">Пользовательское соглашение для рекламодателей</a>
          <a href="https://telegra.ph/Majestic-Girls---polzovatelskoe-soglashenie-dlya-klientov-07-17" target="_blank" rel="noopener noreferrer">Политика конфиденциальности</a>
          <a href="https://telegra.ph/Majestic-Girls---polzovatelskoe-soglashenie-dlya-klientov-07-17" target="_blank" rel="noopener noreferrer">Контакты</a>
        </div>
      </div>

    </footer>
  </div>
</template>

<script setup>

</script>

<style scoped>
@media screen and (max-width:1300px) {
  footer{
    width: 100% !important;
    padding: 64px 30px
  }
}
@media screen and (max-width:940px) and (min-width:765px) {
  .all_options{
    gap: 10px;
    margin-left:30px;
  }
  .first_part_footer{
    width:250px !important;
  }
  .tg_button{
    width:250px;
  }
  .tg_button p{
    font-size: 18px !important;
  }
  
}
@media screen and (max-width:765px) {
  
   .all_options{
    flex-direction: column;
    gap: 2px;
   }
   .first_options, .second_options{
    gap:2px;
   }
   footer{
    padding-bottom: 20px !important;
   }
}
@media screen and (max-width:635px) {
  footer{
    flex-direction: column;
    height: 550px;
    padding-bottom: 64px !important;
  }
  .all_options{
    color:white;
    font-weight: 600;
    gap:20px;
    flex-direction: row;
  }
  .first_options, .second_options{
    gap:10px;
   }
}
@media screen and (max-width:385px) {
  .all_options{
    font-size: 15px;
  }
  .blabla{
    width: 280px !important;
  }
  .first_part_footer{
    width:270px
  }
  
}
</style>