<template>
  <div id="app">
    <div>
      <header class="header">AES</header>
    </div>
    <div class="row">
      <div class="navigation-column">
        <NavigationComponent />
      </div>
      <div class="router-view-column">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import NavigationComponent from './components/NavigationComponent.vue';

export default {
  data() {
    return {
      currentTab: 'CipherComponent',
    };
  },
  components: {
    NavigationComponent
  }
};
</script>

<style>
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #3d3535;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  text-align: center;
  font-weight: bold;
  color: white;
  padding: 10px;
  background-color: #2c2929;
  font-size: 5dvh;
}

.row {
  display: flex;
  flex: 1;
}

.navigation-column {
  flex: 1;
  background-color: #2c2929;
  padding: 20px;
  box-sizing: border-box;
}

.router-view-column {
  flex: 4;
  padding: 100px;
  box-sizing: border-box;
  background-color: #474040;
  color: white;
}
</style>
