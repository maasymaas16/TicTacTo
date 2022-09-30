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
    const gameArray = new Array(3).fill(0).map(() => new Array(3).fill(0));
    for (i = 0; i < maxTurns; i++){
        const box = document.createElement('div');
        box.className = 'gameBoardBox';
        box.setAttribute('id', 'box');
        const board = document.querySelector('.board-grid');
        board.appendChild(box);
    }
    
})();

const Game = (() => {
    const playerOne = playerFactory('Player1');
    const playerTwo = playerFactory('Player2')
    playerOne.marker = 'X';
    playerTwo.marker = 'O';
    playerOne.turn = true;
    var maxTurns = 9;

    function switchTurn(){
        if (playerOne.turn == true){
            playerOne.turn = false;
            playerTwo.turn = true;
        } else {
            playerOne.turn = true;
            playerTwo.turn = false;
        }
        }

    var turnNum = 0;
    if (turnNum < maxTurns){
        const placeMarker = function(){
            document.addEventListener('click', function(e){
                if(e.target && e.target.id==='box'){
                    e.target.innerHTML = ((playerOne.turn) ? 'X' : 'O');
                }
                switchTurn();
                turnNum += 1;
                console.log(turnNum);
            });
        }();
    }
})();

