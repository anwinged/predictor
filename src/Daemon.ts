import Journal from './Journal';

const DEFAULT_EPSILON = 0.01;

function create_key(steps: number[]): string {
    return steps.join(':');
}

class Daemon {
    base: number;

    humanCount: number;

    robotCount: number;

    epsilon: number;

    weights: { [key: string]: number } = {};

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

    adjust(journal: Journal, humanValue: number) {
        const steps = this._getStepSlice(journal);
        const adjustmentWeight = this._getAdjustmentWeight(journal.length);
        this._adjustWeight([...steps, humanValue], adjustmentWeight);
    }

    private _getStepSlice(journal: Journal): number[] {
        return journal.getLastMovements(this.humanCount, this.robotCount);
    }

    private _getAdjustmentWeight(stepNumber: number): number {
        return Math.pow(1 + this.epsilon, stepNumber);
    }

    private _getWeight(steps: number[]): number {
        const key = create_key(steps);
        return key in this.weights ? this.weights[key] : 0;
    }

    private _setWeight(steps: number[], value: number): void {
        const key = create_key(steps);
        this.weights[key] = value;
    }

    private _adjustWeight(steps: number[], weight: number): void {
        const currentWeight = this._getWeight(steps);
        const newWeight = currentWeight + weight;
        this._setWeight(steps, newWeight);
    }
}

export default Daemon;
