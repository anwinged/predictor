import Journal from './Journal';
import Supervisor from './Supervisor';
import Daemon from './Daemon';

export default class Predictor {
    score;
    journal;
    supervisor;

    constructor(config) {
        this.score = 0;
        this.journal = new Journal();
        const daemons = config.daemons.map(daemonConfig => {
            return new Daemon(
                daemonConfig.human,
                daemonConfig.robot,
                daemonConfig.epsilon || 0.01
            );
        });
        this.supervisor = new Supervisor(daemons, config.epsilon || 0.01);
    }

    pass(value) {
        const prediction = this.supervisor.predict(this.journal);
        this.score += prediction === value ? -1 : 1;
        this.supervisor.adjust(this.journal, value);
        this.journal.makeMove(value, prediction);
        return prediction;
    }
}
