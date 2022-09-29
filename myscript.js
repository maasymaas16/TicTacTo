const playerFactory = (name, score) => {
    return { name, score };
};

const Gameboard = (() => {
    const gameArray = new Array(3).fill(0).map(() => new Array(3).fill(0));
    for (i = 0; i < 9; i++){
        const box = document.createElement('div');
        box.className = 'gameBoardBox';
        box.setAttribute('id', 'box'+ i);
        const board = document.querySelector('.board-grid');
        board.appendChild(box);
    
    }

})();

const Game = (() => {

})();

