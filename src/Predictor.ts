import Daemon from './Daemon';
import Journal from './Journal';
import Supervisor from './Supervisor';

interface DaemonConfig {
    id?: string;
    human: number;
    robot: number;
    epsilon?: number;
}

interface PredictorConfig {
    base: number;
    supervisor_epsilon: number;
    daemons: DaemonConfig[];
}

interface HistoryRecord {
    score: number;
    move: [number, number];
    rates: { [id: string]: number };
    weights: { [id: string]: any };
}

const DEFAULT_CONFIG: PredictorConfig = {
    base: 2,
    supervisor_epsilon: 0.01,
    daemons: [
        { human: 2, robot: 2 },
        { human: 3, robot: 3 },
        { human: 4, robot: 4 },
        { human: 5, robot: 5 },
        { human: 6, robot: 6 },
    ],
};

export default class Predictor {
    /**
     * @type {Number}
     */
    readonly base: number;

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

    history: HistoryRecord[];

    constructor(config: PredictorConfig = DEFAULT_CONFIG) {
        this.base = config.base;
        this.score = 0;
        this.journal = new Journal();
        const daemons = this._createDaemons(config.daemons);
        this.supervisor = new Supervisor(daemons, config.supervisor_epsilon);
        this.history = [];
    }

    pass(humanValue: number): number {
        if (humanValue < 0 || humanValue >= this.base) {
            throw new Error(`Passed value must be in [0, ${this.base})`);
        }
        const prediction = this.supervisor.predict(this.journal);
        this.score += prediction === humanValue ? -1 : 1;
        this.supervisor.adjust(this.journal, humanValue);
        this.journal.makeMove(humanValue, prediction);
        this.history.push({
            score: this.score,
            move: [humanValue, prediction],
            rates: this.supervisor.rates(),
            weights: this.supervisor.weights(),
        });
        return prediction;
    }

    showHistory(deep: number): HistoryRecord[] {
        return this.history.slice(-deep);
    }

    private _createDaemons(daemonConfigs: DaemonConfig[]): Daemon[] {
        return daemonConfigs.map(config => {
            const epsilon = config.epsilon || Daemon.DEFAULT_EPSILON;
            return new Daemon(
                config.id ||
                    `daemon-${config.human}-${config.robot}-${epsilon}`,
                this.base,
                config.human,
                config.robot,
                epsilon
            );
        });
    }

    stepCount(): number {
        return this.journal.length;
    }
}
