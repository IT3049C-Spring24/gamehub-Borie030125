import { useState, useEffect } from 'react';
import './Wordle.css';

function Game() {
    const gameConfig = { rows: 5, cols: 5 };
    const [gameState, setGameState] = useState({
        wordToGuess: '',
        currentAttempt: 0,
        currentPosition: 0,
        guesses: Array(5).fill(null).map(() => Array(5).fill('')),
        gameFinished: false
    });
    const [isInitialized, setIsInitialized] = useState(false); 

    useEffect(() => {
        if (!isInitialized) {
            setRandomWordAsTarget();
        }
    }, [isInitialized]); 

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (gameState.gameFinished || !gameState.wordToGuess) return;
            const { key } = event;
            if (key === 'Enter') {
                submitGuess();
            } else if (key === 'Backspace') {
                removeLetter();
            } else if (/^[a-z]$/i.test(key) && gameState.currentPosition < gameConfig.cols) {
                addLetter(key);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameState.currentPosition, gameState.currentAttempt, gameState.gameFinished, gameState.wordToGuess]);

    const setRandomWordAsTarget = async () => {
        try {
            let word = '';
            while (word.length !== 5) {
                const response = await fetch('https://random-word-api.herokuapp.com/word?number=1');
                if (!response.ok) throw new Error('Failed to fetch the word.');
                const [fetchedWord] = await response.json();
                if (fetchedWord.length === 5) {
                    word = fetchedWord.toLowerCase();
                    break;
                }
            }
            setGameState(prevState => ({ ...prevState, wordToGuess: word }));
            setIsInitialized(true); 
        } catch (error) {
            console.error("Error setting random word as target:", error);
        }
    };

    const addLetter = (letter) => {
        if (gameState.currentPosition < gameConfig.cols) {
            const newGuesses = gameState.guesses.slice();
            newGuesses[gameState.currentAttempt][gameState.currentPosition] = letter.toUpperCase();
            setGameState(prevState => ({
                ...prevState,
                guesses: newGuesses,
                currentPosition: prevState.currentPosition + 1
            }));
        }
    };

    const removeLetter = () => {
        if (gameState.currentPosition > 0) {
            const newGuesses = gameState.guesses.slice();
            newGuesses[gameState.currentAttempt][gameState.currentPosition - 1] = '';
            setGameState(prevState => ({
                ...prevState,
                guesses: newGuesses,
                currentPosition: prevState.currentPosition - 1
            }));
        }
    };

    const submitGuess = () => {
        if (gameState.currentPosition === gameConfig.cols) {
            const isCorrect = gameState.guesses[gameState.currentAttempt].join('').toLowerCase() === gameState.wordToGuess;
            if (isCorrect || gameState.currentAttempt === gameConfig.rows - 1) {
                setGameState(prevState => ({ ...prevState, gameFinished: true }));
                console.log('Game Over:', isCorrect ? 'You win!' : 'You lose!');
            } else {
                setGameState(prevState => ({
                    ...prevState,
                    currentAttempt: prevState.currentAttempt + 1,
                    currentPosition: 0
                }));
            }
        } else {
            console.log('Not enough letters');
        }
    };

    return (
        <div className="game" tabIndex="0">
            <header>
                <h1>Wordle</h1>
                <button onClick={() => document.body.classList.toggle('light-mode')}>Toggle Dark/Light Mode</button>
            </header>
            <div id="wordle-grid">
                {gameState.guesses.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((letter, letterIndex) => (
                            <div key={letterIndex} className={`letter ${determineCellClass(rowIndex, letterIndex, letter)}`}>
                                {letter}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div>The word is: {gameState.wordToGuess}</div>
        </div>
    );

    function determineCellClass(row, col, letter) {
        if (row < gameState.currentAttempt || (row === gameState.currentAttempt && col < gameState.currentPosition)) {
            if (letter.toLowerCase() === gameState.wordToGuess[col]) {
                return 'correct';
            } else if (gameState.wordToGuess.includes(letter.toLowerCase())) {
                return 'misplaced';
            } else {
                return 'wrong';
            }
        }
        return '';
    }
}

export default Game;
