import Daemon from './Daemon';
import Journal from './Journal';
import Supervisor from './Supervisor';

interface DaemonConfig {
    human: number;
    robot: number;
    epsilon: number;
}

interface PredictorConfig {
    base: number;
    supervisor_epsilon: number;
    daemons: DaemonConfig[];
}

const DEFAULT_CONFIG: PredictorConfig = {
    base: 2,
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
    /**
     * @type {Number}
     */
    base: number;

    /**
     * @type {Number}
     */
    score: number;

    /**
     * @type {Journal}
     */
    journal: Journal;

    /**
     * @type {Supervisor}
     */
    supervisor: Supervisor;

    constructor(config: PredictorConfig = DEFAULT_CONFIG) {
        this.base = config.base;
        this.score = 0;
        this.journal = new Journal();
        const daemons = this._createDaemons(config.daemons);
        this.supervisor = new Supervisor(daemons, config.supervisor_epsilon);
    }

    pass(humanValue: number): number {
        if (humanValue < 0 || humanValue >= this.base) {
            throw new Error(`Passed value must be in [0, ${this.base})`);
        }
        const prediction = this.supervisor.predict(this.journal);
        this.score += prediction === humanValue ? -1 : 1;
        this.supervisor.adjust(this.journal, humanValue);
        this.journal.makeMove(humanValue, prediction);
        return prediction;
    }

    private _createDaemons(daemonConfigs: DaemonConfig[]): Daemon[] {
        return daemonConfigs.map(config => {
            return new Daemon(
                this.base,
                config.human,
                config.robot,
                config.epsilon || 0.01
            );
        });
    }

    stepCount(): number {
        return this.journal.length;
    }
}
