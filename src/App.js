import './App.css';
import {useState} from "react";


function buildStartingState(width, height, squares) {
    let rows = [];
    let idx = 0;
    for (let r=0; r<height; r += 1) {
        let row = [];
        for (let c=0; c<width; c += 1) {
            row.push(squares[idx]);
            idx += 1;
        }
        rows.push(row);
    }
    return rows;
}

function buildOrderedSquaresList(width, height) {
    let squares = [];
    let value = 1;
    for (let r=0; r<height; r += 1) {
        for (let c=0; c<width; c += 1) {
            squares.push(((r<height-1) || (c<width-1)) ? value : null);
            value += 1;
        }
    }
    return squares;
}

function findEmpty(rows) {
    for (let r=0; r<rows.length; r+=1) {
        for (let c=0; c<rows[r].length; c+=1) {
            if (rows[r][c] === null) {
                let possibleMoves = [];
                if (c>0) {
                    possibleMoves.push({r,c: c-1,dir:'right'});
                }
                if (c<rows[r].length-1) {
                    possibleMoves.push({r,c:c+1,dir:'left'});
                }
                if (r>0) {
                    possibleMoves.push({r:r-1,c,dir:'down'});
                }
                if (r<rows.length-1) {
                    possibleMoves.push({r:r+1,c,dir:'up'});
                }
                return possibleMoves;
            }
        }
    }
}

function randomMove(rows) {
    let possibleMoves = findEmpty(rows);
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    let {r,c,dir} = possibleMoves[randomIndex];
    return moveSquare(rows, r, c, dir);
}

function randomMoves(rows, numMoves) {
    while (numMoves > 0) {
        rows = randomMove(rows);
        numMoves -= 1;
    }
    return rows;
}

function moveSquare(rows, rowIdx, colIdx, dir) {
    const newRows = rows.map(row => row.map(val => val));
    const value = newRows[rowIdx][colIdx];
    newRows[rowIdx][colIdx] = null;
    if (dir === 'up') {
        newRows[rowIdx-1][colIdx] = value;
    }
    if (dir === 'down') {
        newRows[rowIdx+1][colIdx] = value;
    }
    if (dir === 'left') {
        newRows[rowIdx][colIdx-1] = value;
    }
    if (dir === 'right') {
        newRows[rowIdx][colIdx+1] = value;
    }
    return newRows;
}

function findDirection(rows, rowIdx, colIdx, width, height) {
    if (rowIdx < (height-1) && rows[rowIdx+1][colIdx] === null) {
        return 'down';
    }
    if (rowIdx > 0 && rows[rowIdx-1][colIdx] === null) {
        return 'up';
    }
    if (colIdx < (width-1) && rows[rowIdx][colIdx+1] === null) {
        return 'right';
    }
    if (colIdx > 0 && rows[rowIdx][colIdx-1] === null) {
        return 'left';
    }
    return null;
}

