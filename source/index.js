import Vue from 'vue';
import './style.css';
import Predictor from './Predictor';

new Vue({
    el: '#app',
    data: {
        predictor: new Predictor({
            daemons: [
                { human: 3, robot: 3 },
                { human: 4, robot: 4 },
                { human: 5, robot: 5 },
            ],
        }),
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
            const step = this.predictor.stepCount();
            console.log('STEP', step, 'PREDICTED', prediction, 'PASS', value);
        },
    },
});
