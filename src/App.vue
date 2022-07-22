<template>
  <div v-if='!openPage' class='start-page position-absolute bg-black h-100 w-100 d-flex justify-content-center align-items-center'>
    <img class="bg-black start-logo" alt="logo" @click='openPage = true' src="@/assets/logo.png">
  </div>
  <nav v-if='openPage' @click='openBurger=false' class="navbar bg-black">
    <div class='d-flex flex-column text-center mt-4'>
      <router-link class='mb-5' to="/about"><img src="@/assets/logo-min.svg" alt=""></router-link>
      <router-link class='mt-4 flex-column align-content-center' to="/catalog"><img src="@/assets/catalog.svg" alt=""><h6 class="navbar-text">каталог</h6></router-link>
      <router-link class='mt-4 flex-column align-content-center' to="/"><img src="@/assets/lk.svg" alt=""><h6 class="navbar-text">личный кабинет</h6></router-link>
      <router-link class='mt-4 flex-column align-content-center' to="/order"><img class='text-decoration-none' src="@/assets/zakaz.svg" alt=""><h6 class="navbar-text">мои заказы</h6></router-link>
    </div>
    <router-link class='d-flex flex-row' to="/exit"><h4 class="navbar-text-bottom m-2">выход</h4><img src="@/assets/arrow.svg" alt=""></router-link>
  </nav>
  <nav v-if='openPage' class="navbar-min">
    <div class="d-flex align-items-center h-100">
      <div class="bg-black logo-navbar-min d-flex justify-content-center align-content-center h-100" >
        <img class="bg-black" src="@/assets/logo-min.svg" alt="">
      </div>
      <img class="ms-4 cursor" @click='openBurger=!openBurger' src="@/assets/menuburger.svg" alt="">
      <h4 class="ms-4 menu-text m-0 p-0">меню</h4>
    </div>
    <div v-if='openBurger' class="burger-menu position-absolute d-flex flex-column align-items-center ">
      <router-link class='mt-1' @click='openBurger=false' to="/about"><h6 class="navbar-text">о компании</h6></router-link>
      <router-link class='mt-1' @click='openBurger=false' to="/catalog"><h6 class="navbar-text">каталог</h6></router-link>
      <router-link class='mt-1' @click='openBurger=false' to="/"><h6 class="navbar-text">личный кабинет</h6></router-link>
      <router-link class='mt-1' @click='openBurger=false' to="/order"><h6 class="navbar-text">мои заказы</h6></router-link>
      <router-link class='mt-1' @click='openBurger=false' to="/exit"><h4 class="navbar-text">выход</h4></router-link>
    </div>

  </nav>
  <router-view></router-view>
  <!-- иформационное окно статуса выполненых действий-->
  <b-alert class="loader w-25" dismissible v-model='loader.state' :variant='loader.variant'>
    <h4 class="m-0">{{loader.header}}</h4>
    <hr>
    <p class="m-0">{{loader.msg}}</p>
  </b-alert>
</template>

<script>
  export default {
    data() {
      return {
        openPage: false,
        openBurger: false,
      }
    },
    computed: {
      loader:{
        get () {
          return this.$store.getters.status
        },
        set (value) {
          this.$store.commit('setStatus', value)
        }
      },
      loader_state() {
        return this.$store.getters.status.state
      }
    },
    watch: {
      loader_state(e) {
        if (e) {
          setTimeout(() => this.loader.state = false, this.loader.timer);
        }
      }
    },
    methods: {

    },
    mounted() {
      
    },
  }
</script>
<style lang="scss">

$font-stack:    TT Hoves;
$primary-color: #FFFFFF;
$bg-color:      #000000;
$danger:        #c82333;
$success:       #218838;

@media screen and (max-width: 1100px) {
  .navbar{
    display: none !important;
    // position: relative !important;
    // height: 120px !important;
    // width: 100% !important;
  }
  .navbar-min {
    display: flex;
  }
  .wrapper {
    position: relative !important;
    width: 940px !important;
    padding: 40px 0 50px 20px !important;
  }
}
@media screen and (max-width: 955px) {
  .navbar{
    display: none !important;
    // height: 50px !important;
  }
  .navbar-min {
    display: flex;
    height: 50px !important;
  }
  .logo-navbar-min {
    width: 50px !important;
    padding: 10px !important;
  }
  .wrapper {
    width: 480px !important;
    padding: 20px 0 50px 15px !important;
  }
  .minimize {
    display: flex;
    flex-flow: column nowrap !important;
  }
  .burger-menu {
    top: 50px !important;
    left: 50px !important;
  }
  .btn-cencel {
    margin-right: 0 !important;
  }
}
@media screen and (min-width: 1100px) {
  .navbar{
    position: fixed !important;
  }
  .navbar-min {
    display: none;
  }
}
.minimize {
  display: flex;
  flex-flow: row;
}
body {
  font: 100% $font-stack;
}
.wrapper {
  width: 1088px;
  padding: 40px 0 50px 188px;
}
.start-logo {
  cursor: pointer;

  width: 336px;
}
.start-page {
  z-index: 10;
  // display: table-cell;
  // text-align: center;
  vertical-align: middle;
}
.navbar-min {
  height: 120px;
  border-bottom: 1px solid $bg-color;
}
a {
  text-decoration: none !important;
}
.logo-navbar-min {
  width: 120px;
  padding: 30px;
}
.burger-menu {
  padding: 0 10px 0 10px;
  top: 120px;
  left: 120px;
  background-color: #000000;
  z-index: 10;
  border: 1px solid #000000;
  .navbar-text {
    color: $primary-color;
    font-size: 16px;
    white-space: nowrap;
  }
}
.btn-cencel {
  margin-right: 20px;
}
.cursor {
  cursor: pointer;
}
.navbar {
  .navbar-text {
    color: $primary-color;
    font-size: 10px;
    white-space: nowrap;
  }
  .navbar-text-bottom {
    font-size: 14px;
    color: $primary-color;
  }
  width: 120px;
  height: 100%;
  flex-flow: column nowrap;
  overflow: hidden;
  left: 0;
}
.loader {
  position: fixed !important;
  top: 25px;
  right: 25px;
}
.danger {
  color: $danger;
}
.success {
  color: $success;
}
</style>
