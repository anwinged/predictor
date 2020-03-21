/**
 * Represents one game move.
 */
class Move {
    public human: number;

    public robot: number;

    constructor(human: number, robot: number) {
        this.human = human;
        this.robot = robot;
    }
}

export default Move;
