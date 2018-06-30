/**
 * Represents one game move.
 */
class Move {
    /**
     * @param {Number} human
     * @param {Number} robot
     */
    constructor(human, robot) {
        this.human = human;
        this.robot = robot;
    }
}

export default Move;
