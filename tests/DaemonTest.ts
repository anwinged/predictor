import { it, describe } from 'mocha';
import { expect } from 'chai';

import Daemon from '../src/Daemon';
import Journal from '../src/Journal';

// it('Get prediction for beginning', function() {
//     const m = new Journal();
//     const d = new Daemon(2, 1, 1);
//     const predicted = d.predict(m);
//     expect(predicted).to.equals(0);
// });

it('Can get power', function() {
    const d = new Daemon(2, 5, 8);
    expect(d.power).to.eqls(13);
});

// it('Daemon 1-1', function() {
//     const m = new Journal();
//     const d = new Daemon(2, 1, 1);
//
//     const steps = [
//         {
//             prediction: 0,
//             human: 1,
//         },
//         {
//             prediction: 0,
//             human: 1,
//         },
//         {
//             prediction: 1,
//             human: 1,
//         },
//         {
//             prediction: 0,
//             human: 1,
//         },
//         {
//             prediction: 1,
//             human: 1,
//         },
//     ];
//
//     steps.forEach(step => {
//         const prediction = d.predict(m);
//         expect(prediction).to.eqls(step.prediction);
//         d.adjust(m, step.human);
//         m.makeMove(step.human, step.prediction);
//     });
// });
