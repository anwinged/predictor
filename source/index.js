import Vue from 'vue';
import './style.css';
import Predictor from './Predictor';

new Vue({
    el: '#app',
    data: {
        predictor: new Predictor(),
    },
    methods: {
        pass(value) {
            console.log('PASS', value);
        },
    },
});
