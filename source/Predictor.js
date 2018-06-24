import Journal from './Journal';
import Supervisor from './Supervisor';
import Daemon from './Daemon';

const DEFAULT_CONFIG = {
    supervisor_epsilon: 0.01,
    daemons: [
        { human: 2, robot: 2, epsilon: 0.01 },
        { human: 3, robot: 3, epsilon: 0.01 },
        { human: 4, robot: 4, epsilon: 0.01 },
        { human: 5, robot: 5, epsilon: 0.01 },
        { human: 6, robot: 6, epsilon: 0.01 },
    ],
};

export default class Predictor {
    score;
    journal;
    supervisor;

    constructor(config = DEFAULT_CONFIG) {
        this.score = 0;
        this.journal = new Journal();
        const daemons = config.daemons.map(daemonConfig => {
            return new Daemon(
                daemonConfig.human,
                daemonConfig.robot,
                daemonConfig.epsilon || 0.01
            );
        });
        this.supervisor = new Supervisor(daemons, config.supervisor_epsilon);
    }

    pass(value) {
        const prediction = this.supervisor.predict(this.journal);
        this.score += prediction === value ? -1 : 1;
        this.supervisor.adjust(this.journal, value);
        this.journal.makeMove(value, prediction);
        return prediction;
    }

    stepCount() {
        return this.journal.length;
    }
}
