<template>
  <div id="app">
    <nav id="nav-main" class="wrapper-navigation">
      <ol>
        <li v-for="item in navItems" :key="item.id">
          <router-link :to="item.link" class="nav-link" active-class="active-link">
            {{ item.label }}
          </router-link>
        </li>
      </ol>
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
    },
    methods: {
      changeTab(tab) {
        this.currentTab = tab;
        this.$emit('tabChange', tab);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your styling for the component here */
  #nav-main {
    padding: 10px;
  }

  #nav-main ol {
    list-style: none;
    padding: 0;
  }

  #nav-main li {
    display: inline-block;
    margin-right: 20px;
    margin: 10px;
  }

  .nav-link {
    text-decoration: none;
    color: white;
    font-weight: bold; /* Make the text bold */
    transition: background-color 0.3s, opacity 0.3s;
  }

  .nav-link:hover {
    background-color: rgba(255, 255, 255, 0.1); 
    padding: 10/* Semi-transparent white on hover */
  }

  .active-link {
    background-color: rgba(255, 255, 255, 0.2); /* Semi-transparent white when active */
  }
  </style>
  