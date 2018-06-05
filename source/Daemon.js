const DEFAULT_EPSILON = 0.01;

function create_key(steps) {
    return steps.join('');
}

export default class Daemon {
    humanCount;
    robotCount;
    epsilon;
    weights = {};

    constructor(humanCount, robotCount, epsilon = DEFAULT_EPSILON) {
        this.humanCount = humanCount;
        this.robotCount = robotCount;
        this.epsilon = epsilon;
    }

    get power() {
        return this.humanCount + this.robotCount;
    }

    predict(journal) {
        const steps = this._getStepSlice(journal);
        const w0 = this._getWeight([...steps, 0]);
        const w1 = this._getWeight([...steps, 1]);

        return w1 > w0 ? 1 : 0;
    }

    adjust(journal, humanValue) {
        const steps = this._getStepSlice(journal);
        const adjustmentWeight = this._getAdjustmentWeight(journal.length);
        this._adjustWeight([...steps, humanValue], adjustmentWeight);
    }

    _getStepSlice(journal) {
        return journal.getLastMovements(this.humanCount, this.robotCount);
    }

    _getAdjustmentWeight(stepNumber) {
        return Math.pow(1 + this.epsilon, stepNumber);
    }

    _getWeight(steps) {
        const key = create_key(steps);
        const weight = this.weights[key];
        return weight === undefined ? 0 : weight;
    }

    _setWeight(steps, value) {
        const key = create_key(steps);
        this.weights[key] = value;
        console.log('WEIGHTS', this.weights);
    }

    _adjustWeight(steps, weight) {
        const currentWeight = this._getWeight(steps);
        const newWeight = currentWeight + weight;
        this._setWeight(steps, newWeight);
    }
}
