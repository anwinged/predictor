import { it, describe } from 'mocha';
import { expect } from 'chai';

import Daemon from '../src/Daemon';
import Journal from '../src/Journal';

describe('Daemon', function() {
    it('Get prediction for beginning', function() {
        const journal = new Journal();
        const daemon = new Daemon(2, 1, 1);
        const predicted = daemon.predict(journal);
        expect(predicted).to.equals(0);
    });

    it('Can get power', function() {
        const d = new Daemon(2, 5, 8);
        expect(d.power).to.eqls(13);
    });

    it('Daemon 1-1', function() {
        const journal = new Journal();
        const daemon = new Daemon(2, 1, 1, 0.1);

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
