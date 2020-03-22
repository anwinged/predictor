/**
 * Represents one game move.
 */
class Move {
    private readonly itsHuman: number;
    private readonly itsRobot: number;

    constructor(human: number, robot: number) {
        this.itsHuman = human;
        this.itsRobot = robot;
    }

    get human() {
        return this.itsHuman;
    }

    get robot() {
        return this.itsRobot;
    }
}

export default Move;
