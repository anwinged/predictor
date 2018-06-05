import Vue from 'vue';
import Predictor from './Predictor';
import './style.css';

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
