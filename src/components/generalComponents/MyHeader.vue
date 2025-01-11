<template>
  <header class="flex flex-row justify-between m-auto text-white py-14 w-1240 gap-5 z-0">
    
    <router-link to="/">
      <img class="logo_adaptive" src="@/assets/global/logo.png" alt="">
    </router-link>


    <!-- Инпут для пк не адаптив -->
    <div class="flex flex-col gap-2 rounded-xl header_input">
      <div class="bg-myDark rounded-xl flex flex-row items-center gap-4 py-3 px-4 h-12 input">
        <img src="@/assets/header/search.svg" alt="">
        <input 
          class="outline-none bg-myDark no-spinner w-full no-spinner" 
          type="number"
          placeholder="Поиск по номеру модели"
          v-model="searchQuery"
          @keydown.enter="foundModel" 
        >
      </div>

      


      <div class="flex flex-row gap-2 under_input_options">
        <router-link class="bg-myDark px-3 py-2 w-36 rounded-xl text-center butt cursor-pointer" to="/">Модели</router-link>
        <div @click="openModalHealth" class="bg-myDark px-3 py-2 w-36 rounded-xl text-center butt cursor-pointer" to="/">Health+</div>
        <div @click="openModalSupp" class="bg-myDark px-3 py-2 w-36 rounded-xl text-center cursor-pointer butt">Поддержка</div>
        <div @click="openModalVacancy" class="bg-myDark px-3 py-2 w-36 rounded-xl text-center cursor-pointer butt">Вакансии</div>
      </div>
    </div>


    <!-- Выбрать город -->
    <div class="flex flex-col gap-2 header_options">
      <div class="flex flex-row items-center gap-5 font-medium">
      </div>
      <div @click="openCities" class="flex flex-row justify-between gap-5 py-2 px-4 bg-myDark rounded-lg cursor-pointer">
        <div v-if="cityName"> {{ cityName }}</div>
        <div v-else>Выберите город</div>
        <img src="@/assets/header/arrow.svg" alt="">
      </div>
    </div>


    <!-- Инпут для мобил адаптив -->
    <div class="flex flex-row gap-4 relative ">

      <div class="inputAdaptive hidden flex-row ">
        
        <img v-if="!isSearchVisible" @click.stop="openSearch" class="bg-myDark cursor-pointer px-3 rounded-xl" src="@/assets/header/search.svg" alt="">

        <div v-else class="flex flex-row justify-between items-center bg-myDark text-white rounded-lg pr-2 absolute w-[200px] right-16">
          <input 
            class="w-full text-white outline-none rounded-lg p-2 bg-myDark " 
            type="number"
            placeholder="Поиск по номеру"
            v-model="searchQuery"
            @keyup.enter="foundModel" 
          >
            
          <img @click.stop="closeSearch" class="h-5 w-5" src="@/assets/header/close.svg" alt="">
        </div>

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
      <div @click="navigateAndReload('/')" class="bg-myLightDark rounded-xl catagories cursor-pointer">Модели</div>
      <div @click="openModalHealth" class="bg-myLightDark rounded-xl catagories cursor-pointer">Health+</div>
      <div @click="openModalSupp" class="bg-myLightDark rounded-xl catagories cursor-pointer">Поддержка</div>
      <div @click="openModalVacancy" class="bg-myLightDark rounded-xl catagories cursor-pointer">Вакансии</div>
    </div>

    <div @click="openCities" class="absolute bg-myLightDark mt-96 flex justify-between rounded-xl px-5 py-4 w-300">
      <div v-if="cityName"> {{ cityName }}</div>
      <div v-else>Выберите город</div>
      <img src="@/assets/header/arrow.svg" alt="">
    </div>
  </div>



  <!-- Список городов -->
  <div v-if="citiesVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
    <div 
      ref="modalContentRef" 
      :class="{ 'cities_list': true, 'active': citiesVisible }" 
      class="bg-gray-800 rounded-lg w-full max-w-lg shadow-lg p-4"
    >
      <!-- Заголовок с кнопкой закрытия -->
      <div class="flex justify-between items-center border-b border-gray-600 pb-2 mb-4">
        <h2 class="text-lg font-semibold text-white">Выберите город</h2>
        <button 
          @click="closeCities" 
          class="text-gray-400 hover:text-white transition"
        >
          <img class="w-6 h-6" src="@/assets/header/close.png" alt="Close">
        </button>
      </div>
      
      <!-- Список городов -->
      <div class="grid grid-cols-1 gap-2 text-gray-300">
        <div 
          v-for="city in cities" 
          :key="city" 
          @click="cityFuncs" 
          class="cursor-pointer py-2 px-4 rounded-lg hover:bg-gray-700 transition"
        >
          {{ city }}
        </div>
      </div>
    </div>
  </div>




  <!-- Модалка поддержки -->
  <div 
    v-if="isModalSuppVisible" 
    :class="{ 'support_modal': true, 'active': isModalRegVisible }" 
    class="flex flex-col gap-3 bg-myLightDark rounded-3xl w-full p-5 shadow-2xl pb-12 items-center justify-between"
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

    <a href="https://t.me/MajesticGirlsSupport_Bot" class="bg-myRed rounded-xl text-white flex items-center justify-center px-10 py-3 gap-4 w-52 mt-4 cursor-pointer">
      <img src="@/assets/footer/telegram.png" alt="">
      <p>Телеграм</p>
    </a>

      
  </div>

  <!-- МОдалка Health+ -->
  <div 
    v-if="isModalHealthVisible" 
    :class="{ 'support_modal': true, 'active': isModalRegVisible }" 
    class="flex flex-col gap-3 bg-myLightDark rounded-3xl w-full p-5 shadow-2xl pb-12 items-center justify-between"
  >
    <div class="flex flex-row justify-between w-full">
      <div class="text-white text-3xl">Health+</div>

      <div class="h-11 rounded-xl cursor-pointer" @click="closeModalHealth">
        <img class="w-11 h-11" src="@/assets/header/close.png" alt="Cancel">
      </div>
    </div>

    <div class="pt-6 text-center text-white text-lg">
      Health+ - вид моделей которые проходят регулярные проверки на ИППП. В анкете присутствует "Зелёное" сердечко.
    </div>

    <a href="https://t.me/MajesticGirlsSupport_Bot" class="bg-myRed rounded-xl text-white flex items-center justify-center px-10 py-3 gap-4 w-52 mt-4 cursor-pointer">
      <img src="@/assets/footer/telegram.png" alt="">
      <p>Телеграм</p>
    </a>

      
  </div>



  <!-- Модалка Вакансий --> 
  <div 
    v-if="isModalVacancyVisible" 
    :class="{ 'vacancy_modal': true, 'active': isModalRegVisible }" 
    class="flex flex-col gap-3 bg-myLightDark rounded-3xl w-full p-5 shadow-2xl pb-12 items-center justify-between"
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

    <a href="https://t.me/MajesticGirlsSupport_Bot"  class="bg-myRed rounded-xl text-white flex items-center justify-center px-10 py-3 gap-4 w-52 mt-4 cursor-pointer">
      <img src="@/assets/footer/telegram.png" alt="">
      <p>Телеграм</p>
    </a>

      
  </div>
  

