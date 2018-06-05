import Move from './Move';

export default class Movements {
    moves = [];

    constructor(moves = []) {
        this.moves = moves;
    }

    makeMove(human, robot) {
        this.moves.push(new Move(human, robot));
    }

    getLastMovements(humanCount, robotCount) {
        const humanMoves = this.moves.map(m => m.human);
        const robotMoves = this.moves.map(m => m.robot);
        return [].concat(
            robotMoves.slice(-robotCount),
            humanMoves.slice(-humanCount)
        );
    }
}
