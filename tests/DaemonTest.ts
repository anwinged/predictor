import { it, describe } from 'mocha';
import { expect } from 'chai';

import Daemon from '../src/Daemon';
import Journal from '../src/Journal';
import Move from '../src/Move';

describe('Daemon', function() {
    it('Get prediction for beginning', function() {
        const daemon = new Daemon('d1', 2, 1, 1);
        expect('d1').to.equals(daemon.id);

        const predicted = daemon.predict(new Journal());
        expect(0).to.equals(predicted);
    });

    it('Can get power', function() {
        const d = new Daemon('d1', 2, 5, 8);
        expect(13).to.eqls(d.power);
    });

    it('Can adjust', function() {
        const journal = new Journal([new Move(0, 0), new Move(0, 0)]);
        const daemon = new Daemon('d1', 2, 1, 1, 0.1);
        daemon.adjust(journal, 1);
        expect({ '0:0:1': 1.1 ** 2 }).to.eqls(daemon.getWeights());
    });

    it('Daemon 1-1', function() {
        const journal = new Journal();
        const daemon = new Daemon('d1', 2, 1, 1, 0.1);

        const steps = [
            {
                prediction: 0,
                human: 1,
            },
            {
                prediction: 0,
                human: 1,
            },
            {
                prediction: 1,
                human: 1,
            },
            {
                prediction: 0,
                human: 1,
            },
            {
                prediction: 1,
                human: 1,
            },
        ];

        steps.forEach(step => {
            const prediction = daemon.predict(journal);
            expect(prediction).to.eqls(step.prediction);
            daemon.adjust(journal, step.human);
            journal.makeMove(step.human, step.prediction);
        });
    });
});
