<template>
  <div class="containerAdapt">
    <div class="profile-dropdown ">
      <button @click="toggleDropdown" class="dropdown-button "> {{  path_name }} <span class="arrow">&#9662;</span></button>
      <div :class="{ 'dropdown-menu': true, 'show': isOpen }">
        <router-link to="/profile" class="dropdown-item">Профиль</router-link>
        <router-link to="/favorite" class="dropdown-item">Избранные</router-link>
        <router-link to="/changePass" class="dropdown-item">Изменить пароль</router-link>
        <router-link to="/" class="dropdown-item exit">Выйти</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute();

const path_name = ref(null)


const isOpen = ref(false)
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
};

function checkRoute() {
  if( route.path === '/profile' ) {
    return 'Профиль'
  } else if ( route.path === '/favorite' ) {
    return 'Избранные'
  } else if ( route.path === '/changePass' ) {
    return 'Изменить пароль'
  }
}

onMounted(() => {
  path_name.value = checkRoute()
});
</script>

<style scoped>
.containerAdapt {
  width: 385px;
  margin: 0 auto;
  padding: 10px;
  box-sizing: border-box;
}

.profile-dropdown {
  position: relative;
  display: inline-block;
  width: 100%;
}

.dropdown-button {
  background-color: #1C1C1C;
  color:white;
  border: 1px solid #ccc;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}

.dropdown-button .arrow {
  margin-left: 10px;
}

.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 5px;
}

.dropdown-menu.show {
  display: block;
}

.dropdown-item {
  color: white;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  background-color: #1C1C1C;
}

.dropdown-item.exit {
  color: #E81C5A;
}
@media screen and (max-width:400px) {
  .containerAdapt{
    width:280px !important;
    padding: 0;
  }
}
</style>
