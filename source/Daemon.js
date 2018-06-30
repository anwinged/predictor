const DEFAULT_EPSILON = 0.01;

/**
 * @param {Number[]} steps
 *
 * @returns {String}
 */
function create_key(steps) {
    return steps.join(':');
}

class Daemon {
    /**
     * @type {Number}
     */
    base;

    /**
     * @type {Number}
     */
    humanCount;

    /**
     * @type {Number}
     */
    robotCount;

    /**
     * @type {Number}
     */
    epsilon;

    /**
     * @type {Object}
     */
    weights = {};

    /**
     * @param {Number} base
     * @param {Number} humanCount
     * @param {Number} robotCount
     * @param {Number} epsilon
     */
    constructor(base, humanCount, robotCount, epsilon = DEFAULT_EPSILON) {
        this.base = base;
        this.humanCount = humanCount;
        this.robotCount = robotCount;
        this.epsilon = epsilon;
    }

    /**
     * @returns {Number}
     */
    get power() {
        return this.humanCount + this.robotCount;
    }

    /**
     * @param {Journal} journal
     *
     * @returns {Number}
     */
    predict(journal) {
        const steps = this._getStepSlice(journal);

        const proposals = [];
        for (let i = 0; i < this.base; ++i) {
            proposals[i] = this._getWeight([...steps, i]);
        }

        const maxWeight = Math.max(...proposals);

        return proposals.indexOf(maxWeight);
    }

    /**
     * @param {Journal} journal
     * @param {Number} humanValue
     */
    adjust(journal, humanValue) {
        const steps = this._getStepSlice(journal);
        const adjustmentWeight = this._getAdjustmentWeight(journal.length);
        this._adjustWeight([...steps, humanValue], adjustmentWeight);
    }

    /**
     * @param {Journal} journal
     *
     * @returns {Number[]}
     */
    _getStepSlice(journal) {
        return journal.getLastMovements(this.humanCount, this.robotCount);
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

    /**
     * @param {Number[]} steps
     *
     * @returns {Number}
     *
     * @private
     */
    _getWeight(steps) {
        const key = create_key(steps);
        const weight = this.weights[key];
        return weight === undefined ? 0 : weight;
    }

    /**
     * @param {Number[]} steps
     * @param {Number} value
     *
     * @returns {Number}
     *
     * @private
     */
    _setWeight(steps, value) {
        const key = create_key(steps);
        this.weights[key] = value;
    }

    /**
     * @param {Number[]} steps
     * @param {Number} weight
     *
     * @private
     */
    _adjustWeight(steps, weight) {
        const currentWeight = this._getWeight(steps);
        const newWeight = currentWeight + weight;
        this._setWeight(steps, newWeight);
    }
}

export default Daemon;
