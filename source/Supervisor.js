const DEFAULT_EPSILON = 0.01;

class Supervisor {
    /**
     * @type {{daemon: Daemon, rate: Number}[]}
     */
    daemons = [];

    /**
     * @type {Number}
     */
    epsilon;

    /**
     * @param {Daemon[]} daemons
     * @param {Number} epsilon
     */
    constructor(daemons, epsilon = DEFAULT_EPSILON) {
        if (!daemons || daemons.length === 0) {
            throw Error('Empty daemon list');
        }
        this.daemons = daemons.map(daemon => ({
            daemon: daemon,
            rate: 0,
        }));
        this.epsilon = epsilon;
    }

    /**
     * @param {Journal} journal
     *
     * @returns {Number}
     */
    predict(journal) {
        const predictions = this._createPredictions(journal);
        const ordered = this._sortPredictions(predictions);

        return ordered[0].value;
    }

    /**
     * @param {Journal} journal
     * @param {Number} humanValue
     */
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

    /**
     * @param {Journal} journal
     *
     * @returns {Array}
     *
     * @private
     */
    _createPredictions(journal) {
        return this.daemons.map(daemon => ({
            daemon: daemon,
            power: daemon.daemon.power,
            rate: daemon.rate,
            value: daemon.daemon.predict(journal),
        }));
    }

    /**
     * @param {Array} predictions
     *
     * @returns {Array}
     *
     * @private
     */
    _sortPredictions(predictions) {
        return predictions.sort((result1, result2) => {
            const rateDiff = result2.rate - result1.rate;
            if (Math.abs(rateDiff) > 0.000001) {
                return rateDiff;
            }
            return result1.power - result2.power;
        });
    }

    /**
     * @param {Number} stepNumber
     *
     * @returns {Number}
     *
     * @private
     */
    _getAdjustmentWeight(stepNumber) {
        return Math.pow(1 + this.epsilon, stepNumber);
    }
}

export default Supervisor;
