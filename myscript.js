const playerFactory = (name) => {
    const turn = false;
    const score = 0;
    const marker = '';

    function incrementScore() {
        this.score += 1;
    }

    function getScore() {
        return this.score;
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
        for (i=0; i<3; i++){
            if (Gameboard.gameArray[i] != 0){
                if ((Gameboard.gameArray[i] === Gameboard.gameArray[i+3]) && (Gameboard.gameArray[i+3] === Gameboard.gameArray[i+6])){
                    return true;
            }
        }
    }
}

    document.addEventListener('click', function(e){
        if(e.target && e.target.id == 'box' && e.target.innerHTML == ''){
            Gameboard.gameArray[e.target.getAttribute('value')] = (playerOne.turn) ? 'X' : 'O';
            e.target.innerHTML = ((playerOne.turn) ? 'X' : 'O');
            if (checkWinner()){
                alert('You have won!');
            } else {
                switchTurn();
            }
        } else if (e.target.id==='box' && e.target.innerHTML != '') {
            alert('Please pick an empty square');
        }
    });
})();


