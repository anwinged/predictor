import { it } from 'mocha';
import { expect } from 'chai';

import Journal from '../src/Journal';
import Move from '../src/Move';

it('Create with empty constructor', function() {
    const m = new Journal();
    expect(m.getLastMovements(5, 5)).to.eqls([]);
});

it('Constructor with human steps', function() {
    const m = new Journal([new Move(1, 1)]);
    expect(m.getLastMovements(5, 5)).to.eqls([1, 1]);
});

it('Make steps', function() {
    const m = new Journal();
    m.makeMove(1, 0);
    expect(m.getLastMovements(5, 5)).to.eqls([0, 1]);
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
