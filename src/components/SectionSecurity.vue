<template>
  <h4 class='mt-4'>Изменить пароль</h4>
  <div class='minimize mt-2' >
    <div class='d-flex flex-column me-3 w-100'>
      <div class='d-flex flex-row justify-content-between mt-4' >
        <h6>Новый пароль</h6><h6 :class='isValidPassword(selectedPassword)'>минимум 6 символов, буквы и цифры</h6>
      </div>
      <b-input-group class=''>
        <b-form-input class='pe-4' :type='typePwd' v-model='selectedPassword' placeholder='Введите пароль'></b-form-input>
        <b-input-group-append>
          <img class='pwd-icon' @click='showPwd("typePwd")' src="@/assets/eye.svg" alt="">
        </b-input-group-append>
      </b-input-group>
    </div>
    <div class='d-flex flex-column w-100'>
      <div class='d-flex flex-row justify-content-between mt-4' >
        <h6>Повторите пароль</h6><h6 class='danger'>{{msg}}</h6>
      </div>
      <b-input-group class=''>
        <b-form-input class='pe-4' :type='typeRpd' v-model='selectedRepited' placeholder='Введите пароль'></b-form-input>
        <b-input-group-append>
          <img class='pwd-icon' @click='showPwd("typeRpd")' src="@/assets/eye.svg" alt="">
        </b-input-group-append>
      </b-input-group>
    </div>
  </div>
  <div v-if='lock && afterSave' class='minimize button-group mt-4'>
    <b-button class='me-4 btn-cencel mt-3' variant='outline-dark' @click='cencel()'>отменить</b-button>
    <b-button 
      :disabled='isValidPassword(selectedPassword) == "danger" || selectedPassword != selectedRepited' 
      class='btn-save mt-3' variant='dark' @click='setUserData()'
      >сохранить изменения
    </b-button>
  </div>
  <hr class='mt-5'>
</template>

<script>
  export default {
    data() {
      return {
        selectedPassword: '',
        selectedRepited:  '',
        typePwd: 'password',
        typeRpd: 'password',
      }
    },
    computed: {
      user_data:{
        get() {
          return this.$store.getters.data
        },
        set(value) {
          this.$store.commit('setData', value)
        }
      },
      loader:{
        get () {
          return this.$store.getters.status
        },
        set (value) {
          this.$store.commit('setStatus', value)
        }
      },
      lock() {
        return this.selectedPassword != this.user_data.password ? true : false
      },
      afterSave() {
        return this.selectedPassword.length == 0 && this.selectedRepited.length == 0 ? false : true
      },
      msg() {
        return this.selectedPassword == this.selectedRepited ? '' : 'пароли не совпадают';
      },
    },
    methods: {
      showLoader(variant,header,msg) {
        // this.loader.timer   = 3000 // установить таймер уведомления в мс
        this.loader.state   = true; // отобразить
        this.loader.variant = variant; // success - зеленый, danger - красный, info - желтый
        this.loader.header  = header; // заголовок
        this.loader.msg     = msg;// сообщение
      },
      isValidPassword(password) {
        if (/^(?=.*[a-z])(?=.*[0-9]).{6,}/.test(password) ||
            /^(?=.*[A-Z])(?=.*[0-9]).{6,}/.test(password)  ){
          return 'success'
        } return 'danger'
      },
      showPwd(type){
        this[type] = this[type] === 'password' ? 'text' : 'password';
      },
      getUserData() {
        this.selectedPassword = this.user_data.password;
        this.selectedRepited = this.user_data.password;
        this.typePwd = 'password';
        this.typeRpd = 'password';
      },
      setUserData() {
        this.user_data.password = this.selectedPassword;
        this.selectedPassword = '';
        this.selectedRepited = '';
        this.showLoader('success','Успешно!','сохранено')
      },
      cencel() {
        this.selectedPassword = '';
        this.selectedRepited = '';
        this.typePwd = 'password';
        this.typeRpd = 'password';
      },
    },
    mounted() {
      this.getUserData();
    }
  }
</script>

<style>
.pwd-icon {
  cursor: pointer;
  width: 19px;
  margin-left: -25px;
  z-index: 3;
}
</style>