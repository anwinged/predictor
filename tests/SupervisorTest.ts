import { it, describe } from 'mocha';
import { expect } from 'chai';

import Supervisor from '../src/Supervisor';
import Daemon from '../src/Daemon';
import Journal from '../src/Journal';

describe('Supervisor', function() {
    it('Get prediction for one daemon state', function() {
        const supervisor = new Supervisor([new Daemon(2, 1, 1, 0.01)], 0.01);
        const journal = new Journal();

        const human1 = 1;
        const predicted1 = supervisor.predict(journal);
        expect(0).to.equals(predicted1, 'First prediction for empty journal');

        journal.makeMove(human1, predicted1);
        supervisor.adjust(journal, human1);

        const human2 = 1;
        const predicted2 = supervisor.predict(journal);
        expect(1).to.equals(
            predicted2,
            `Second prediction for (${human1}, ${predicted1})`
        );

        journal.makeMove(human2, predicted1);
        supervisor.adjust(journal, human2);
    });
});
