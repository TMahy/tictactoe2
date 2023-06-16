const gameBoard = (()=>{
    const board = Array.from(' '.repeat(9));
    return {board};
})();

const Player = (name, symbol) =>{
    return {name, symbol};
}


const playGame = (()=>{

    const {board} = gameBoard;
    const {render} = drawGame;
    const boxes = document.querySelectorAll('.box');

    function addClick(){
        boxes.forEach((box) => box.addEventListener('click', markBox));
    }
    addClick();
    
    render();

    function markBox(e) {
        console.log(e);
    }

    return {};
})();

const drawGame = (() => {
    
    const {board} = gameBoard;
    
    function render(){
        for(let i = 0; i < board.length; i++){
            const targetBox = document.getElementById(`${i}`);
            targetBox.textContent = board[i];
        }
    }

    return {render}
})();


/* TO DO
    - Handling clicks in the boxes
    - Adding correct symbol to the box clicked 
    - Check if anyone has won (or drawn)
    - Adding elements to the screen

*/ 

