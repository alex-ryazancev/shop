<template>
  <div class='d-flex flex-column wrapper'>
    <h1>Выход</h1>
  </div>
</template>

<script>


export default {
  data() {
    return {
      url: 'https://bootstrap-vue.or/',
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
    },
  methods: {
    showLoader(variant,header,msg) {
      // this.loader.timer   = 3000 // можно добавить таймер уведомления в мс
      this.loader.state   = true; // отобразить
      this.loader.variant = variant; // success - зеленый, danger - красный, info - желтый
      this.loader.header  = header; // заголовок
      this.loader.msg     = msg;// сообщение
    },
    getURL: async function() {
      try {
        let resp;
        await fetch( this.url, {
          method: 'GET',
        })
        .then( response => resp = response )
        if (resp.status >= 200 && resp.status <= 299) {
          this.showLoader('success','URL',resp.status)
        } else console.log('Fetch problem = ' + resp.status );
      } catch (err) {
        this.showLoader('danger',this.url,err)
      }

    },
  },
  mounted() {
    this.getURL();
  }
}


</script>

<style>
.btn-cencel {
  min-width: 144px;
}
.btn-save {
  min-width: 252px;
}
</style>