import Vue from 'vue';
import './style.css';
import Predictor from './Predictor';

new Vue({
    el: '#app',
    data: {
        predictor: new Predictor({
            base: 3,
            daemons: [
                { human: 3, robot: 3 },
                { human: 4, robot: 4 },
                { human: 5, robot: 5 },
            ],
        }),
    },
    methods: {
        click(v) {
            const value = parseInt(v, 10);
            this.pass(value);
        },
        press(evt) {
            const value = parseInt(evt.key, 10) - 1;
            this.pass(value);
        },
        pass(value) {
            const prediction = this.predictor.pass(value);
            const step = this.predictor.stepCount();
            console.log('STEP', step, 'PREDICTED', prediction, 'PASS', value);
        },
    },
});
