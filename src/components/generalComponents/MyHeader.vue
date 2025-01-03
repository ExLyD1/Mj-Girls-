<template>
  <header class="flex flex-row justify-between m-auto text-white py-14 w-1240 gap-5 z-0">
    
    <router-link to="/">
      <img class="" src="@/assets/global/logo.png" alt="">
    </router-link>



    <div class="flex flex-col gap-2 rounded-xl header_input">
      <div class="bg-myDark rounded-xl flex flex-row items-center gap-4 py-3 px-4 h-12 input">
        <img src="@/assets/header/search.svg" alt="">
        <input class="outline-none bg-myDark" type="text" placeholder="Search">
      </div>

      


      <div class="flex flex-row gap-2 under_input_options">
        <router-link class="bg-myDark px-3 py-2 w-36 rounded-xl text-center butt" to="/">Модели</router-link>
        <router-link  class="bg-myDark px-3 py-2 w-36 rounded-xl text-center butt" to="/">Health+</router-link>
        <div @click="openModalSupp" class="bg-myDark px-3 py-2 w-36 rounded-xl text-center cursor-pointer butt">Поддержка</div>
        <div @click="openModalVacancy" class="bg-myDark px-3 py-2 w-36 rounded-xl text-center cursor-pointer butt">Вакансии</div>
      </div>
    </div>



    <div class="flex flex-col gap-2 header_options">
      <div class="flex flex-row items-center gap-5 font-medium">
        <!-- <router-link to="/favorite">Избранное</router-link> -->
        <!-- <router-link class=" bg-myRed p-3 rounded-xl" to="/profile">Профиль</router-link> -->
      </div>
      <div @click="openCities" class="flex flex-row justify-between gap-5 py-2 px-4 bg-myDark rounded-lg cursor-pointer">
        <div v-if="cityName"> {{ cityName }}</div>
        <div v-else>Выберите город</div>
        <img src="@/assets/header/arrow.svg" alt="">
      </div>
    </div>



    <div class="flex flex-row gap-4">
      <div class="hidden bg-myLightDark cursor-pointer adapt_input">
        <img @click="openSearch" src="@/assets/header/search.svg" alt="">
      </div>

      <div v-if="isMobileViewSearch & isSearchVisible" :class="{'activeSearch': isSearchVisible && isMobileViewSearch, 'inputField': true, }" class="flex justify-between">
        <input type="text" placeholder="Поиск по номеру">
        <p class="mr-2" @click="closeSearch" v-if="isMobileViewSearch & isSearchVisible">✕</p>
      </div>

      <div @click="openMenu" class="hidden bg-myDark cursor-pointer adapt_menu">
        <img src="@/assets/header/menu.png" alt="">
      </div>
    </div>

  </header>



  <!-- МЕНЮЮЮ АДАПТИВ -->

  <div v-if="isMenuVisible && isMobileView" class="menu bg-myDark px-4 pt-8 text-white w-full h-full z-20 flex justify-center">
    
    <div @click="closeMenu" class="absolute right-6 top-14 w-12 h-12 close">
      <img src="@/assets/header/close.png" alt="">
    </div>

    <div class="flex flex-row justify-center flex-wrap gap-2 absolute categor_holder">
      <div @click="navigateAndReload('/')" class="bg-myLightDark rounded-xl catagories">Модели</div>
      <div @click="navigateAndReload('/')" class="bg-myLightDark rounded-xl catagories">Health+</div>
      <div @click="openModalSupp" class="bg-myLightDark rounded-xl catagories">Поддержка</div>
      <div @click="openModalVacancy" class="bg-myLightDark rounded-xl catagories">Вакансии</div>
    </div>

    <div v-if="isAuthored" class="absolute mt-135 flex flex-col gap-2 w-full justify-center items-center log_holder">
      <!-- <button 
        :class="[getButtonClass('/profile')]" 
        @click="navigateAndReload('/profile')" 
        class="rounded-2xl px-5 py-4 bg-myLightDark text-center w-300"
      >Профиль</button>
      <button 
        :class="[getButtonClass('/favorite')]" 
        @click="navigateAndReload('/favorite')" 
        class="rounded-2xl px-5 py-4 bg-myLightDark text-center w-300"
      >Избранное</button>
      <button 
        :class="[getButtonClass('/changePass')]" 
        @click="navigateAndReload('/changePass')"
        class="rounded-2xl px-5 py-4 bg-myLightDark text-center w-300"
      >Изменить пароль</button> -->
    </div>

    <div @click="openCities" class="absolute bg-myLightDark mt-96 flex justify-between rounded-xl px-5 py-4 w-300">
      <div v-if="cityName"> {{ cityName }}</div>
      <div v-else>Выберите город</div>
      <img src="@/assets/header/arrow.svg" alt="">
    </div>
    <!-- <div v-if="isAuthored" class="absolute mt-450 rounded-2xl px-5 py-4 border-2 border-myRed text-center w-300">Выйти</div> -->
    <!-- <div v-else @click="navigateAndReload('/login')" class="absolute mt-450 rounded-xl px-5 py-4 bg-myRed text-center w-300">Войти</div> -->
  </div>



  <!-- Список городов -->
  <div v-if="citiesVisible" :class="{ 'cities_list': true, 'active': citiesVisible }" class="flex flex-col mt-2" ref="modalContentRef">
    <div class="flex w-full justify-end">
      <div @click="closeCities">
        <img class="w-10 h-10" src="@/assets/header/close.png" alt="Cancel">
      </div>
    </div>
    <div class="mt-2 w-full rounded-xl bg-myLightDark text-white">
      <div @click="cityFuncs" class="cursor-pointer border-b border-myMainBg w-full pl-2 py-4">Москва</div>
      <div @click="cityFuncs" class="cursor-pointer border-b border-myMainBg w-full pl-2 py-4">Санкт-Петербург</div>
      <div @click="cityFuncs" class="cursor-pointer border-b border-myMainBg w-full pl-2 py-4">Нижний Новгород</div>
      <div @click="cityFuncs" class="cursor-pointer border-b border-myMainBg w-full pl-2 py-4">Новосибирск</div>
      <div @click="cityFuncs" class="cursor-pointer border-b border-myMainBg w-full pl-2 py-4">Ростов на дону</div>
      <div @click="cityFuncs" class="cursor-pointer border-b border-myMainBg w-full pl-2 py-4">Екатеринбург</div>
      <div @click="cityFuncs" class="cursor-pointer border-b border-myMainBg w-full pl-2 py-4">Казань</div>
      <div @click="cityFuncs" class="cursor-pointer border-b border-myMainBg w-full pl-2 py-4">Краснодар</div>
      <div @click="cityFuncs" class="cursor-pointer border-b border-myMainBg w-full pl-2 py-4">Красноярск</div>
      <div @click="cityFuncs" class="cursor-pointer border-b border-myMainBg w-full pl-2 py-4">Уфа</div>
      <div @click="cityFuncs" class="cursor-pointer border-b border-myMainBg w-full pl-2 py-4">Мурманск</div>
      <div @click="cityFuncs" class="cursor-pointer border-b border-myMainBg w-full pl-2 py-4">Иркутск</div>
      <div @click="cityFuncs" class="cursor-pointer border-b border-myMainBg w-full pl-2 py-4">Владивосток</div>
      <div @click="cityFuncs" class="cursor-pointer border-b border-myMainBg w-full pl-2 py-4">Самара</div>
      <div @click="cityFuncs" class="cursor-pointer w-full pl-2 py-4">Волгоград</div>
    </div>
  </div>




  <!-- Модалка поддержки -->
  <div 
    v-if="isModalSuppVisible" 
    :class="{ 'support_modal': true, 'active': isModalRegVisible }" 
    class="flex flex-col gap-3 bg-myLightDark rounded-3xl w-full p-5 shadow-2xl pb-12 items-center"
  >
    <div class="flex flex-row justify-between w-full">
      <div class="text-white text-3xl">Поддержка</div>

      <div class="h-11 rounded-xl cursor-pointer" @click="closeModalSupp">
        <img  class="w-11 h-11" src="@/assets/header/close.png" alt="Cancel">
      </div>
    </div>

    <div class="pt-6 text-center text-white text-lg">
      Если у вас есть какие-то вопросы или же есть нерешенные проблемы, сообщите нам об этом прямо в нашем телеграм боте!
    </div>

    <div @click="openTelegram"  class="bg-myRed rounded-xl text-white flex items-center justify-center px-10 py-3 gap-4 w-52 mt-4 cursor-pointer">
      <img src="@/assets/footer/telegram.png" alt="">
      <p>Телеграм</p>
    </div>

      
  </div>



  <!-- Модалка Вакансий -->
  <div 
    v-if="isModalVacancyVisible" 
    :class="{ 'vacancy_modal': true, 'active': isModalRegVisible }" 
    class="flex flex-col gap-3 bg-myLightDark rounded-3xl w-full p-5 shadow-2xl pb-12 items-center"
  >
    <div class="flex flex-row justify-between w-full">
      <div class="text-white text-3xl">Вакансии</div>

      <div class="h-11 rounded-xl cursor-pointer" @click="closeModalVacancy">
        <img  class="w-11 h-11" src="@/assets/header/close.png" alt="Cancel">
      </div>
    </div>

    <div class="text-2xl text-white">Временно вакансий нет</div>

    <!-- <div class="flex flex-row mt-5 text-center items-center text-white border rounded-2xl cursor-pointer w-full">
      <img class="h-44 rounded-2xl" src="@/assets/landing/girl.jpg" alt="">
      <div class="flex flex-col justify-center items-center gap-2 w-96 m-auto">
        <div class="text-lg text-blue-500 font-medium">Открыта вакансия ебаной шаболды</div>
        <div>Требования: красивая, огромные сиськи, жирная жопа</div>
      </div>
    </div>

    <div class="flex flex-row mt-5 text-center items-center text-white border rounded-2xl cursor-pointer w-full">
      <img class="h-44 rounded-2xl" src="@/assets/landing/man.jpg" alt="">
      <div class="flex flex-col justify-center items-center gap-2 w-96 m-auto">
        <div class="text-lg text-blue-500 font-medium">Открыта вакансия сутенёра</div>
        <div >Требования: огромный бабиджон, отполированые коки</div>
      </div>
    </div> -->

    <div @click="openTelegram"  class="bg-myRed rounded-xl text-white flex items-center justify-center px-10 py-3 gap-4 w-52 mt-4 cursor-pointer">
      <img src="@/assets/footer/telegram.png" alt="">
      <p>Телеграм</p>
    </div>

      
  </div>
  

