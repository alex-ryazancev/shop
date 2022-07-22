<template>
  <h4 class='mt-4'>Контактные данные</h4>
  <div class='minimize mt-2'>
    <div class='d-flex flex-column me-3 w-100'>
      <div class='d-flex flex-row justify-content-between mt-4'>
        <h6>Номер телефона</h6><h6 v-if='!isValidPhone' class='danger'>* не верный формат</h6>
      </div>
      <b-form-input class='mt-1' :disabled='lockInputPhone' type='tel' 
        v-model='phone' @click='checked("email")'  
        placeholder='Введите номер телефона'
        >
      </b-form-input>
    </div>
    <div class='d-flex flex-column w-100'>
      <div class='d-flex flex-row justify-content-between mt-4' >
        <h6>Email</h6><h6 v-if='!isValidEmail' class='danger'>* не верный формат</h6>
      </div>
      <b-form-input class='mt-1' :disabled='lockInputEmail' 
        type='email' v-model='email' 
        @click='checked("phone")' placeholder='Введите Email'
        >
      </b-form-input>
    </div>
  </div>
  <div v-if='lock()' class='minimize button-group mt-4'>
    <b-button class='me-4 btn-cencel mt-3' variant='outline-dark' @click='getUserData()'>отменить</b-button>
    <b-button 
      class='btn-save mt-3' 
      :disabled='!isValidPhone || !isValidEmail' 
      variant='dark' @click='setUserData()'
      >сохранить изменения
    </b-button>
    <h6 class='w-50'>{{msg}}</h6>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        lockInputPhone: false,
        lockInputEmail: false,
        phone: '',
        email: '',
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
      user_data: {
        get() {
          return this.$store.getters.data;
        },
        set(value) {
          this.$store.commit('setData', value);
        }
      },
      isValidPhone() {
        return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(this.phone) ? true : false
      },
      isValidEmail() {
        return /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(this.email) ? true : false
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
      showMsg() {
        if (this.phone != this.user_data.phone ) {
          this.msg = 'На ваш телефон будет отправлен код подтверждения';
        } else if (this.email != this.user_data.email) {
          this.msg = 'На ваш Email будет отправлено письмо для подтверждения';
        }
      },
      checked(name) {
        this[name] = this.user_data[name]
      },
      lock() {
        if (this.phone != this.user_data.phone ||
            this.email != this.user_data.email  ) {
          this.showMsg();
          return true
        } return false
      },
      getUserData() {
        this.phone = this.user_data.phone;       
        this.email = this.user_data.email;       
      },
      setUserData() {
        if (this.phone != this.user_data.phone) {
          this.lockInputPhone = true;
          this.lockInputEmail = false;
        } else if (this.email != this.user_data.email) {
          this.lockInputEmail = true;
          this.lockInputPhone = false;
        }
        this.user_data.phone = this.phone;    
        this.user_data.email = this.email;
        this.showLoader('success','Успешно!','сохранено')
      }
    },
    mounted() {
      this.getUserData();
    }
  }
</script>