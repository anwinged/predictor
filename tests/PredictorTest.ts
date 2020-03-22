import { it, describe } from 'mocha';
import { expect } from 'chai';

import Predictor from '../src/Predictor';

describe('Predictor', function() {
    it('Get prediction for one daemon state', function() {
        const predictor = new Predictor({
            base: 2,
            supervisor_epsilon: 0.01,
            daemons: [{ robot: 1, human: 1, epsilon: 0.01 }],
        });
        const predicted = predictor.pass(1);
        expect(predicted).to.equals(0);
        expect(predictor.stepCount()).to.equals(1);
    });
});
