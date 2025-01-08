import { defineStore } from "pinia";
import axios from 'axios'

export const useSlutStore = defineStore( 'slutStore', {
    state: () => ({
        sluts: [],
        isLoading: false,
        id: null,
        modelId: null
    }),
    actions: {
        setId(id) {
            this.id = id; 
        },
        async fetchSluts() {
            if (!this.id) return;
            this.isLoading = true;

            

            try {
                let response = await axios.get(`http://localhost:3000/api/search?id=${this.id}`);
                console.log("data form req : ", response.data.data);

                this.modelId = response.data.data._id
                
                this.sluts.push(response.data)

                console.log("slut store : ",this.sluts);
            } catch (error) {
                console.error(error);
                this.sluts = [];
            } finally {
                this.isLoading = false;
                
            }
        },
        async fetchUpload(data) {
            const finalData = data
            finalData.append('modelId', this.modelId);
            
            try {
                const response = await axios.post('http://localhost:3000/upload', finalData, {
                    headers: {
                    'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(response.data);

            } catch (error) {
                console.error('Ошибка при загрузке файла:', error);
            }
        }
        

    },
    getters: {
        getPrice: (state) => (id, paymentMethod, additionalListId, selectedPlace) => {
            let sum = 0
       
            
            // находим обьект шлюхи у нас с бд
            const slut = state.sluts.find((slut) => String(slut.data._id) === String(id));
            // проверки ли нашли
            if (!slut) return 0; 
        
            

            // добавление цены за выбраный час
            if ( paymentMethod != 'night' ) {
                if ( selectedPlace === 'model') {
                    sum += slut.data.hourPrices[0].price * paymentMethod
                } else {
                    sum += slut.data.hourPrices[2].price * paymentMethod
                }
            } else { // добавление цены за ночь
                if ( selectedPlace === 'model') {
                    sum += slut.data.hourPrices[1].price
                } else {
                    sum += slut.data.hourPrices[3].price
                }
                
            }


            // добавление цены за доп услуги
            for (let i = 0; i < slut.data.additional.length; i++) {
                for (let j = 0; j < slut.data.additional[i].options.length; j++) {
                    const el = slut.data.additional[i].options
                    
                    
                    

                    if ( el[j].name === additionalListId[i] ) {
                        sum += el[j].price
                        
                    }    
                }
            } 
            
            return sum;
        },
    },
});