</template>

<script setup>
import { useSlutStore } from '@/stores/SlutStore.js';
import { watch, ref, onMounted, nextTick, computed   } from 'vue'
import { useRouter, useRoute } from 'vue-router';
const slutStore = useSlutStore();



const searchQuery = ref('');

watch(searchQuery, (newValue) => {
  slutStore.id = newValue; 
});

const foundModel = async () => {
  if (!slutStore.isFetching) { // Проверяем флаг в хранилище
    await slutStore.fetchSlutsByInput(searchQuery.value);
    router.push(`/slutPage/${searchQuery.value}`)
  }
}



// Импорты

const cities = ref([
    "Москва", "Санкт-Петербург", "Нижний Новгород", "Новосибирск",
    "Ростов-на-Дону", "Краснодар", "Сочи", 'Омск', "Екатеринбург", "Самара", "Барнаул",
    "Красноярск", "Владивосток", "Комсомольск-на-Амуре",
]);




// =========================================================
// Константы для видимости блоков
// =========================================================

const isAuthored = ref(false)
const isMenuVisible = ref(false)
const isMobileView = ref( window.innerWidth <= 940 )
const isSearchVisible = ref(false);
const isMobileViewSearch = ref( window.innerWidth <= 660 )

// =========================================================
// Проверка для ширины окна
// =========================================================

