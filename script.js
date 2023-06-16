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

const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', 'O');

const playGame = (()=>{

    const {board} = gameBoard;
    const {render} = drawGame;

    const boxes = document.querySelectorAll('.box');
    const resetBtn = document.getElementById('resetBtn');
        resetBtn.addEventListener('click', resetGame);

    function addClick(){
        boxes.forEach((box) => box.addEventListener('click', markBox));
    }
    function removeClick(){
        boxes.forEach((box) => box.removeEventListener('click', markBox));
    }
    addClick();

    //Dictates who starts the game;
    let symbol = 'X';
    let currentPlayer = player1;
    
    function markBox(e) {
        const targetArrayIndex = e.target.id;

        if(board[targetArrayIndex] === ' '){
            board.splice(targetArrayIndex, 1, symbol)
        }
        
        render();
        checkWin();
        
        symbol = symbol === 'X' ? 'O' : 'X';
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    function checkWin(){
        //Check draw
        if(board.every(function(e){return e !== ' '})){ 
            console.log(`It's a Draw!`);
            removeClick();
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

            if(win){
                console.log(`${currentPlayer.name} wins!`)
                removeClick();
            }
        }
    }

    function resetGame(){
        symbol = 'X';
        currentPlayer = player1;
        for(let i = 0; i< board.length; i++){
            board[i] = ' ';
        }
        addClick();
        render();
    }

    return;
})();




/* TO DO
    
    - Check if anyone has won (or drawn)

*/ 

