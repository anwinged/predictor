import Journal from './Journal';
import Daemon from './Daemon';

interface DaemonRate {
    daemon: Daemon;
    rate: number;
}

interface Prediction {
    daemonRate: DaemonRate;
    rate: number;
    power: number;
    value: number;
}

class Supervisor {
    static DEFAULT_EPSILON = 0.01;

    daemonRates: DaemonRate[] = [];

    readonly epsilon: number;

    constructor(
        daemons: Daemon[],
        epsilon: number = Supervisor.DEFAULT_EPSILON
    ) {
        if (!daemons || daemons.length === 0) {
            throw Error('Empty daemon list');
        }

        this.daemonRates = daemons.map(daemon => ({
            daemon: daemon,
            rate: 0,
        }));

        this.epsilon = epsilon;
    }

    predict(journal: Journal): number {
        const predictions = this._createPredictions(journal);
        const ordered = this._sortPredictions(predictions);

        return ordered[0].value;
    }

    adjust(journal: Journal, humanValue: number) {
        const predictions = this._createPredictions(journal);
        for (const prediction of predictions) {
            if (prediction.value === humanValue) {
                prediction.daemonRate.rate += this._getAdjustmentWeight(
                    journal.length
                );
            }
            prediction.daemonRate.daemon.adjust(journal, humanValue);
        }
    }

    rates() {
        const result = {};
        this.daemonRates.forEach(r => {
            result[r.daemon.id] = r.rate;
        });
        return result;
    }

    weights() {
        const result = {};
        this.daemonRates.forEach(r => {
            result[r.daemon.id] = r.daemon.getWeights();
        });
        return result;
    }

    private _createPredictions(journal: Journal): Prediction[] {
        return this.daemonRates.map(daemonRate => ({
            daemonRate: daemonRate,
            power: daemonRate.daemon.power,
            rate: daemonRate.rate,
            value: daemonRate.daemon.predict(journal),
        }));
    }

    private _sortPredictions(predictions: Prediction[]) {
        return predictions.sort((result1: Prediction, result2: Prediction) => {
            const rateDiff = result2.rate - result1.rate;
            if (Math.abs(rateDiff) > 0.000001) {
                return rateDiff;
            }
            return result1.power - result2.power;
        });
    }

    private _getAdjustmentWeight(stepNumber: number): number {
        return Math.pow(1 + this.epsilon, stepNumber);
    }
}

export default Supervisor;
