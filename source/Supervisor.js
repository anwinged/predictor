const DEFAULT_EPSILON = 0.01;

export default class Supervisor {
    daemons = [];
    epsilon;

    constructor(daemons, epsilon = DEFAULT_EPSILON) {
        if (!daemons) {
            throw Error('Empty daemon list');
        }
        this.daemons = daemons.map(daemon => ({
            daemon: daemon,
            rate: 0,
        }));
        this.epsilon = epsilon;
    }

    predict(journal) {
        const predictions = this._createPredictions(journal);
        const ordered = this._sortPredictions(predictions);

        return ordered[0].value;
    }

    adjust(journal, humanValue) {
        const predictions = this._createPredictions(journal);
        for (const prediction of predictions) {
            if (prediction.value === humanValue) {
                prediction.daemon.rate += this._getAdjustmentWeight(
                    journal.length
                );
            }
            prediction.daemon.daemon.adjust(journal, humanValue);
        }
    }

    _createPredictions(journal) {
        return this.daemons.map(daemon => ({
            daemon: daemon,
            power: daemon.daemon.power,
            rate: daemon.rate,
            value: daemon.daemon.predict(journal),
        }));
    }

    _sortPredictions(predictions) {
        return predictions.sort((result1, result2) => {
            const rateDiff = result2.rate - result1.rate;
            if (Math.abs(rateDiff) > 0.000001) {
                return rateDiff;
            }
            return result1.power - result2.power;
        });
    }

    _getAdjustmentWeight(stepNumber) {
        return Math.pow(1 + this.epsilon, stepNumber);
    }
}
