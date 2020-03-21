import Move from './Move';

class Journal {
    moves: Move[] = [];

    constructor(moves: Move[] = []) {
        this.moves = moves;
    }

    makeMove(human: number, robot: number): void {
        this.moves.push(new Move(human, robot));
    }

    getLastMovements(humanCount: number, robotCount: number): number[] {
        const humanMoves = this.moves.map(m => m.human);
        const robotMoves = this.moves.map(m => m.robot);
        return [
            ...robotMoves.slice(-robotCount),
            ...humanMoves.slice(-humanCount),
        ];
    }

    get length(): number {
        return this.moves.length;
    }
}

export default Journal;
