const gameBoard = (()=>{
    const board = Array.from(' '.repeat(9));
    return {board};
})();

const drawGame = (() => {
    
    const {board} = gameBoard;
    
    function render(){
        for(let i = 0; i < board.length; i++){
            const targetBox = document.getElementById(`${i}`);
            targetBox.textContent = board[i];
        }
    }

    return {render};
})();

const Player = (name, symbol) =>{
    return {name, symbol};
}

let singlePlayer = false; 

const singlePlayerBtn = document.getElementById('single-player');
    singlePlayerBtn.addEventListener('click', gameSetup);
const twoPlayerBtn = document.getElementById('two-player');
    twoPlayerBtn.addEventListener('click', gameSetup);

function gameSetup(e) {
    document.getElementById('start-screen').style.display = 'none';

    if(e.target.id === 'single-player'){
        singlePlayer = true;
    } else{
        singlePlayer = false;
    }
}

const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', 'O');

const playGame = (()=>{

    const {board} = gameBoard;
    const {render} = drawGame;

    const boxes = document.querySelectorAll('.box');
    const resetBtn = document.getElementById('resetBtn');
        resetBtn.addEventListener('click', resetGame);
    const resultDiv = document.getElementById('result');

    function addClick(){
        boxes.forEach((box) => box.addEventListener('click', markBox));
    }
    function removeClick(){
        boxes.forEach((box) => box.removeEventListener('click', markBox));
    }

    function p1Hover(){
        boxes.forEach((box) => box.classList.remove('player2-hover'))
        boxes.forEach((box) => {if(box.textContent === ' '){box.classList.add('player1-hover')}})
    }
    function p2Hover(){
        boxes.forEach((box) => box.classList.remove('player1-hover'))
        boxes.forEach((box) => {if(box.textContent === ' '){box.classList.add('player2-hover')}})
    }

    addClick();

    //Dictates who starts the game;
    let currentPlayer = player1;
    let symbol = player1.symbol;
        boxes.forEach((box) => box.classList.add('player1-hover'))
    
    function markBox(e) {
        const targetArrayIndex = e.target.id;

        if(board[targetArrayIndex] === ' '){
            board.splice(targetArrayIndex, 1, symbol)
            render();
            displayWin(checkWin(board, currentPlayer));

            if(singlePlayer){
                console.log('AI-move')
                symbol = 'O';
                currentPlayer = player2;
                moveAI();
            }

            symbol = symbol === 'X' ? 'O' : 'X';
            currentPlayer = currentPlayer === player1 ? player2 : player1;
            if(currentPlayer === player1){
                p1Hover();
            }else if(currentPlayer === player2){
                p2Hover();
            
            }
        }
    }

    function checkWin(board, player){
        //Check win
        let win = false;
        const winConditions = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];
        for(let i= 0; i < winConditions.length; i++){
            const condition = winConditions[i];
            const cellA = board[condition[0]];
            const cellB = board[condition[1]];
            const cellC = board[condition[2]];
    
            if(cellA === ' ' || cellB === ' ' || cellC === ' '){
                continue;
            }else if(cellA === player.symbol && cellA === cellB && cellB === cellC){
                win = true;
                break;
            }
        }
        if(board.every(function(e){return e !== ' '})){ 
            return 'draw'
        }
        return win;
            
    }

    function displayWin(win){
        if(win === true){
        console.log(`${currentPlayer.name} wins!`)
        resultDiv.textContent = `${currentPlayer.name} wins!`
        resultDiv.style.display = 'block';
        removeClick();
        singlePlayer = false;
        }
        else if(win === 'draw'){
        console.log(`It's a Draw!`);
        resultDiv.textContent = `It's a Draw!`
        resultDiv.style.display = 'block';
        removeClick();
        singlePlayer = false;
        }
        
    }

    function resetGame(){
        symbol = 'X';
        currentPlayer = player1;
        for(let i = 0; i< board.length; i++){
            board[i] = ' ';
        }
        resultDiv.textContent = '';
        resultDiv.style.display = 'none';
        addClick();
        render();
        p1Hover();
        document.getElementById('start-screen').style.display = 'block';
    }

    function moveAI(){
        const boardCopy = board;
        const move = minimax(boardCopy, player2);
        console.log(move)
        board.splice(move.index, 1, player2.symbol);
        render();
        displayWin(checkWin(board, player2))
    }

    function minimax(reboard, player){

        let availableIndex = reboard.reduce(function (ind, el, i){
            if(el === ' '){
                ind.push(i);
            }
            return ind;
        }, []);

        if(checkWin(reboard, player1)){
            return {score: -10};
        }else if(checkWin(reboard, player2)){
            return {score: 10};
        }else if(availableIndex.length === 0){
            return {score: 0};
        }

        const moves = [];
        for(let i = 0; i<availableIndex.length; i++){
            const move = {index: availableIndex[i], score: 0};
            
            reboard[availableIndex[i]] = player.symbol;

            if(player === player2){
                const g = minimax(reboard, player1);
                move.score = g.score;
            }else if(player === player1){
                const g = minimax(reboard, player2);
                move.score = g.score;
            }
            reboard[availableIndex[i]] = ' ';
            moves.push(move);
        }

        let bestMove; 
        if(player === player2){
            let bestScore = -10000;
            for(let i = 0; i < moves.length; i++){
                if(moves[i].score > bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else if(player === player1){
            let bestScore = 10000;
            for(let i = 0; i < moves.length; i++){
                if(moves[i].score < bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
        return moves[bestMove];
    }

    return;
})();


