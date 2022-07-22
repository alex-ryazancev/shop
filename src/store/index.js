import { createStore } from 'vuex'

export default createStore({
  state: {
    // данные пользователя
    data: {},
    // параметры лоудера
    status: {
      state    : false, // показать/скрыть
      timer    : 1600,  // таймер отключения в мс
      variant  : 'success',    // success - зеленый, danger - красный, info - желтый
      header   : 'Успешно!',   // заголовок
      msg      : '',           // сообщение
    }
  },
  getters: {
    data:state => state.data,
    status:state => state.status,
  },
  mutations: {
    // заполняем данные пользователя
    setData(state,d){
      state.data = d;
    },
    // заполняем лоудер
    setStatus(state,d){
      state.status = d;
    },
  },
  actions: {
  },
  modules: {
  }
})
