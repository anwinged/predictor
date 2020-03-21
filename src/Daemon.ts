import Journal from './Journal';

const DEFAULT_EPSILON = 0.01;

function create_key(steps: number[]): string {
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

    constructor(
        base: number,
        humanCount: number,
        robotCount: number,
        epsilon: number = DEFAULT_EPSILON
    ) {
        this.base = base;
        this.humanCount = humanCount;
        this.robotCount = robotCount;
        this.epsilon = epsilon;
    }

    get power(): number {
        return this.humanCount + this.robotCount;
    }

    predict(journal: Journal): number {
        const steps = this._getStepSlice(journal);

        const proposals: number[] = [];
        for (let i = 0; i < this.base; ++i) {
            const weight = this._getWeight([...steps, i]);
            proposals.push(weight);
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
    private _getStepSlice(journal) {
        return journal.getLastMovements(this.humanCount, this.robotCount);
    }

    /**
     * @param {Number} stepNumber
     *
     * @returns {Number}
     *
     * @private
     */
    private _getAdjustmentWeight(stepNumber) {
        return Math.pow(1 + this.epsilon, stepNumber);
    }

    /**
     * @param {Number[]} steps
     *
     * @returns {Number}
     *
     * @private
     */
    private _getWeight(steps: number[]): number {
        const key = create_key(steps);
        const weight = this.weights[key];
        return weight as number;
    }

    /**
     * @param {Number[]} steps
     * @param {Number} value
     *
     * @returns {Number}
     *
     * @private
     */
    private _setWeight(steps, value) {
        const key = create_key(steps);
        this.weights[key] = value;
    }

    /**
     * @param {Number[]} steps
     * @param {Number} weight
     *
     * @private
     */
    private _adjustWeight(steps, weight) {
        const currentWeight = this._getWeight(steps);
        const newWeight = currentWeight + weight;
        this._setWeight(steps, newWeight);
    }
}

export default Daemon;