function *solvePuzzle(board) {
    console.log('Start solving');
    let context = new SolvingContext(board);
    for (let { coord, expectedValue } of context.board.iterateSolvedCoords()) {
        if (coord.value !== expectedValue
            || (coord.lastOfRow(2) && !coord.lastRow(1) && coord.right.value !== expectedValue+1)
            || (coord.lastRow(2) && !coord.lastOfRow(1) && coord.down.value !== (expectedValue + context.board.width))) {
            console.log(`Solving piece ${expectedValue}`);

            // Special case: second-last row
            if (coord.lastRow(2) || coord.lastRow(1)) {
                // Special case: last 4 cells
                if (coord.lastOfRow(2)) {
                    while (coord.value !== expectedValue || coord.right.value !== expectedValue+1 || coord.down.value !== expectedValue + context.board.width) {
                        if (coord.value === null) {
                            yield context.board.move(coord.right, 'left');
                        } else if (coord.right.value === null) {
                            yield context.board.move(coord.right.down, 'up');
                        } else if (coord.right.down.value === null) {
                            yield context.board.move(coord.down, 'right');
                        } else if (coord.down.value === null) {
                            yield context.board.move(coord, 'down');
                        } else {
                            throw new Error(`Unexpected position of empty ${context.board.find(null).key}`);
                        }
                    }
                    return;
                } else {
                    if (coord.value !== expectedValue + context.board.width) {
                        for (let state of stepsToSolveSquare(context, context.board.find(expectedValue + context.board.width), coord)) {
                            yield state;
                        }
                    }
                    const expectedCell = context.board.find(expectedValue);
                    if (expectedCell.c <= coord.c+1) {
                        for (let state of stepsToSolveSquare(context, expectedCell, context.board.coord(expectedCell.r, coord.c+2))) {
                            yield state;
                        }
                        if (coord.value !== expectedValue + context.board.width) {
                            for (let state of stepsToSolveSquare(context, context.board.find(expectedValue + context.board.width), coord)) {
                                yield state;
                            }
                        }
                    }
                    if (coord.right.value !== expectedValue) {
                        for (let state of stepsToSolveSquare(context.protect(coord), context.board.find(expectedValue), coord.right)) {
                            yield state;
                        }
                    }
                    for (let state of stepsToMoveEmpty(context.protect(coord).protect(coord.right), context.board.find(null), coord.down)) {
                        yield state;
                    }
                    yield context.board.move(coord, 'down');
                    yield context.board.move(coord.right, 'left');
                }
            } else {
                // Special case: second-last position, where value is not last
                if ((coord.lastOfRow(2) && coord.value !== expectedValue+1) || (coord.right.lastOfRow(1) && coord.right.value !== expectedValue+1)) {
                    console.log('Move last value piece to second-last position')
                    for (let state of stepsToSolveSquare(context, context.board.find(expectedValue+1), coord)) {
                        yield state;
                    }
                    context = context.protect(coord);
                }
                // Special case: second-last position, where value is last
                if (coord.lastOfRow(2) && coord.value === expectedValue+1) {
                    // Special case: last 2 row pieces are inverted
                    if (coord.right.value === expectedValue) {
                        console.log('Special case: last 2 row pieces are inverted');
                        for (let state of fixInvertedLastRowPieces(context, coord)) {
                            yield state;
                        }
                    } else {
                        // Move second-last piece below the current position
                        console.log('Move second-last piece below the current position')
                        for (let state of stepsToSolveSquare(context, context.board.find(expectedValue), coord.down)) {
                            yield state;
                        }
                        console.log('done');
                        for (let state of adjustLast2RowPiecesStartingFromSecondLast(context, coord)) {
                            yield state;
                        }
                    }
                } else {
                    // Common case
                    let piece = context.board.find(expectedValue);
                    for (let state of stepsToSolveSquare(context, piece, coord)) {
                        yield state;
                    }
                }

                if (coord.value !== expectedValue) {
                    throw new Error('Unexpected unsolved step');
                }
            }
        }
        context = context.protect(coord);
    }
}

function *fixInvertedLastRowPieces(context, secondLast) {
    let empty = context.board.find(null);
    for (let state of stepsToMoveEmpty(context.protect(secondLast).protect(secondLast.right), empty, secondLast.down)) {
        yield state;
    }

    yield context.board.move(secondLast.down.right, 'left');
    yield context.board.move(secondLast.right, 'down');
    yield context.board.move(secondLast, 'right');
    yield context.board.move(secondLast.down, 'up');
    yield context.board.move(secondLast.down.right, 'left');
    yield context.board.move(secondLast.down.down.right, 'up');
    yield context.board.move(secondLast.down.down, 'right');
    yield context.board.move(secondLast.down, 'down');
    yield context.board.move(secondLast.down.right, 'left');
    yield context.board.move(secondLast.right, 'down');
    yield context.board.move(secondLast, 'right');
    yield context.board.move(secondLast.down, 'up');
    yield context.board.move(secondLast.down.right, 'left');
    yield context.board.move(secondLast.right, 'down');
    yield context.board.move(secondLast, 'right');
    yield context.board.move(secondLast.down, 'up');
    yield context.board.move(secondLast.down.down, 'up');
    for (let state of adjustLast2RowPiecesStartingFromSecondLast(context, secondLast)) {
        yield state;
    }
}

function *adjustLast2RowPiecesStartingFromSecondLast(context, secondLast) {
    for (let state of stepsToMoveEmpty(context.protect(secondLast).protect(secondLast.right).protect(secondLast.down), context.board.find(null), secondLast.down.down)) {
        yield state;
    }
    yield context.board.move(secondLast.down.down.right, 'left');
    yield context.board.move(secondLast.down.right, 'down');
    yield context.board.move(secondLast.right, 'down');
    yield context.board.move(secondLast, 'right');
    yield context.board.move(secondLast.down, 'up');
}

