import { defineStore } from "pinia";

export const useSlutStore = defineStore( 'slutStore', {
    state: () => ({
        sluts: [
            {
                id: '1',
                name: 'Вика',
                city: 'Москва',
                age : 23,
                height : 168,
                weight : 56,
                boobs : 3,
                hourPrices: [
                    { price : 9000,  id: 1, comment: 'у меня'  },  // 1 час у меня
                    { price : 20000, id: 2, comment: 'у меня'  },  // ночь у меня
                    { price : 9001,  id: 3, comment: 'у тебя'  },  // 1 час у тебя
                    { price : 20001, id: 4, comment: 'у тебя'  },  // ночь у тебя
                ],
                additional:[
                    {
                        name: 'Секс',
                        options: [
                            { name: 'sex1S', price: 0, comment: 'qwe', id: 1 },
                            { name: 'sex2S', price: 20, comment: 'zxc', id: 2 },
                            { name: 'sex3S', price: 25, comment: 'zxc', id: 3 },
                            { name: 'sex4S', price: 30, comment: 'zxc', id: 4 },
                        ],
                    },
                    {
                        name: 'Массаж',
                        options: [
                            { name: 'sex1M', price: 15, comment: 'zxc', id: 1 },
                            { name: 'sex2M', price: 20, comment: 'zxc', id: 2 },
                            { name: 'sex3M', price: 25, comment: 'zxc', id: 3 },
                            { name: 'sex4M', price: 30, comment: 'zxc', id: 4 },
                        ],
                    },
                    {
                        name: 'Стриптиз',
                        options: [
                            { name: 'sex1C', price: 15, comment: 'zxc', id: 1 },
                            { name: 'sex2C', price: 20, comment: 'zxc', id: 2 },
                            { name: 'sex3C', price: 25, comment: 'zxc', id: 3 },
                            { name: 'sex4C', price: 30, comment: 'zxc', id: 4 },
                        ],
                    },
                ],
                category1 : 'Выезд',
                category2 : 'Апартаменты',
                category3 : 'Мальчишники',
                category4 : 'Health+',
                link: require('@/assets/girls/first.jpg'),
                link1: require('@/assets/girls/second.jpg'),
                link2: require('@/assets/girls/third.jpg'),
                link3: require('@/assets/girls/fourth.jpg'),
            },
            {
                id: '2',
                name: 'Аля',
                city: 'Москва',
                age : 20,
                height : 167,
                weight : 50,
                boobs : 2,
                hourPrices: [
                    { price : 9000, id: 1 },
                    { price : 17000, id: 2 },
                    { price : 18000, id: 3 },
                    { price : 19000, id: 4 },
                    { price : 19999, id: 5 },
                    { price : 20000, id: 6 },
                ],
                nightPrice: 28000,
                additional:[
                    {
                        name: 'Секс',
                        options: [
                            { name: 'sex1S', price: 15, comment: 'qwe', id: 1 },
                            { name: 'sex2S', price: 20, comment: 'zxc', id: 2 },
                            { name: 'sex3S', price: 25, comment: 'zxc', id: 3 },
                            { name: 'sex4S', price: 30, comment: 'zxc', id: 4 },
                        ],
                    },
                    {
                        name: 'Массаж',
                        options: [
                            { name: 'sex1M', price: 15, comment: 'zxc', id: 1 },
                            { name: 'sex2M', price: 20, comment: 'zxc', id: 2 },
                            { name: 'sex3M', price: 25, comment: 'zxc', id: 3 },
                            { name: 'sex4M', price: 30, comment: 'zxc', id: 4 },
                        ],
                    },
                    {
                        name: 'Стриптиз',
                        options: [
                            { name: 'sex1C', price: 15, comment: 'zxc', id: 1 },
                            { name: 'sex2C', price: 20, comment: 'zxc', id: 2 },
                            { name: 'sex3C', price: 25, comment: 'zxc', id: 3 },
                            { name: 'sex4C', price: 30, comment: 'zxc', id: 4 },
                        ],
                    },
                ],
                category1 : 'Выезд',
                category2 : 'Апартаменты',
                category3 : 'Мальчишники',
                category4 : 'Health+',
                link: require('@/assets/landing/img4.jpg'),
            },

        ]
    }),
    getters: {
        getPrice: (state) => (id, paymentMethod, additionalListId, selectedPlace) => {
            let sum = 0


            
            // находим обьект шлюхи у нас с бд
            const slut = state.sluts.find((slut) => slut.id === id);
            // проверки ли нашли
            if (!slut) return 0; 
            


            // добавление цены за выбраный час
            if ( paymentMethod != 'night' ) {
                if ( selectedPlace === 'model') {
                    sum += slut.hourPrices[0].price * paymentMethod
                } else {
                    sum += slut.hourPrices[2].price * paymentMethod
                }
            } else { // добавление цены за ночь
                if ( selectedPlace === 'model') {
                    sum += slut.hourPrices[1].price
                } else {
                    sum += slut.hourPrices[3].price
                }
                
            }


            // добавление цены за доп услуги
            for (let i = 0; i < slut.additional.length; i++) {
                for (let j = 0; j < slut.additional[i].options.length; j++) {
                    const el = slut.additional[i].options

                    if ( el[j].id === additionalListId[i] ) {
                        sum += el[j].price
                        
                    }    
                }
            } 
            
            return sum;
        },
    },
});