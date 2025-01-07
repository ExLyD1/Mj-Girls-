import { defineStore } from "pinia";
import axios from 'axios'

export const useSlutStore = defineStore( 'slutStore', {
    state: () => ({
        sluts: [],
        isLoading: false,
    }),
    actions: {
        async fetchSluts() {
            this.isLoading = true;
            try {
                let response = await axios.get('http://localhost:3000/api/search?id=1004');
                this.sluts.push(response.data)
            } catch (error) {
                console.error(error);
                this.sluts = [];
            } finally {
                this.isLoading = false;
                
            }
        }
    },
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