</template>

<script setup>

// Импорты

import { ref, onMounted} from 'vue'
import { useRouter, useRoute } from 'vue-router';

// =========================================================
// Константы для видимости блоков
// =========================================================

const isAuthored = ref(false)
const isMenuVisible = ref(false)
const isMobileView = ref( window.innerWidth <= 940 )
const isSearchVisible = ref(true);
const isMobileViewSearch = ref( window.innerWidth <= 660 )

// =========================================================
// Проверка для ширины окна
// =========================================================

const handleResize = () => {
  isMobileView.value = window.innerWidth <= 940;
  isMenuVisible.value = false;
  isMobileViewSearch.value = window.innerWidth <= 660;

  if (isMobileViewSearch.value) {
    isSearchVisible.value = false
  } else {
    isSearchVisible.value = true
  }
}


// =========================================================
// Поиск
// =========================================================


const openSearch = () => {
  isSearchVisible.value = true;
};

const closeSearch = () => {
  isSearchVisible.value = false;
};

// =========================================================
// Функционал закрытия/открытия менюшки
// =========================================================

const openMenu = () => {
  isMenuVisible.value = true
};
const closeMenu = () => {
  isMenuVisible.value = false
}



// =========================================================
// Функционал с городами
// =========================================================

const citiesVisible = ref(false)
const modalContentRef = ref(null)
const cityName = ref(null);


