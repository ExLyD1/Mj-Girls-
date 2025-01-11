<template>


  <div v-if="menuVisible " class="overlay" @click="closeMenu"></div>



  <!-- Модалка оплаты -->

  <div 
    v-if="isModalRegVisible && model" 
    :class="{ 'authorization_modal': true, 'active': isModalRegVisible }" 
    class="flex flex-col gap-3 bg-myLightDark rounded-3xl w-full p-5 shadow-2xl pb-12"
  >
    <div class="flex flex-row justify-between w-full">
      <div v-if="!isSuccess" class="text-white text-3xl flex flex-row">
        <p v-if="!isTimeSelected">Оплата</p>
        <p v-else class="mr-2">Оплатить в течении:</p>
        <div v-if="isTimeSelected" class="flex flex-row gap-1">
          {{ minutes }} {{ seconds }}
        </div>
      </div>
      <div v-else class="text-white text-3xl">
        <div v-if="moreThirty">Оплата</div>
        <div v-else>Отправьте квитанцию об оплате</div>
      </div>

      <div class="h-11 rounded-xl cursor-pointer" @click="closeModalReg">
        <img @click="reset" class="w-11 h-11" src="@/assets/header/close.png" alt="Cancel">
      </div>
    </div>





    <!-- Тут Отображаем цену и выбираем опции -->
    <div v-if="!isTimeSelected" class="firstBlockContainer flex flex-col w-full justify-center items-center">
      <div  class="flex flex-row justify-between gap-5 mt-5 w-3/4 m-auto timeBlock">

        <div class="flex flex-col gap-1 text-white w-52">
          <div>Время модели</div>
          <select v-model="selectedOptionPayment" class="outline-none cursor-pointer bg-myLightDark2 px-2 py-3 rounded-lg">
            

            <option v-for="(hourQuantity, index) in hoursList" :key="index" :value="index+1">
              {{ hourQuantity }}
            </option>
            <option value="night">ночь</option>
          </select>
          <div class="w-full flex flex-row justify-around">
            <div>
              <label class="cursor-pointer"> 
                <input
                  type="radio"
                  name="gender"
                  value="model"
                  v-model="selectedPlace"
                  selected="true"
                />
                У модели
              </label>
            </div>
            <div>
              <label class="cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="client"
                  v-model="selectedPlace"
                />
                У меня
              </label>
            </div>
          </div>
        </div>

        
      </div>
      <div class="flex flex-col w-3/4 ">
        <div class="text-xl font-bold text-white mt-2 text_add">Дополнительные услуги</div>
        <div class="flex flex-row justify-between gap-5 w-full container_add timeBlock">
          <div class="w-1/2">

            
            <div 
              class="flex flex-row justify-between gap-5 mt-3 timeBlock"
              v-for="(category, index) in model.additional"
              :key="index"
            >
              <div class="flex flex-col gap-1 text-white w-52">
                <div> {{ category.name }}</div>
                <select 
                  @change="updateAdditionalValues(index, $event.target.value)"  
                  class="outline-none cursor-pointer bg-myLightDark2 px-2 py-3 rounded-lg"
                >

                  <option value="" selected>Нет</option>
                  <option 
                    v-for="(option, idx) in category.options"
                    :key="idx"
                    :value="option.name"
                  >
                    {{ option.name }}
                  </option>
                </select>
              </div>

            </div>

          </div>
          <div class="flex flex-col justify-end">
            
            <div class="bg-myRed text-white text-lg rounded-xl text-center px-5 py-4 h-12 w-52 flex items-center justify-center mt-7 cursor-pointer">К оплате: {{ total_price }} RUB</div> 

            <div @click="getCardNumber" class="bg-myRed text-white text-xl rounded-xl text-center px-5 py-4 h-12 w-52 flex items-center justify-center mt-7 cursor-pointer">Далее</div> 
            
          </div>
        </div>
        
      </div>
      
    </div>



    <!-- Показ карты для опплаты -->
    <div v-if="isTimeSelected && !isSuccess" class="flex flex-col items-center mt-5 w-3/4 m-auto">

      <div class="flex flex-col gap-2 text-white w-3/4 cardNum">
        <div>Номер карты</div>
        <div class="flex flex-row items-center border border-white rounded-xl px-3">
          <div ref="cardNumber" class="w-3/4 py-2 text-center"> {{ card }} </div>
          <div class="border-l border-white w-1/4 pl-9 py-2">
            <img @click="copyCard" class="w-7 h-7 cursor-pointer" src="@/assets/slutPage/copy.png" alt="">
            <div v-if="copySuccess" class="absolute textCopied">Скопировано!</div>
          </div>
        </div>
      </div>

      <div 
        @click="checkIsSuccess" 
        class="bg-myRed text-white text-xl rounded-xl text-center px-5 py-4 h-12 w-3/4 flex items-center justify-center mt-7 cursor-pointer cardNum"
      >
        Проверить оплату
      </div>
      
    </div>





    <!-- Успешно оформили и можно идти в телеграм -->
    <div v-if="isSuccess && !moreThirty" class="flex flex-col items-center m-auto text-center">

      <div class="flex flex-col gap-2 text-white w-3/4">
        <div class="text-2xl font-medium pb-2 pt-10">Номер заказа: 57649</div>
        <div class="text-2xl font-medium pb-4">Код модели: {{ model._id }}</div>


        <div class="flex flex-col gap-6 mt-6 w-full">
          <div class="text-white text-lg">
            Пожалуйста, прикрепите PDF-файл со скриншотом или квитанцией ниже. После этого свяжитесь с техподдержкой для согласования встречи.
          </div>
          
          <!-- Кастомная кнопка для загрузки -->
          <div class="flex justify-center w-full">
            <label for="file-upload" class="cursor-pointer bg-myLightDark2 text-white text-lg px-6 py-3 rounded-lg border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-myRed w-3/4 md:w-1/2 text-center">
              Прикрепить файл
              <!-- Скрытый input -->
              <input 
                id="file-upload"
                type="file" 
                accept="application/pdf, image/*" 
                class="hidden"
                @change="handleFileUpload"
              />
            </label>
          </div>
          
          <!-- Отображение имени файла, если он выбран -->
          <div v-if="selectedFile" class="mt-4 text-white text-lg">
            Выбран файл: <span class="font-semibold">{{ selectedFile.name }}</span>
          </div>
        </div>


      </div>

      <div v-if="isLoading" class="flex justify-center items-center h-40">
        <div class="animate-spin border-4 border-t-4 border-pink-500 border-solid w-12 h-12 rounded-full"></div>
      </div>
      <div v-if="slutStore.statusMessage" class="text-white text-center text-2xl py-4">
        {{ slutStore.statusMessage }}
      </div>

      <a 
        href="https://t.me/MajesticGirlsSupport_Bot"
        class="bg-myRed cardNum2 text-white text-xl rounded-3xl text-center px-5 py-4 h-12 w-3/4 flex items-center justify-center mt-7 cursor-pointer gap-4"
      >
        <img src="@/assets/footer/telegram.png" alt="">
        Написать в Телеграм
      </a>
      
    </div>


    <!-- Больше 30к модалка -->
    <div v-if="isSuccess && moreThirty" class="flex flex-col items-center m-auto text-center">

      <div class="flex flex-col gap-2 text-white w-3/4">
        <div class="text-4xl font-medium pb-4">Свяжитесь с поддержкой в Telegram.</div>
        <div>Сумма к оплате больше 30 тыс. руб. Пожалуйста, обратитесь в поддержку для оформления заказа!</div>
      </div>

      <a 
        href="https://t.me/MajesticGirlsSupport_Bot"
        class="bg-myRed cardNum2 text-white text-xl rounded-3xl text-center px-5 py-4 h-12 w-3/4 flex items-center justify-center mt-7 cursor-pointer gap-4"
      >
        <img src="@/assets/footer/telegram.png" alt="">
        Написать в Телеграм
      </a>
      
    </div>
      




  </div>



  
  <!-- Сама страничка -->

   <div v-if="model" class="container_slut m-auto w-1240 full_landing flex flex-row pb-52 pt-5 gap-3">

    <div class="flex flex-col gap-5 w-295 aside">
      <my-swiper :model="model"></my-swiper>

      <div @click="openModalReg" class="flex flex-row items-center justify-center gap-2 bg-myRed rounded-2xl py-3 px-4 text-white cursor-pointer">
        <p class="text-xl">Оформить модель</p>
      </div>

      <div v-if="isPaid" class="flex items-center justify-center bg-myRed rounded-2xl py-3 px-4 text-white">
        <h1 class="text-xl">Проверить заказ</h1>
      </div>

      <div class="p-3 rounded-xl bg-myDark">
        <div>
          <h1 class="text-white text-4xl">ТАРИФ</h1>
          <div class="flex flex-col gap-3"> 
            <h1 class="text-white text-xl mt-5">День</h1>
            <div class="flex flex-row gap-3 text-white">
              <my-tariff class="bg-myRed">
                <template #tariff_img>    <img class="w-6 h-6" src="@/assets/slutPage/sun.png" alt=""></template>
                <template #time>          <p>1 час</p>      </template>
                <template #price_me>      <p class="text-sm">{{ model.hourPrices[0].price }} ₽</p>   </template>
                <template #price_you>     <p class="text-sm">{{ model.hourPrices[2].price }} ₽</p>   </template>
              </my-tariff>

              <my-tariff class="bg-myRed">
                <template #tariff_img>    <img class="w-6 h-6" src="@/assets/slutPage/sun.png" alt=""></template>
                <template #time>          <p>3 часа</p>      </template>
                <template #price_me>      <p class="text-sm"> {{ ( model.hourPrices[0].price * 3 ) - ( model.hourPrices[0].price * 3 * 20 / 100 ) }} ₽</p>   </template>
                <template #price_you>     <p class="text-sm"> {{ ( model.hourPrices[2].price * 3 ) - ( model.hourPrices[2].price * 3 * 20 / 100 ) }} ₽</p>   </template>
              </my-tariff>
            </div>

            <h1 class="text-white text-xl">Ночь</h1>
            <div class="flex flex-row gap-3 text-white">
              <my-tariff class="bg-myLightDark">
                <template #tariff_img>    <img class="w-6 h-6" src="@/assets/slutPage/moon.png" alt=""></template>
                <template #time>          <p>1 час</p>      </template>
                <template #price_me>      <p class="text-myRed text-sm">{{ model.hourPrices[0].price }} ₽</p>   </template>
                <template #price_you>     <p class="text-myRed text-sm">{{ model.hourPrices[0].price }} ₽</p>   </template>
              </my-tariff>

              <my-tariff class="bg-myLightDark">
                <template #tariff_img>    <img class="w-6 h-6" src="@/assets/slutPage/moon.png" alt=""></template>
                <template #time>          <p>Ночь</p>      </template>
                <template #price_me>      <p class="text-myRed text-sm">{{ model.hourPrices[1].price }} ₽</p>   </template>
                <template #price_you>     <p class="text-myRed text-sm">{{ model.hourPrices[1].price }} ₽</p>   </template>
              </my-tariff>
            </div>

            <div class="text-sm text-white">*Дорога на выезде, клиент оплачивает такси</div>
          </div>
        </div>
      </div>
    </div>



    <div class="flex flex-col gap-4 text-white w-full">

      <div class="py-3 px-5 bg-myDark rounded-2xl w-870 rightPart">
        <div class="flex flex-row justify-between w-full mb-3">
          <h1 @click="api_req" class="text-2xl">{{ model.name }}</h1>
          <div class="bg-myLightDark rounded-lg p-2">
            <img class="h-7 w-7" src="@/assets/landing/favorite_False.png" alt="">
          </div>
        </div>

        <div class="flex flex-col gap-3">
          <div class="flex flex-row justify-between gap-4 buttWrapper">
            <div class="bg-myLightDark text-center rounded-xl py-2 width49">{{ model.city }}</div>
            <div class="bg-myRed text-center rounded-xl py-2 width49">VIP</div>
          </div>

          <div class="flex flex-row justify-between gap-3 categor">
            <div class="flex flex-col gap-1 w-40 py-3 px-5 bg-myLightDark rounded-xl card_har">
              <div class=" font-medium">Характеристики</div>
              <div>Возраст: {{ model.age }}</div>
              <div>Рост: {{ model.height }}см</div>
              <div>Вес: {{ model.weight }}кг</div>
              <div>Грудь: {{ model.boobs }}</div>
            </div>
            <div class="flex flex-col justify-center items-center gap-1 w-36 py-3 px-4 bg-myLightDark rounded-xl card">
              <div> {{ model.category1 }}</div>
              <div><img src="@/assets/slutPage/location.png" alt=""></div>
            </div>
            <div class="flex flex-col justify-center items-center gap-1 w-36 py-3 px-4 bg-myLightDark rounded-xl card">
              <div>{{ model.category2 }}</div>
              <div><img src="@/assets/slutPage/building.png" alt=""></div>
            </div>
            <div class="flex flex-col justify-center items-center gap-1 w-36 py-3 px-4 bg-myLightDark rounded-xl card">
              <div>{{ model.category3 }}</div>
              <div><img src="@/assets/slutPage/cake.png" alt=""></div>
            </div>
            <div class="flex flex-col justify-center items-center gap-1 w-36 py-3 px-4 bg-myGreen rounded-xl card">
              <div>{{ model.category4 }}</div>
              <div><img src="@/assets/slutPage/heart.png" alt=""></div>
            </div>
          </div>
        </div>
      </div>



      <div class="bg-myDark rounded-2xl p-5 w-870 flex flex-col categories">
        <h1 class="text-2xl mb-4">Предпочтения</h1>
        <div class="flex flex-wrap justify-between">
          <div v-for="(category, index) in model.additional" :key="index" class="w-270 mb-4">
            <h2 class="text-xl mb-2">{{ category.name }}</h2>
            <ul>
              <li v-for="(option, idx) in category.options" :key="idx" class="flex flex-col">
                <div class="flex items-center">
                  <img src="@/assets/slutPage/check.png" alt="Check" class="mr-2">
                  <p>{{ option.name }}</p>
                </div>
                <p class="text-myRed ml-6">{{ option.comment }}<span v-if="option.price != 0">, {{ option.price }}₽ </span></p>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>

  </div>


  <div v-else>
    <h1 class="text-3xl text-white text-center pb-96 px-5">Вы ввели не верный id модели</h1>
  </div>
  <!-- ====================================================== -->
  <!-- ====================================================== -->

  <!-- ====================================================== -->
  <!-- ADAPTIVE -->
  <!-- ====================================================== -->
  <!-- ====================================================== -->

  <!-- ====================================================== -->








  <div v-if="model" class="container_slut_adapt m-auto w-1240 full_landing flex-col pb-52 pt-5 gap-3 hidden">

    <div class="flex flex-col gap-5 w-295 aside">
      <div class="w-full">
        <my-swiper :model="model"></my-swiper>
      </div>

      <div @click="openModalReg" class="flex flex-row items-center justify-center gap-2 bg-myRed rounded-2xl py-3 px-4 text-white cursor-pointer">
        <p class="text-xl">Оформить модель</p>
      </div>

      <div v-if="isPaid" class="flex items-center justify-center bg-myRed rounded-2xl py-3 px-4 text-white">
        <h1 class="text-xl">Проверить заказ</h1>
      </div>

    </div>



    <div class="flex flex-col gap-4 text-white w-full">

      <div class="py-3 px-5 bg-myDark rounded-2xl w-870 rightPart">
        <div class="flex flex-row justify-between w-full mb-3">
          <h1 class="text-2xl">{{ model.name }}</h1>
          <div class="bg-myLightDark rounded-lg p-2">
            <img class="h-7 w-7" src="@/assets/landing/favorite_False.png" alt="">
          </div>
        </div>

        <div class="flex flex-col gap-3">
          <div class="flex flex-row justify-between gap-4 buttWrapper">
            <div class="bg-myLightDark text-center rounded-xl py-2 width49">{{ model.city }}</div>
            <div class="bg-myRed text-center rounded-xl py-2 width49">VIP</div>
          </div>

          <div class="flex flex-row justify-between gap-3 categor">
            <div class="flex flex-col gap-1 w-40 py-3 px-5 bg-myLightDark rounded-xl card_har">
              <div class=" font-medium">Характеристики</div>
              <div>Возраст: {{ model.age}}</div>
              <div>Рост: {{ model.height }}см</div>
              <div>Вес: {{ model.weight }}кг</div>
              <div>Грудь: {{ model.boobs }}</div>
            </div>
            <div class="flex flex-col justify-center items-center gap-1 w-36 py-3 px-4 bg-myLightDark rounded-xl card">
              <div>{{ model.category1 }}</div>
              <div><img src="@/assets/slutPage/location.png" alt=""></div>
            </div>
            <div class="flex flex-col justify-center items-center gap-1 w-36 py-3 px-4 bg-myLightDark rounded-xl card">
              <div> {{ model.category2 }}</div>
              <div><img src="@/assets/slutPage/building.png" alt=""></div>
            </div>
            <div class="flex flex-col justify-center items-center gap-1 w-36 py-3 px-4 bg-myLightDark rounded-xl card">
              <div> {{ model.category3 }}</div>
              <div><img src="@/assets/slutPage/cake.png" alt=""></div>
            </div>
            <div class="flex flex-col justify-center items-center gap-1 w-36 py-3 px-4 bg-myGreen rounded-xl card">
              <div> {{ model.category4 }}</div>
              <div><img src="@/assets/slutPage/heart.png" alt=""></div>
            </div>
          </div>
        </div>
      </div>

      <div class="p-3 rounded-xl bg-myDark">
        <div>
          <h1 class="text-white text-4xl">ТАРИФ</h1>
          <div class="flex flex-col gap-3"> 
            <h1 class="text-white text-xl mt-5">День</h1>
            <div class="flex flex-row gap-3 text-white">
              <my-tariff class="bg-myRed">
                <template #tariff_img>    <img class="w-6 h-6" src="@/assets/slutPage/sun.png" alt=""></template>
                <template #time>          <p>1 час</p>      </template>
                <template #price_me>      <p class="text-sm">{{ model.hourPrices[0].price }} ₽</p>   </template>
                <template #price_you>     <p class="text-sm">{{ model.hourPrices[2].price }} ₽</p>   </template>
              </my-tariff>

              <my-tariff class="bg-myRed">
                <template #tariff_img>    <img class="w-6 h-6" src="@/assets/slutPage/sun.png" alt=""></template>
                <template #time>          <p>3 часа</p>      </template>
                <template #price_me>      <p class="text-sm"> {{ ( model.hourPrices[0].price * 3 ) - ( model.hourPrices[0].price * 3 * 20 / 100 ) }} ₽</p>   </template>
                <template #price_you>     <p class="text-sm"> {{ ( model.hourPrices[2].price * 3 ) - ( model.hourPrices[2].price * 3 * 20 / 100 ) }} ₽</p>   </template>
              </my-tariff>
            </div>

            <h1 class="text-white text-xl">Ночь</h1>
            <div class="flex flex-row gap-3 text-white">
              <my-tariff class="bg-myLightDark">
                <template #tariff_img>    <img class="w-6 h-6" src="@/assets/slutPage/moon.png" alt=""></template>
                <template #time>          <p>1 час</p>      </template>
                <template #price_me>      <p class="text-myRed text-sm">{{ model.hourPrices[0].price }} ₽</p>   </template>
                <template #price_you>     <p class="text-myRed text-sm">{{ model.hourPrices[0].price }} ₽</p>   </template>
              </my-tariff>

              <my-tariff class="bg-myLightDark">
                <template #tariff_img>    <img class="w-6 h-6" src="@/assets/slutPage/moon.png" alt=""></template>
                <template #time>          <p>Ночь</p>      </template>
                <template #price_me>      <p class="text-myRed text-sm">{{ model.hourPrices[1].price }} ₽</p>   </template>
                <template #price_you>     <p class="text-myRed text-sm">{{ model.hourPrices[1].price }} ₽</p>   </template>
              </my-tariff>
            </div>

            <div class="text-sm text-white">*Дорога на выезде, клиент оплачивает такси</div>
          </div>
        </div>
      </div>

      <div class="bg-myDark rounded-2xl p-5 w-870 flex flex-col categories">
        <h1 class="text-2xl mb-4">Предпочтения</h1>
        <div class="flex flex-wrap justify-between">
          <div v-for="(category, index) in model.additional" :key="index" class="w-270 mb-4">
            <h2 class="text-xl mb-2">{{ category.name }}</h2>
            <ul>
              <li v-for="(option, idx) in category.options" :key="idx" class="flex flex-col">
                <div class="flex items-center">
                  <img src="@/assets/slutPage/check.png" alt="Check" class="mr-2">
                  <p>{{ option.name }}</p>
                </div>
                <p class="text-myRed ml-6">{{ option.comment }}, {{ option.price }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>

  </div> 


  
</template>

<script setup>
import { ref, computed, onMounted, watchEffect, watch   } from 'vue';
import MyTariff from '@/components/slutPage/MyTariff.vue'
import MySwiper from '@/components/slutPage/MySwiper.vue';
import { useRoute } from 'vue-router';
import { useSlutStore } from '../stores/SlutStore';
import axios from 'axios';

const route = useRoute(); 
const slutStore = useSlutStore()


// ================================================
// Время
// ================================================
const time = ref(15 * 60);  
const minutes = ref(15);     
const seconds = ref(0); 



// ================================================
// Копирование
// ================================================
const cardNumber = ref(null);
const copySuccess = ref(false);


// ================================================
// Логика отпкрия модалок
// ================================================
const card = ref( null )
const moreThirty = ref(false)
const isModalRegVisible = ref(false)
const isSuccess = ref(false);
const isPaid = ref(false);
const isTimeSelected = ref(false)



// ================================================
// ШЛАК
// ================================================
const hoursList = ref([
  '1 час',
  '2 часа',
  '3 часа',
  '4 часа',
  '5 часов',
])
const telegramLinkWeb = 'https://t.me/ExLyD1'; 

const selectedFile = ref(null)


// ================================================
// Высчитывание цены
// ================================================
const selectedOptionPayment = ref(0)
const selectedPlace = ref("model");
const additionalValues = ref(['', '', '']);



// ================================================
// Находим модель
// ================================================
// console.log(slutStore.sluts);

const model = computed(() => {
  const id = String(route.params.id); 
  const foundModel = slutStore.sluts.find(slut => String(slut._id) === id); 
  
  return foundModel;
});



// ================================================
// Проверки ли успешно
// ================================================
const checkIsSuccess = () => {
  isSuccess.value = true
};

// ================================================
// Сбрасывание 
// ================================================
const reset = () => {
  
  
  if ( total_price.value >= 30000) {
    moreThirty.value = false
    isSuccess.value = false
    isTimeSelected.value = false
    total_price.value = 0
    selectedOptionPayment.value = ''
    additionalValues.value = ['', '', '']
    return
    
  }
  if ( card.value ) {
    return isTimeSelected.value = true;
  }
  isSuccess.value = false;
  isTimeSelected.value = false;
};


// ================================================
// Высчитываем цену и прочее
// ================================================
const updateAdditionalValues = (index, value) => {
  additionalValues.value[index] = value; 
};
const total_price = computed(() => {
  return slutStore.getPrice(model.value._id, selectedOptionPayment.value, additionalValues.value, selectedPlace.value); 
});





// ================================================
// Открываем закрываем модалку
// ================================================
const openModalReg = () => {
  isModalRegVisible.value = true;
};
const closeModalReg = () => {
  isModalRegVisible.value = false;
};



// ================================================
// Таймер
// ================================================
const startTimer = () => {
  const interval = setInterval(() => {
    if (time.value > 0) {
      time.value -= 1;  // Уменьшаем на 1 секунду
      minutes.value = Math.floor(time.value / 60);  // Пересчитываем минуты
      seconds.value = time.value % 60;  // Пересчитываем секунды
    } else {
      clearInterval(interval);  // Останавливаем таймер, когда время равно 0
    }
  }, 1000);  // Таймер обновляется каждую секунду (1000 миллисекунд)
};





// ================================================
// Получаем данные об карте
// ================================================
const getCardNumber = async() => {
  if ( total_price.value == 0) {
    return
  }
  if ( total_price.value >= 30000 ) {
    isSuccess.value = true
    moreThirty.value = true
  }
  isTimeSelected.value = true

  const response = await axios.get(`${slutStore.frontendServerLink}/api/cards`)
  const data = response.data

  startTimer()

  for (let i = 0; i < data.length; i++) {
    const el = data[i];
    if ( el.FORBOT != 0 ) {
      return card.value = el.Card
    }
  }
}


// ================================================
// Копировать карту
// ================================================
const copyCard = async () => {
  const card = cardNumber.value.textContent;
  try {
    await navigator.clipboard.writeText(card);
    copySuccess.value = true;
    setTimeout(() => {
      copySuccess.value = false;
    }, 2000);
  } catch (error) {
    console.error('Ошибка при копировании текста: ', error);
  }
};

// ================================================
// Загрузить файл пдф
// ================================================

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  
  if (file) {
    selectedFile.value = file;
    
    slutStore.fetchUpload(file)
  }
};


