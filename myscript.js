const playerFactory = (name) => {
    let turn = false;
    let score = 0;
    let marker = '';

    function incrementScore() {
        score += 1;
    }

    function resetScore() {
        score = 0;
    }

    function getScore() {
        return score;
    }

    return { name, incrementScore, getScore, marker, turn, resetScore };
};



const Gameboard = (() => {
    var maxTurns = 9;
    var gameArray = new Array(9).fill(0);
    for (i = 0; i < maxTurns; i++) {
        const box = document.createElement('div');
        box.className = 'gameBoardBox';
        box.setAttribute("value", i);
        box.setAttribute('id', 'box');
        const board = document.querySelector('.board-grid');
        board.appendChild(box);
    }

    function clearBoard() {
        let boxes = document.getElementsByClassName('gameBoardBox');
        for (i = 0; i < boxes.length; i++) {
            boxes[i].innerHTML = '';
        }
        for (j = 0; j < gameArray.length; j++) {
            gameArray[j] = 0;
        }
        Game.winner.style.display = 'none';
    }

    function resetGame() {
        clearBoard();
        Game.resetTurn();
        Game.playerOne.resetScore();
        Game.playerTwo.resetScore();
        updateScore();
    }

    function updateScore() {
        const p1Score = document.querySelector('.p1Score');
        const p2Score = document.querySelector('.p2Score');
        p1Score.innerHTML = Game.playerOne.getScore();
        p2Score.innerHTML = Game.playerTwo.getScore();
    }

    return { gameArray, resetGame, updateScore, clearBoard };

})();



const Game = (() => {
    const playerOne = playerFactory('Player1');
    const playerTwo = playerFactory('Player2')
    playerOne.marker = 'X';
    playerTwo.marker = 'O';
    playerOne.turn = true;
    let turnNum = 0;
    let winner = document.getElementById('winner');
    winner.style.display = 'none';

    function resetTurn() {
        turnNum = 0;
    }

    function switchTurn() {
        if (playerOne.turn) {
            playerOne.turn = !playerOne.turn;
            playerTwo.turn = !playerTwo.turn;
        } else {
            playerOne.turn = !playerOne.turn;
            playerTwo.turn = !playerTwo.turn;
        }
        turnNum += 1;
    }

    function displayWinner() {
        if(playerOne.turn){
            winner.innerHTML = 'Player1 Wins!';
            winner.style.display = 'block';
        } else {
            winner.innerHTML = 'Player2 Wins!';
            winner.style.display = 'block';
        }
    }
    
    function checkWinner() {
        for (j = 0; j < 3; j++) {
            if (Gameboard.gameArray[j] != 0 && ((Gameboard.gameArray[j] === Gameboard.gameArray[j + 3]) && (Gameboard.gameArray[j + 3] === Gameboard.gameArray[j + 6]))) {
                return true;
            } else if (Gameboard.gameArray[(j * 3)] != 0 && (Gameboard.gameArray[(j * 3)] === Gameboard.gameArray[(j * 3) + 1]) && (Gameboard.gameArray[(j * 3) + 1] === Gameboard.gameArray[(j * 3) + 2])) {
                return true;
            } else if (Gameboard.gameArray[0] != 0 && ((Gameboard.gameArray[0] === Gameboard.gameArray[4]) && (Gameboard.gameArray[4] === Gameboard.gameArray[8]))) {
                return true;
            } else if (Gameboard.gameArray[2] != 0 && ((Gameboard.gameArray[2] === Gameboard.gameArray[4]) && (Gameboard.gameArray[4] === Gameboard.gameArray[6]))) {
                return true;
            }
        }
        return false;
    }

    document.addEventListener('click', function (e) {
        if (e.target && e.target.id == 'box' && e.target.innerHTML == '') {
            Gameboard.gameArray[e.target.getAttribute('value')] = (playerOne.turn) ? 'X' : 'O';
            e.target.innerHTML = ((playerOne.turn) ? 'X' : 'O');
            if (checkWinner()) {
                playerOne.turn ? playerOne.incrementScore() : playerTwo.incrementScore();
                displayWinner();
                Gameboard.updateScore();
                turnNum = 0;
                playerOne.turn = true;
                playerTwo.turn = false;
            } else if (turnNum == 8) {
                winner.innerHTML = 'Tie game!';
                winner.style.display = 'block';
                turnNum = 0;
            } else {
                switchTurn();
            }
        } else if (e.target.id === 'box' && e.target.innerHTML != '') {
            alert('Please pick an empty square');
        }
    });

    return { resetTurn, playerOne, playerTwo, winner };

})();