const openCities = () => {
  citiesVisible.value = true;
  document.body.classList.add('overflow-hidden');
};
const closeCities = () => {
  citiesVisible.value = false;
  document.body.classList.remove('overflow-hidden'); 
};



const changeCity = (event) => {
  const cityText = event.target.innerText;
  cityName.value = cityText;
  localStorage.setItem('cityName', cityText);
};

const cityFuncs = (event) => {
  changeCity(event);
  closeCities();
}


// =========================================================
// Функционал с переходом на другие маршруты и покраски кнопок меню
// =========================================================

const router = useRouter()
const activePath = ref('');


function navigateAndReload(path) {
  console.log(path);
  
  sessionStorage.setItem('activePath', path);
  router.push(path)
    .then(() => { window.location.reload(); })
    .then(() => { 
      const menuPaths = ['/profile', '/favorite', '/changePass'];
      if (menuPaths.includes(path)) {
        getButtonClass(path);
      }
    })
}

// =========================================================
// Покраска кнопки меню
// =========================================================

function getButtonClass(path) {
  return activePath.value === path ? 'bg-myRed' : 'bg-myLightDark';
}


// =========================================================
// Функции при загрузке
// =========================================================

onMounted(() => {
  window.addEventListener('resize', handleResize);
  const storedCity = localStorage.getItem('cityName');
  if (storedCity) {
    cityName.value = storedCity;
  }


  const storedPath = sessionStorage.getItem('activePath');
  if (storedPath) {
    activePath.value = storedPath;
  }
});


