import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import './common/js/response';
import FastClick from 'fastclick'
FastClick.attach(document.body);
new Vue({
    render: h => h(App)
}).$mount('#app')

