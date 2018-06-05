import Journal from './Journal';
import Supervisor from './Supervisor';
import Daemon from './Daemon';

export default class Predictor {
    score;
    journal;
    supervisor;

    constructor() {
        this.score = 0;
        this.journal = new Journal();
        this.supervisor = new Supervisor([new Daemon(3, 3)]);
    }

    pass(value) {
        const prediction = this.supervisor.predict(this.journal);
        this.score += prediction === value ? -1 : 1;
        this.supervisor.adjust(this.journal, value);
        this.journal.makeMove(value, prediction);
        return prediction;
    }
}
