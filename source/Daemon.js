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

    predict(movements) {
        const steps = this._getStepSlice(movements);
        const w0 = this._getWeight([...steps, 0]);
        const w1 = this._getWeight([...steps, 1]);

        if (w1 > w0) {
            return 1;
        } else {
            return 0;
        }
    }

    adjust(movements, humanValue, stepNumber) {
        const steps = this._getStepSlice(movements);
        const weightAdjustment = this._getWeightAdjustment(stepNumber);
        this._adjustWeight([...steps, humanValue], weightAdjustment);
    }

    _getStepSlice(movements) {
        return movements.getLastMovements(this.humanCount, this.robotCount);
    }

    _getWeightAdjustment(stepNumber) {
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
    }

    _adjustWeight(steps, weight) {
        const currentWeight = this._getWeight(steps);
        const newWeight = currentWeight + weight;
        this._setWeight(steps, newWeight);
    }
}
