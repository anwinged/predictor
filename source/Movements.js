export default class Movements {
    humanMovements = [];
    robotMovements = [];

    constructor(human = [], robot = []) {
        this.humanMovements = human;
        this.robotMovements = robot;
    }

    makeHumanMove(value) {
        this.humanMovements.push(value === 1 ? value : 0);
    }

    makeRobotMove(value) {
        this.robotMovements.push(value === 1 ? value : 0);
    }

    getLastMovements(humanCount, robotCount) {
        const humanSlice = this.humanMovements.slice(-humanCount);
        const robotSlice = this.robotMovements.slice(-robotCount);
        return [].concat(robotSlice, humanSlice);
    }
}
