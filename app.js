//DOM Elements => Game Area
const board = document.getElementById('game-board');
const message = document.getElementById('message');
const keyboard = document.getElementById('keyboard');
const wordList = words;


// Global Variables => Game Controllers
const keys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'];
const targetWord = words[Math.floor(Math.random() * wordList.length)]; 
const gameBoard = [
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
]

let currentRow = 0;
let currentPosition = 0;
let guessedWord = '';
let isGameOver = false;


//Functions
const startGame = () => {
    drawKeyboard();
    drawBoard();

};

const drawBoard = () => {
    gameBoard.forEach((oneRow, i) => {
        const row = document.createElement('div');
        row.setAttribute('id',`row-${i}`);
        row.classList.add('row')
        board.appendChild(row);

        oneRow.forEach((oneCard, index) => {
            const card = document.createElement('div')
            card.setAttribute('id', `row-${i}-card-${index}`)
            card.innerText = oneCard;
            card.classList.add('card')
            row.appendChild(card);
        });
    });
};

const drawKeyboard = () => {
	keys.forEach((key) => {
		const btnKey = document.createElement('button');
		btnKey.innerHTML = key;
		btnKey.setAttribute('value', key);
		btnKey.setAttribute('id', `key-${key}`);
		btnKey.addEventListener('click', () => handleClick(key));
		keyboard.appendChild(btnKey);
	});
};


const startNewGuess = () => {
    currentPosition = 0;
    currentRow++;

    if(currentRow > 5 && !isGameOver == false){
        message.innerText = `You missed, the correct word was ${targetWord}`;
        isGameOver = true
    };
};

const handleClick = ((letter1)=> {
    if (letter1 === '⌫'){
        deleteLetter();
    } else if (letter1 === 'ENTER'){
        submitGuess()
    } else {
        addLetter(letter1);
    }

});

const submitGuess = () => {
    if (currentPosition < 5){
        return message.innerText = 'Not long enough';

    }

    guessedWord = gameBoard[currentRow].join('').toLocaleLowerCase();
    if (guessedWord === targetWord){
        message.innerText = 'Cool! You got it!';
        checkLetters();
        isGameOver = true;
    } else if (!wordList.includes(guessedWord)){
        message.innerText = 'Not in the word list';
        checkLetters();
        startNewGuess();
    } else {
        checkLetters()
        startNewGuess();
    }
};

const addLetter = ((letter) => {
	if (currentPosition < 5 && currentRow <= 6) {
		//Updates DOM
		const cardElement = document.getElementById(`row-${currentRow}-card-${currentPosition}`);
        cardElement.innerText = letter;
		cardElement.classList.add('has-letter');

		//Updates game controllers
		gameBoard[currentRow][currentPosition] = letter;
		return currentPosition++;
	}
	return
});

const deleteLetter = () => {
    message.innerText = '';
    //Conditional to check if its possible to delete characters
    if(currentPosition > 0 && currentPosition <= 5){
        const cardElement = document.getElementById(`row-${currentRow}-card-${currentPosition}`)
        cardElement.innerText = '';
        cardElement.classList.remove('has-letter');
    
    //Updates game controller
        gameBoard[currentRow][currentPosition - 1] = '';
        currentPosition --;
    };
};

const checkLetters = () =>{
    const guessedLetters = gameBoard[currentRow];

    guessedLetters.forEach((letter,i) =>{
        const card = document.getElementById(`row-${currentRow}-card-${i}`);
        const btnKey = document.getElementById(`key-${letter}`);

        if (targetWord[i] === letter.toLocaleLowerCase()){
        card.classList.add('correct');
        btnKey.classList.add('correct');

        } else if (targetWord.includes(letter.toLocaleLowerCase())){
            card.classList.add('wrong-place');
            btnKey.classList.add('wrong.place');

        } else {
            card.classList.add('wrong');
            btnKey.classList.add('wrong');
        };

    });

};

//Initializes the Game
startGame();