// =========================================================
// Какой то шлак с маршрутами
// =========================================================

const route = useRoute();
const path_name = ref(null)


function checkRoute() {
  if( route.path === '/profile' ) {
    return 'Профиль'
  } else if ( route.path === '/favorite' ) {
    return 'Избранные'
  } else if ( route.path === '/changePass' ) {
    return 'Изменить пароль'
  } else if ( route.path === '/login' ) {
    return 'Войти'
  } 
}


// =========================================================
// какой то шлак
// =========================================================

onMounted(() => {
  path_name.value = checkRoute()
});


handleResize()

// =========================================================
// Направляем в Телеграм
// =========================================================
const telegramLinkWeb = 'https://t.me/ExLyD1'; 

const openTelegram = () => {
  window.location.href = telegramLinkWeb;
};

// =========================================================
// Модалка поддержки
// =========================================================

const isModalSuppVisible = ref(false)

const openModalSupp = () => {
  isModalSuppVisible.value = true;
};
const closeModalSupp = () => {
  isModalSuppVisible.value = false;
};


// =========================================================
// Модалка Вакансий
// =========================================================

const isModalVacancyVisible = ref(false)

const openModalVacancy = () => {
  isModalVacancyVisible.value = true;
};
const closeModalVacancy = () => {
  isModalVacancyVisible.value = false;
};
</script>

<style scoped>
.catagories{
  width:45%;
  padding: 8px 14px;
  border-radius: 10px;
  text-align: center;
}
.menu {
  position: fixed; /* Обеспечивает фиксированное положение для меню */
  top: 0; /* Начальное положение сверху */
  left: 0; /* Начальное положение слева */
  right: 0; /* Растягивает меню на всю ширину */
  bottom: 0; /* Растягивает меню на всю высоту */
}


.cities_list{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1111;
  width: 280px;
  max-height: 0vh;
  overflow-y: auto;
  transition: height 0.3s ease-in;
  animation: fadeIn 0.1s;
}
.cities_list.active {
  max-height: 100vh;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}


.support_modal{
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1111;
  width: 700px;
}

.vacancy_modal{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1111;
  width: 700px;
}

.inputField {
  margin-left: 70px;
  padding: 10px 8px;
  background-color: #1C1C1C;
  display: flex;
  border-radius: 8px;
  width:270px;
  display:flex;
}
@media screen and (max-width:1155px) {
  .inputField{
    margin-left:20px;
    }
}
.inputField input {
    border: none;
    color: black;
    outline: none;
    background-color: #1C1C1C;
  }

.inputField p {
  cursor: pointer;
}

.activeSearch {
  position: fixed;
  margin-top: -2px;
  right:87px;
  animation: expandWidth 0.5s ease-in-out forwards;
  overflow: hidden;
}
@keyframes expandWidth {
  0% {
    width: 0;
  }
  100% {
    width: 270px;
  }
}



@media screen and (max-width:1300px) {
  header{
    width: 100% !important;
    padding: 56px 30px;
  }
  .butt{
    padding: 5px 10px;
    width:100%;
  }
  .input{
    width:100%;
  }
}
@media screen and (max-width:940px) {
  .adapt_menu{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 40px;
    border-radius: 10px;
  }
  .header_options, .under_input_options{
    display: none;
  }
  header{
    align-items: center;
  }
}
@media screen and (max-width:730px) {
  .support_modal, .vacancy_modal{
    width: 500px;
  }
}
@media screen and (max-width:660px) {
  .adapt_input{
    display: block;
    height: 40px;
    width: 40px;
    border-radius: 10px;
    padding: 11px;
  }
  .header_input{
    display: none;
  }
  .img_qwe{
    display: none;
  }
  .closeSearch{
    display: block;
  }
}
@media screen and (max-width:530px) {
  .close{
    top: 5px;
    right: 5px;
  }
  .categor_holder{
    margin-top:30px
  }
  .log_holder{
    margin-top: 155px;
  }
  .support_modal, .vacancy_modal{
    width: 300px;
    text-align: center;
  }
}
</style>