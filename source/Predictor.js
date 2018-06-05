import History from './Journal';
import Supervisor from './Supervisor';

export default class Predictor {
    movements;
    supervisor;
    score = 0;

    constructor() {
        this.movements = new History();
        this.supervisor = new Supervisor();
    }
}
