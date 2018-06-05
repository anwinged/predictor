import Movements from '../source/Movements';
import Move from '../source/Move';
import expect from 'expect';

test('Create with empty constructor', function() {
    const m = new Movements();
    expect(m.getLastMovements(5, 5)).toEqual([]);
});

test('Constructor with human steps', function() {
    const m = new Movements([new Move(1, 1)]);
    expect(m.getLastMovements(5, 5)).toEqual([1, 1]);
});

test('Make steps', function() {
    const m = new Movements();
    m.makeMove(1, 0);
    expect(m.getLastMovements(5, 5)).toEqual([0, 1]);
});

test('Get slice', function() {
    const m = new Movements([
        new Move(1, 1),
        new Move(0, 1),
        new Move(0, 1),
        new Move(1, 0),
    ]);

    expect(m.getLastMovements(2, 2)).toEqual([1, 0, 0, 1]);
});
