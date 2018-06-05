export default class Move {
    constructor(human, robot) {
        this._human = human ? 1 : 0;
        this._robot = robot ? 1 : 0;
    }

    get human() {
        return this._human;
    }

    get robot() {
        return this._robot;
    }
}