// ================================================
// Опен телеграм
// ================================================
const openTelegram = () => {
  window.location.href = telegramLinkWeb;
};

// ================================================
// Смотрим ли есть такая модель при обновлении страчки
// ================================================

onMounted(async () => {
  
  await slutStore.setId(route.params.id); 
    
  await slutStore.fetchSlutsByInput(slutStore.id);
  

});



</script>

<style scoped>
.width49 {
  width: 49%;
}

.authorization_modal{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1111;
  width: 700px;
}

.textCopied{
  margin-top: -70px;
  margin-left: -70px
}

@media screen and (max-width: 1300px) {
  .container_slut, .container_slut_adapt {
    width: 100% !important;
    padding: 20px 35px 208px 35px;
  }
  .buttWrapper {
    flex-wrap: wrap;
  }
  .width49 {
    width: 100%;
  }
  .categor {
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  }
  .card {
    flex-grow: 1;
    width: 100%; 
    max-width: 100%;
  }
  .card_har {
    flex-grow: 2;
    width: 100%;
    text-align: center;
    max-width: 100%;
  }
  .aside {
    width: auto;
  }

  /* Увеличиваем растяжение правой части */
  .rightPart {
    width: 100%;
    max-width: 100%;
  }

  /* Адаптируем секцию категорий */
  .categories {
    width: 100%;
    max-width: 100%;
  }
}

@media screen and (max-width:760px) {
  .container_slut{
    display: none;
  }
  .container_slut_adapt{
    display: flex
  }
  .card{
    width: 45% !important;
  }
  .tariffCard{
    width: 50%;
  }
  /* Увеличиваем правую часть */
  .rightPart {
    width: 100%;
  }

  /* Адаптируем секцию категорий */
  .categories {
    width: 100%;
  }
  .authorization_modal{
    width:500px
  }
}
@media screen and (max-width:545px) {
  .authorization_modal{
    width:90%
  }
  .timeBlock{
    flex-direction: column;
    align-items: center;
  }
  .cardNum{
    width: 270px;
  }
  .container_add{
    flex-direction: column;
  }
  .text_add{
    text-align: center;
  }
}
@media screen and (max-width:455px) {
  .cardNum2{
    width:250px;
    white-space: nowrap;
  }
}
@media screen and (max-width:384px) {
  .container_slut_adapt {
    padding: 20px 10px 208px 10px;
  }
}
</style>