function *stepsToSolveSquare(context, piece, destination) {
    if (piece.isSame(destination)) {
        return;
    }
    let empty = context.board.find(null);
    const destinationCoordForEmpty = (piece.r > destination.r && !piece.up.isProtected(context))
        ? piece.up
        : (piece.c > destination.c && !piece.left.isProtected(context)) ? piece.left : piece.right;
    if (!destinationCoordForEmpty.insideBoard || destinationCoordForEmpty.isProtected(context)) {
        throw new Error('No possible destination coords for empty');
    }
    for (let state of stepsToMoveEmpty(context.protect(piece), empty, destinationCoordForEmpty)) {
        yield state;
    }
    // console.log(`Moving piece ${piece.key} to ${destination.key}`);
    while (true) {
        if (piece.isSame(destination)) {
            break;
        }
        empty = context.board.find(null);
        const possibleMove = piece.possibleMove();
        if (!possibleMove) {
            throw new Error('Unexpected: no possible move');
        }
        if (piece.c > destination.c) {
            if (possibleMove !== 'left') {
                for (let state of stepsToMoveEmpty(context.protect(piece), empty, piece.left)) {
                    yield state;
                }
                if (piece.possibleMove() !== 'left') {
                    throw new Error('Unexpected: should have made left move possible');
                }
            }
            yield context.board.move(piece, 'left');
            piece = piece.left;
        } else if (piece.c < destination.c) {
            if (possibleMove !== 'right') {
                for (let state of stepsToMoveEmpty(context.protect(piece), empty, piece.right)) {
                    yield state;
                }
                if (piece.possibleMove() !== 'right') {
                    throw new Error('Unexpected: should have made right move possible');
                }
            }
            yield context.board.move(piece, 'right');
            piece = piece.right;
        } else if (piece.r > destination.r) {
            if (possibleMove !== 'up') {
                for (let state of stepsToMoveEmpty(context.protect(piece), empty, piece.up)) {
                    yield state;
                }
                if (piece.possibleMove() !== 'up') {
                    throw new Error('Unexpected: should have made up move possible');
                }
            }
            yield context.board.move(piece, 'up');
            piece = piece.up;
        } else {
            throw new Error('Unexpected: should either expect a left, or right or up move');
        }
    }
}

function *stepsToMoveEmpty(context, empty, destination) {
    // console.log(`moving empty from ${empty.key} to ${destination.key}`);
    if (empty.value !== null) {
        throw new Error(`Piece not empty at ${empty.key}`);
    }
    while (!empty.isSame(destination)) {
        const specialCase = empty.up.up.right.isSame(destination)
            && empty.up.right.isProtected(context)
            && empty.up.up.isProtected(context);
        const neighboursToConsider = specialCase
            ? [{
                piece: empty.right,
                dir: 'left',
            }]
            : [{
                    piece: empty.up,
                    dir: 'down',
                }, {
                    piece: empty.down,
                    dir: 'up',
                }, {
                    piece: empty.right,
                    dir: 'left',
                }, {
                    piece: empty.left,
                    dir: 'right',
                }];
        let possibleNeighbours = neighboursToConsider.filter(({piece}) => piece.insideBoard && !piece.isProtected(context));
        if (possibleNeighbours.length === 0) {
            throw new Error(`No place to move empty ${empty.key}`);
        }
        sortInPlaceByKey(possibleNeighbours, ({piece}) => piece.distance(destination))
        // console.log(`empty in ${empty.key}`);
        // for (let {piece} of possibleNeighbours) {
        //     console.log(`Possible piece ${piece.key}, distance ${piece.distance(destination)}`);
        // }
        let { piece, dir } = possibleNeighbours[0];
        // console.log(`moving piece ${piece.key} ${dir}`);
        yield context.board.move(piece, dir);
        empty = piece;
        if (empty.value !== null) {
            throw new Error(`Piece not empty at ${empty.key}`);
        }
    }
}

class SolvingContext {
    constructor(board, protectedPieces) {
        this.board = board;
        this.protectedPieces = protectedPieces || new Set();
    }
    protect(coord) {
        let protectedPieces = new Set(this.protectedPieces);
        protectedPieces.add(coord.key);
        return new SolvingContext(this.board, protectedPieces);
    }
}

