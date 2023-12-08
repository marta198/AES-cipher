<template>
  <div id="app">
    <nav id="nav-main" class="wrapper-navigation">
      <div v-for="item in navItems" :key="item.id" class="nav-row">
        <router-link :to="item.link" class="nav-link" active-class="active-link">
          {{ item.label }}
        </router-link>
      </div>
    </nav>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      navItems: [
        { id: 1, label: 'ENCRYPTION', link: '/cipher' },
        { id: 2, label: 'DECRYPTION', link: '/decipher' },
      ]
    };
  }
};
</script>
  
<style scoped>
#nav-main {
  padding: 10px;
}

#nav-main .nav-row {
  display: flex;
  align-items: center;
  margin: 10px;
}

.nav-link {
  text-decoration: none;
  color: white;
  font-weight: bold;
  transition: background-color 0.3s, opacity 0.3s;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.active-link {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
  
