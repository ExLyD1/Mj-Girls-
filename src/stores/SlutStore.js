import { defineStore } from "pinia";
import axios from 'axios'

export const useSlutStore = defineStore( 'slutStore', {
    state: () => ({
        sluts: [],
        searchedByInput: null,
        isLoading: false,
        id: null,
        modelId: null,
        statusMessage: '',
        isFetching: false,
        frontendServerLink: 'https://majesticgirls.net',
        hasMoreAnkets: true,  // Есть ли еще анкеты для загрузки
        skip: 0,  // Количество уже загруженных анкет
        limit: 15,
        city: 'Москва',

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
                const existingAnket = this.sluts.some(anket => anket._id === response.data.data._id);
                if (!existingAnket) {
                    this.sluts.push(response.data.data);
                } 

                
            } catch (error) {
                console.error("Ошибка ил слат стора : ",error);
            } finally {
                this.isLoading = false;
                this.isFetching = false;
                // this.sluts.pop()
            }
        },

        async fetchSlutsByInput(id) {
            if (this.isFetching) return;
            this.isFetching = true;
            try {
                let response = await axios.get(`${this.frontendServerLink}/api/search?id=${id}`);

                this.modelId = response.data.data._id
                
                const existingAnket = this.sluts.some(anket => anket._id === response.data.data._id);
                if (!existingAnket) {
                    this.sluts.push(response.data.data);
                } 
                
            } catch (error) {
                console.error(error);
            } finally {
                this.isLoading = false;
                this.isFetching = false;
            }
        },

        async loadAnkets(city) {
            if (this.loading) return;  // Если уже идет загрузка, не делаем новый запрос
            this.city = city;

            this.loading = true;

            if ( this.sluts.length <= 1 ) {
                this.skip = 0,
                this.limit = 15
            }

            try {
                
                const response = await axios.get(`${this.frontendServerLink}/api/searchByCity?city=${this.city}&skip=${this.skip}&limit=${this.limit}`);

                const newAnkets = response.data.data;
                
                // Добавляем анкеты в список, если их еще нет
                newAnkets.forEach((anket) => {
                    if (!this.sluts.some(existingAnket => 
                        existingAnket.name === anket.name &&
                        existingAnket.city === anket.city && 
                        existingAnket.weight === anket.weight &&
                        existingAnket.height === anket.height)) {
                        this.sluts.push(anket);
                    } 
                });



                if (newAnkets.length < this.limit) {
                    this.hasMoreAnkets = false; 
                } else {
                    this.hasMoreAnkets = true
                }

                
                if (newAnkets.length > 0) {
                    this.skip += newAnkets.length;
                }

                

            } catch (error) {
                this.hasMoreAnkets = false
                console.error('Ошибка при загрузке анкет:', error);
            } finally {
                this.loading = false;
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
            const slut = state.sluts.find((slut) => String(slut._id) === String(id));
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
                    
                    
                    

                    if ( el[j].name === additionalListId[i] ) {
                        sum += el[j].price
                        
                    }    
                }
            } 
            
            return sum;
        },
    },
});