class Board {
    constructor(rows, width, height) {
        this.rows = rows;
        this.width = width;
        this.height = height;
    }
    coord(r, c) {
        return new Coord(r, c, this);
    }
    find(value) {
        for (let r=0; r<this.height; r+=1) {
            for (let c=0; c<this.width; c+=1) {
                if (this.rows[r][c] === value) {
                    return this.coord(r, c);
                }
            }
        }
        throw new Error(`Value ${value} not found`);
    }
    move(piece, dir) {
        if (!piece.insideBoard) {
            throw new Error('Coordinates out of board');
        }
        if (piece.adj(dir).value !== null) {
            throw new Error(`Invalid move: ${piece.key} ${dir}`);
        }
        const newRows = this.rows.map(row => row.map(val => val));
        const value = newRows[piece.r][piece.c];
        newRows[piece.r][piece.c] = null;
        if (dir === 'up') {
            newRows[piece.r-1][piece.c] = value;
        }
        if (dir === 'down') {
            newRows[piece.r+1][piece.c] = value;
        }
        if (dir === 'left') {
            newRows[piece.r][piece.c-1] = value;
        }
        if (dir === 'right') {
            newRows[piece.r][piece.c+1] = value;
        }
        this.rows = newRows;
        return newRows;
    }
    *iterateSolvedCoords() {
        let expectedValue = 1;
        for (let r=0; r<this.height; r+=1) {
            for (let c=0; c<this.width; c+=1) {
                if (r < this.height-1 || c < this.width-1) {
                    yield {
                        coord: this.coord(r, c),
                        expectedValue,
                    };
                }
                expectedValue += 1;
            }
        }
    }
}

class Coord {
    constructor(r, c, board) {
        this.r = r;
        this.c = c;
        this.key = `${r}:${c}`;
        this.board = board;
    }
    lastOfRow(nth) {
        return this.c === this.board.width - nth;
    }
    lastRow(nth) {
        return this.r === this.board.height - nth;
    }
    isSame(other) {
        return this.r === other.r && this.c === other.c;
    }
    distance(other) {
        return Math.sqrt((other.r-this.r)**2 + (other.c-this.c)**2);
    }
    isProtected(solvingContext) {
        return solvingContext.protectedPieces.has(this.key);
    }
    get insideBoard() {
        return (this.c >= 0) && (this.c < this.board.width)
               && (this.r >= 0) && (this.r < this.board.height);
    }
    adj(dir) {
        if (dir === 'up') {
            return new Coord(this.r-1, this.c, this.board);
        }
        if (dir === 'down') {
            return new Coord(this.r+1, this.c, this.board);
        }
        if (dir === 'left') {
            return new Coord(this.r, this.c-1, this.board);
        }
        if (dir === 'right') {
            return new Coord(this.r, this.c+1, this.board);
        }
        throw new Error(`Unknown direction ${dir}`);
    }
    get left() { return this.adj('left'); }
    get right() { return this.adj('right'); }
    get up() { return this.adj('up'); }
    get down() { return this.adj('down'); }
    get value() {
        return this.board.rows[this.r][this.c];
    }
    possibleMove() {
        if (this.up.insideBoard && this.up.value === null) {
            return 'up';
        }
        if (this.right.insideBoard && this.right.value === null) {
            return 'right';
        }
        if (this.down.insideBoard && this.down.value === null) {
            return 'down';
        }
        if (this.left.insideBoard && this.left.value === null) {
            return 'left';
        }
        return null;
    }
}

function sortInPlaceByKey(arr, fn) {
    arr.sort(function (a, b) {
        var va = fn(a);
        var vb = fn(b);
        if (va < vb) {
            return -1;
        } else if (va > vb) {
            return 1;
        } else {
            return 0;
        }
    });
    return arr;
}

