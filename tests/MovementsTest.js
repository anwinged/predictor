import Movements from '../source/Movements';
import expect from 'expect';

test('Create with empty constructor', function() {
    const m = new Movements();
    expect(m.getLastMovements(5, 5)).toEqual([]);
});

test('Constructor with human steps', function() {
    const m = new Movements([1, 1]);
    expect(m.getLastMovements(5, 5)).toEqual([1, 1]);
});

test('Make human step', function() {
    const m = new Movements();
    m.makeHumanMove(1);
    m.makeHumanMove(0);
    expect(m.getLastMovements(5, 5)).toEqual([1, 0]);
});

test('Make robot step', function() {
    const m = new Movements();
    m.makeRobotMove(0);
    m.makeRobotMove(1);
    expect(m.getLastMovements(5, 5)).toEqual([0, 1]);
});

test('Make mixed steps', function() {
    const m = new Movements();
    m.makeHumanMove(1);
    m.makeRobotMove(0);
    expect(m.getLastMovements(5, 5)).toEqual([0, 1]);
});

test('Get slice', function() {
    const m = new Movements([1, 0, 0, 1], [1, 1, 0, 0]);
    expect(m.getLastMovements(2, 2)).toEqual([0, 0, 0, 1]);
});
