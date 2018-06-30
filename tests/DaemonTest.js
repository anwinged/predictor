import expect from 'expect';
import Daemon from '../source/Daemon';
import Journal from '../source/Journal';

test('Get prediction for beginning', function() {
    const m = new Journal();
    const d = new Daemon(2, 1, 1);
    expect(d.predict(m)).toEqual(0);
});

test('Can get power', function() {
    const d = new Daemon(2, 5, 8);
    expect(d.power).toEqual(13);
});

test('Daemon 1-1', function() {
    const m = new Journal();
    const d = new Daemon(2, 1, 1);

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
        const prediction = d.predict(m);
        expect(prediction).toEqual(step.prediction);
        d.adjust(m, step.human);
        m.makeMove(step.human, step.prediction);
    });
});