function App() {
    const [width, setWidth] = useState(4);
    const [height, setHeight] = useState(4);
    const [rows, changeRows] = useState(buildStartingState(width, height, buildOrderedSquaresList(width, height)));
    let [solving, setSolving] = useState(false);
    let [solvingGenerator, setSolvingGenerator] = useState(null);
    const [solvingSpeed, changeSolvingSpeed] = useState(10);
    const [memory] = useState({
        solvingSpeed: null,
    });
    function onClick(e, rowIdx, colIdx) {
        const dir = findDirection(rows, rowIdx, colIdx, width, height);
        if (dir) {
            changeRows(moveSquare(rows, rowIdx, colIdx, dir));
        }
        e.preventDefault();
        setSolving(false);
        memory.solvingSpeed = null;
        setSolvingGenerator(null);
    }
    function reset() {
        changeRows(buildStartingState(width, height, buildOrderedSquaresList(width, height)));
        setSolving(false);
        memory.solvingSpeed = null;
        setSolvingGenerator(null);
    }
    function shuffle() {
        changeRows(randomMoves(buildStartingState(width, height, buildOrderedSquaresList(width, height)), width*height*1000));
        setSolving(false);
        memory.solvingSpeed = null;
        setSolvingGenerator(null);
    }
    function startSolving() {
        solvingGenerator = solvePuzzle(new Board(rows, width, height));
        setSolvingGenerator(solvingGenerator);
    }
    function solve() {
        if (solving) {
            setSolving(false);
            memory.solvingSpeed = null;
            setSolvingGenerator(null);
        } else {
            if (!solvingGenerator) {
                startSolving();
            }
            function step() {
                if (!solvingGenerator || !_solveStep()) {
                    setSolving(false);
                    memory.solvingSpeed = null;
                    setSolvingGenerator(null);
                }
                if (memory.solvingSpeed) {
                    setTimeout(step, 1 + (10-memory.solvingSpeed) * 100);
                }
            }
            setTimeout(step, 1);
            setSolving(true);
            memory.solvingSpeed = solvingSpeed;
        }
    }
    function _solveStep() {
        const result = solvingGenerator.next();
        if (!result.done) {
            changeRows(result.value);
            return true;
        } else {
            return false;
        }
    }
    function solveStep() {
        if (!solvingGenerator) {
            startSolving();
        }
        if (!_solveStep()) {
            setSolving(false);
            memory.solvingSpeed = null;
            setSolvingGenerator(null);
        }
    }
    function onChangeWidth(newWidth) {
        setWidth(newWidth);
        changeRows(buildStartingState(newWidth, height, buildOrderedSquaresList(newWidth, height)));
    }
    function onChangeHeight(newHeight) {
        setHeight(newHeight);
        changeRows(buildStartingState(width, newHeight, buildOrderedSquaresList(width, newHeight)));
    }
    function onChangeSolvingSpeed(speed) {
        changeSolvingSpeed(speed);
        memory.solvingSpeed = speed;
    }
    return (
        <div className="app">
            <div className="board">
                { rows.map((row, rowIdx) => <div key={rowIdx} className="row">
                    { row.map((value, colIdx) => value ? <div key={colIdx} className="square" onClick={(e) => { onClick(e, rowIdx, colIdx); }}><p>{value}</p></div> : <div key={colIdx} className="empty"/> ) }
                </div>)}
            </div>
            <div className="buttons">
                <button onClick={reset} disabled={solving}>Reset</button>
                <button onClick={shuffle} disabled={solving}>Shufle</button>
                <button onClick={solveStep} disabled={solving}>Solve step</button>
                <button onClick={solve}>{ solving ? 'Stop' : 'Solve' }</button>
            </div>
            <div className="buttons">
                Size:
                <NumberInput value={height} minValue={1} maxValue={30} onChange={onChangeHeight}/>
                X
                <NumberInput value={width} minValue={1} maxValue={30} onChange={onChangeWidth}/>
                Solving speed:
                <NumberInput value={solvingSpeed} minValue={1} maxValue={10} onChange={onChangeSolvingSpeed}/>
            </div>
            <div className="buttons" style={{ paddingTop: 10 }}>
                <a href="https://github.com/stefanomasini/8puzzle">GitHub project</a>
            </div>
        </div>
    );
}

function NumberInput({ value, minValue, maxValue, onChange }) {
    const [text, setText] = useState(value);
    function _onChange(evt) {
        setText(evt.target.value);
        try {
            const intValue = parseInt(evt.target.value);
            if (intValue >= minValue && intValue <= maxValue) {
                onChange(intValue);
            }
        } catch {}
    }
    return <input className="input" type="text" value={text} onChange={_onChange}/>;
}

export default App;
