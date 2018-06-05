import Vue from 'vue';
import './style.css';
import Predictor from './Predictor';

new Vue({
    el: '#app',
    data: {
        predictor: new Predictor(),
    },
    methods: {
        click(v) {
            const value = v ? 1 : 0;
            this.pass(value);
        },
        press(evt) {
            const value = evt.key === '1' ? 0 : 1;
            this.pass(value);
        },
        pass(value) {
            const prediction = this.predictor.pass(value);
            console.log('PREDICTED', prediction, 'PASS', value);
        },
    },
});
