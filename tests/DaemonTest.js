import Daemon from '../source/Daemon';
import expect from 'expect';
import History from '../source/Journal';

test('Get prediction for beginning', function() {
    const m = new History();
    const d = new Daemon(1, 1);
    expect(d.predict(m)).toEqual(0);
});

test('Can get power', function() {
    const d = new Daemon(5, 8);
    expect(d.power).toEqual(13);
});

test('Daemon 1-1', function() {
    const m = new History();
    const d = new Daemon(1, 1);

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

    steps.forEach((step, index) => {
        const prediction = d.predict(m);
        expect(prediction).toEqual(step.prediction);
        d.adjust(m, step.human, index + 1);
        m.makeMove(step.human, step.prediction);
        console.log('Step', index + 1, d);
    });
});
