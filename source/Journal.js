import Move from './Move';

class Journal {
    /**
     * @type {Move[]}
     */
    moves = [];

    /**
     * @param {Move[]} moves
     */
    constructor(moves = []) {
        this.moves = moves;
    }

    /**
     * @param {Number} human
     * @param {Number} robot
     */
    makeMove(human, robot) {
        this.moves.push(new Move(human, robot));
    }

    /**
     * @param {Number} humanCount
     * @param {Number} robotCount
     *
     * @returns {Number[]}
     */
    getLastMovements(humanCount, robotCount) {
        const humanMoves = this.moves.map(m => m.human);
        const robotMoves = this.moves.map(m => m.robot);
        return [].concat(
            robotMoves.slice(-robotCount),
            humanMoves.slice(-humanCount)
        );
    }

    /**
     * @returns {Number}
     */
    get length() {
        return this.moves.length;
    }
}

export default Journal;
