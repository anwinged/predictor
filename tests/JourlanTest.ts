import { it } from 'mocha';
import { expect } from 'chai';

import Journal from '../src/Journal';
import Move from '../src/Move';

describe('Journal', function() {
    it('Create with empty constructor', function() {
        const journal = new Journal();
        expect(journal.length).to.equals(0);
        expect(journal.getLastMovements(5, 5)).to.eqls([]);
    });

    it('Constructor with human steps', function() {
        const journal = new Journal([new Move(1, 1)]);
        expect(journal.length).equals(1);
        expect(journal.getLastMovements(5, 5)).to.eqls([1, 1]);
    });

    it('Make steps', function() {
        const journal = new Journal();
        journal.makeMove(1, 0);
        journal.makeMove(1, 1);
        expect(journal.length).to.equals(2);
        expect(journal.getLastMovements(2, 2)).to.eqls([0, 1, 1, 1]);
    });

    it('Get slice', function() {
        const m = new Journal([
            new Move(1, 1),
            new Move(0, 1),
            new Move(0, 1),
            new Move(1, 0),
        ]);
        expect(m.getLastMovements(2, 2)).to.eqls([1, 0, 0, 1]);
    });
});
