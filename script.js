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
            displayWin(checkWin());

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

    function checkWin(){
        //Check draw
        if(board.every(function(e){return e !== ' '})){ 
            return 'draw'
        }
        //Check win
        else{
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
        
                if(cellA == " " || cellB == " " || cellC==" "){
                    continue;
                }else if(cellA == cellB && cellB == cellC){
                    win = true;
                    break;
                }
            }
            return win;
        }
    }

    function displayWin(win){
        if(win === true){
        console.log(`${currentPlayer.name} wins!`)
        resultDiv.textContent = `${currentPlayer.name} wins!`
        resultDiv.style.display = 'block';
        removeClick();
        }
        else if(win === 'draw'){
        console.log(`It's a Draw!`);
        resultDiv.textContent = `It's a Draw!`
        resultDiv.style.display = 'block';
        removeClick();
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
        availableBoxes = board.filter(box => box != "X" && box != "O");
        let index = minimax(board, player2).index;
        board.splice(index, 1, player2.symbol);
        render();
    }

    function minimax(board, player){
        return {index: 1, score: 10};
    }

    return;
})();


