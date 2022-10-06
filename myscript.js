const playerFactory = (name) => {
    let turn = false;
    let score = 0;
    let marker = '';

    function incrementScore() {
        score += 1;
    }

    function getScore() {
        return score;
    }

    return { name, incrementScore, getScore, marker, turn };
};

const Gameboard = (() => {
    var maxTurns = 9;
    var gameArray = new Array(9).fill(0);
    for (i = 0; i < maxTurns; i++){
        const box = document.createElement('div');
        box.className = 'gameBoardBox';
        box.setAttribute("value",i);
        box.setAttribute('id', 'box');
        const board = document.querySelector('.board-grid');
        board.appendChild(box);
    }

    function resetGame() {
        let boxes = document.getElementsByClassName('gameBoardBox');
        for (i = 0; i < boxes.length; i++){
            boxes[i].innerHTML = '';
        }
    }

    return { gameArray };
    
})();


const Game = (() => {
    const playerOne = playerFactory('Player1');
    const playerTwo = playerFactory('Player2')
    playerOne.marker = 'X';
    playerTwo.marker = 'O';
    playerOne.turn = true;

    function switchTurn(){
        if (playerOne.turn == true){
            playerOne.turn = false;
            playerTwo.turn = true;
        } else {
            playerOne.turn = true;
            playerTwo.turn = false;
        }
    }

    function checkWinner() {
        for (j=0; j<3; j++){
                if (Gameboard.gameArray[j] != 0 && ((Gameboard.gameArray[j] === Gameboard.gameArray[j+3]) && (Gameboard.gameArray[j+3] === Gameboard.gameArray[j+6]))){
                    alert('1');
                    return true;
                } else if (Gameboard.gameArray[(j*3)] != 0 && (Gameboard.gameArray[(j*3)] === Gameboard.gameArray[(j*3)+1]) && (Gameboard.gameArray[(j*3)+1] === Gameboard.gameArray[(j*3)+2])){
                    alert('2');
                    return true;
                } else if (Gameboard.gameArray[0] != 0 && ((Gameboard.gameArray[0] === Gameboard.gameArray[4]) && (Gameboard.gameArray[4] === Gameboard.gameArray[8]))) { 
                    alert('3');
                    return true;
                } else if (Gameboard.gameArray[2] != 0 && ((Gameboard.gameArray[2] === Gameboard.gameArray[4]) && (Gameboard.gameArray[4] === Gameboard.gameArray[6]))) {
                    alert('4');
                    return true;
                }
            }
        return false;
    }

    document.addEventListener('click', function(e){
        if(e.target && e.target.id == 'box' && e.target.innerHTML == ''){
            Gameboard.gameArray[e.target.getAttribute('value')] = (playerOne.turn) ? 'X' : 'O';
            e.target.innerHTML = ((playerOne.turn) ? 'X' : 'O');
            if (checkWinner()){
                playerOne.turn ? alert('Player1 wins!') : alert('Player2 wins!');
                playerOne.turn ? playerOne.incrementScore() : playerTwo.incrementScore();
                console.log(playerOne.getScore());
            } else {
                switchTurn();
            }
        } else if (e.target.id==='box' && e.target.innerHTML != '') {
            alert('Please pick an empty square');
        }
    });
})();


