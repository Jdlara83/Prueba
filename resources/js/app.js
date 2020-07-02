

require('./bootstrap');

window.Vue = require('vue');

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('usuario', require('./components/UsuariosComponent.vue').default);


const app = new Vue({
    el: '#app'
});
