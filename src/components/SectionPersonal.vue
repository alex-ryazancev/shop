<template>
  <h1>Личный кабинет</h1>
  <div class='minimize mt-3' >
    <div class='d-flex flex-column me-3 w-100'>
      <div class='d-flex flex-row justify-content-between mt-4' >
        <h6>Фамилия</h6><h6 v-if='selectedSurname.length === 0' class='danger'>* необходимо заполнить</h6>
      </div>
      <b-form-input class='mt-1' v-model='selectedSurname' placeholder='Введите свою фамилию'></b-form-input>
    </div>
    <div class='d-flex flex-column w-100'>
      <div class='d-flex flex-row justify-content-between mt-4' >
        <h6>Имя</h6><h6 v-if='selectedName.length === 0' class='danger'>* необходимо заполнить</h6>
      </div>
      <b-form-input class='mt-1' v-model='selectedName' placeholder='Введите свое имя'></b-form-input>
    </div>
  </div>
  <div class='minimize' >
    <div class='d-flex flex-column me-3 w-100 mt-4'>
      <h6>Отчество</h6>
      <b-form-input class='me-3 mt-1 '  v-model='selectedPatronymic' placeholder='Введите свое отчество'></b-form-input>
    </div>
    <div class='d-flex flex-column w-100 mt-4'>
      <h6>Дата рождения</h6>
      <div class='d-flex flex-row mt-1'>
        <b-form-select class='border-rounded-left' v-model='selectedDays' :options='optionsDays()'></b-form-select>
        <b-form-select class='rounded-0' v-model='selectedMonths' :options='optionsMonths'></b-form-select>
        <b-form-select class='border-rounded-right' v-model='selectedYears' :options='optionsYears()'></b-form-select>
      </div>
    </div>
  </div>
  <div v-if='lock()' class='minimize button-group mt-4'>
    <b-button class='me-4 btn-cencel mt-3' variant='outline-dark' @click='getUserData()'>отменить</b-button>
    <b-button 
      class='btn-save mt-3'
      :disabled='selectedSurname.length === 0 || selectedName.length === 0' 
      variant='dark' @click='setUserData()'
      >сохранить изменения
    </b-button>
  </div>
  <hr class='mt-5'>
</template>

<script>
  export default {
    data() {
      return {
        selectedDays:       2,
        selectedMonths:     'октябрь',
        selectedYears:      1999,
        optionsMonths:      [
                              'январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 
                              'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
                            ],
        selectedSurname:    '',
        selectedName:       '',
        selectedPatronymic: '',
      }
    },
    computed: {
      user_data:{
        get () {
          return this.$store.getters.data
        },
        set (value) {
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
    },
    methods: {
      showLoader(variant,header,msg) {
        // this.loader.timer   = 3000 // установить таймер уведомления в мс
        this.loader.state   = true; // отобразить
        this.loader.variant = variant; // success - зеленый, danger - красный, info - желтый
        this.loader.header  = header; // заголовок
        this.loader.msg     = msg;// сообщение
      },
      lock() {
        if ( this.selectedSurname    != this.user_data.surname   ||
             this.selectedName       != this.user_data.name      ||
             this.selectedPatronymic != this.user_data.patronymic||  
             this.selectedDays       != this.user_data.date.day  ||
             this.selectedMonths     != this.user_data.date.month||
             this.selectedYears      != this.user_data.date.years ) {
          return true
        } else return false
      },
      getUserData() {
        this.selectedDays         = this.user_data.date.day;
        this.selectedMonths       = this.user_data.date.month;
        this.selectedYears        = this.user_data.date.years;
        this.selectedSurname      = this.user_data.surname;
        this.selectedName         = this.user_data.name;
        this.selectedPatronymic   = this.user_data.patronymic;
      },
      setUserData() {
        this.user_data.date.day   = this.selectedDays;
        this.user_data.date.month = this.selectedMonths;
        this.user_data.date.years = this.selectedYears;
        this.user_data.surname    = this.selectedSurname;
        this.user_data.name       = this.selectedName;
        this.user_data.patronymic = this.selectedPatronymic;
        this.showLoader('success','Успешно!','сохранено')
      },
      optionsDays() {
        return Array.from({length: 31}, (v, i) => i + 1);
      },
      optionsYears() {
        let yearNow = new Date().getFullYear();
        let yearsArr = Array.from({length: yearNow}, (v, i) => i + 1)
        return yearsArr.filter(v => v >= yearNow-120 && v <= yearNow-18);
      }
    },
    mounted() {
      this.user_data = require('../user_data.json')
      this.getUserData();
    }
  }
</script>

<style>
.border-rounded-left {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}
.border-rounded-right {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}
</style>