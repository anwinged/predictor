import Daemon from '../source/Daemon';
import expect from 'expect';
import History from '../source/Journal';

test('Get prediction for beginning', function() {
    const m = new History();
    const d = new Daemon(1, 1);
    expect(d.predict(m)).toEqual(0);
});

test('Daemon 1-1', function() {
    const m = new History();
    const d = new Daemon(1, 1);

    const step_slice = s => {
        return [].concat(
            s.slice(-1).slice.map(i => i.robot),
            s.slice(-1).slice.map(i => i.human)
        );
    };

    const steps = [
        {
            robot: 0,
            human: 1,
        },
        {
            robot: 0,
            human: 1,
        },
        {
            robot: 1,
            human: 1,
        },
        {
            robot: 0,
            human: 1,
        },
        {
            robot: 1,
            human: 1,
        },
    ];

    steps.forEach((step, index) => {
        const robot = d.predict(m);
        // expect(d._getStepSlice(m)).toEqual(step_slice(steps));
        expect(robot).toEqual(step.robot);
        d.adjust(m, step.human, index + 1);
        m.makeMove(step.human, step.robot);
        console.log('Step', index + 1, d);
    });
});
