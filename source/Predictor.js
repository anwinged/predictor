import Movements from './Movements';
import Supervisor from './Supervisor';

export default class Predictor {
    movements;
    supervisor;
    score = 0;

    constructor() {
        this.movements = new Movements();
        this.supervisor = new Supervisor();
    }
}
