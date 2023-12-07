<!-- App.vue -->

<template>
  <div id="app">
    <div class="navigation-column">
        <NavigationComponent/>
      </div>

      
      <div class="router-view-column">
        <router-view />
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
    NavigationComponent,
  },
  methods: {
    changeTab(tab) {
      this.currentTab = tab;
    },
  },
};
</script>

<style>
/* Add your global styles here */
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #3d3535;
}

#app {
  display: flex;
  /* justify-content: center;
  align-items: center; */
  height: 100vh; /* Set the height to 100% of the viewport height */
}

/* .container {
  display: flex;
  flex-direction: column;
  height: 100vh;
} */

.navigation-column {
  flex: 1; /* Take up 1/3 of the container width */
  background-color: #2c2929; /* Add a background color */
  padding: 20px;
  box-sizing: border-box; /* Include padding in the width calculation */
}

.router-view-column {
  flex: 5; /* Take up 2/3 of the container width */
  padding: 20px;
  /* box-sizing: border-box; Include padding in the width calculation */
  background-color: #474040; /* Add a background color */
  color: white; /* Set text color to white */
}
</style>
