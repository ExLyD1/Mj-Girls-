import { defineStore } from "pinia";
import axios from 'axios'

export const useSlutStore = defineStore( 'slutStore', {
    state: () => ({
        sluts: [],
        isLoading: false,
        id: null,
        modelId: null,
        statusMessage: '',
        isFetching: false,
        frontendServerLink: 'http://185.106.93.42:8080',
    }),
    actions: {
        setId(id) {
            this.id = id; 
        },
        async fetchSluts() {
            if (!this.id) return;
            if (this.isFetching) return;
            this.isLoading = true;
            this.isFetching = true;

            try {
                let response = await axios.get(`${this.frontendServerLink}/api/search?id=${this.id}`);

                this.modelId = response.data.data._id
                
                this.sluts.push(response.data)

                
            } catch (error) {
                console.error(error);
                this.sluts = [];
            } finally {
                this.isLoading = false;
                this.isFetching = false;
                
            }
        },
        async fetchSlutsByInput(id) {
            if (this.isFetching) return;
            this.isFetching = true;
            try {
                let response = await axios.get(`${this.frontendServerLink}/api/search?id=${id}`);

                this.modelId = response.data.data._id
                
                this.sluts.push(response.data)
                
            } catch (error) {
                console.error(error);
                this.sluts = [];
            } finally {
                this.isLoading = false;
                this.isFetching = false;
            }
        },




        async fetchUpload(file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('modelId', this.modelId);
            this.isLoading = true;
            
            try {
                const response = await axios.post(`${this.frontendServerLink}/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                this.statusMessage = 'Данные переданы успешно. Перейдите в телеграм';

            } catch (error) {
                
                this.statusMessage = 'Ошибка, загрузите другой файл или картинку';
                
                console.error('Ошибка при загрузке файла:', error);
            } finally {
                this.isLoading = false;
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