const handleResize = () => {
  isMobileView.value = window.innerWidth <= 940;
  isMenuVisible.value = false;
  isMobileViewSearch.value = window.innerWidth <= 660;

  // if (isMobileViewSearch.value) {
  //   isSearchVisible.value = false
  // } else {
  //   isSearchVisible.value = true
  // }
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
const cityName = ref(localStorage.getItem('cityName') || 'Москва'); // Инициализируем город, если он сохранен в localStorage


const openCities = () => {
  citiesVisible.value = true;
  document.body.classList.add('overflow-hidden');
};
const closeCities = () => {
  citiesVisible.value = false;
  document.body.classList.remove('overflow-hidden'); 
};


const changeCity = async (event) => {
  const cityText = event.target.innerText;
  cityName.value = cityText;
  localStorage.setItem('cityName', cityText);

  slutStore.city = cityName.value
  
  slutStore.sluts = []
  await slutStore.loadAnkets(cityName.value); 


};


const cityFuncs = (event) => {
  changeCity(event);0
  closeCities();
  router.push(`/`);
  isMenuVisible.value = false

}



// Загружаем первые анкеты при монтировании компонента




// =========================================================
// Функционал с переходом на другие маршруты и покраски кнопок меню
// =========================================================

const router = useRouter()
const activePath = ref('');


function navigateAndReload(path) {
  
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

const isAnyModalOpen = ref(false);

const isModalSuppVisible = ref(false)

const openModalSupp = () => {
  if ( isAnyModalOpen.value ) return   
  isAnyModalOpen.value = true
  isModalSuppVisible.value = true;
};
const closeModalSupp = () => {
  isModalSuppVisible.value = false;
  isAnyModalOpen.value = false
};


// =========================================================
// Модалка Health+
// =========================================================

const isModalHealthVisible = ref(false)

const openModalHealth = () => {
  if ( isAnyModalOpen.value ) return   
  isAnyModalOpen.value = true
  isModalHealthVisible.value = true;
};
const closeModalHealth = () => {
  isModalHealthVisible.value = false;
  isAnyModalOpen.value = false
};


// =========================================================
// Модалка Вакансий
// =========================================================





const isModalVacancyVisible = ref(false)

const openModalVacancy = () => {
  if ( isAnyModalOpen.value ) return   
  isAnyModalOpen.value = true
  isModalVacancyVisible.value = true;
};
const closeModalVacancy = () => {
  isModalVacancyVisible.value = false;
  isAnyModalOpen.value = false
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

/* Для Webkit браузеров (Chrome, Safari) */
.no-spinner::-webkit-outer-spin-button,
.no-spinner::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}


.support_modal{
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1111;
  width: 700px;
  height: 300px ;
}

.vacancy_modal{
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1111;
  width: 700px;
  height: 300px ;
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
  /* overflow: hidden; */
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
  .header_input{
    display: none;
  }
  .img_qwe{
    display: none;
  }
  .closeSearch{
    display: block;
  }
  .inputAdaptive{
    display: flex;
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
    height: 340px !important;
  }
  
}
@media screen and (max-width:410px) {
  .logo_adaptive{
    width:180px
  }
}
@media screen and (max-width:360px) {
  .logo_adaptive{
    width:160px
  }
}
</style>