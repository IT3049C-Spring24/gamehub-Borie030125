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

    useEffect(() => {
        setRandomWordAsTarget();
    }, []); 

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
    }, [gameState]);

    const setRandomWordAsTarget = async () => {
        let fetchedWord = '';
        while (!fetchedWord) {
            try {
                const response = await fetch('https://it3049c-hangman.fly.dev');
                if (!response.ok) throw new Error('Failed to fetch the word.');
                const data = await response.json();
                if (await isWordValid(data.word)) {
                    fetchedWord = data.word.toLowerCase();
                }
            } catch (error) {
                console.error("Error fetching or validating the word:", error);
            }
        }
        setGameState(prevState => ({ ...prevState, wordToGuess: fetchedWord }));
    };

    async function isWordValid(word) {
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        try {
            const response = await fetch(url);
            return response.ok;  
        } catch (error) {
            console.error("Error validating the word with dictionary API:", error);
            return false;
        }
    }

    const addLetter = (letter) => {
        setGameState(prevState => {
            const newGuesses = prevState.guesses.slice();
            newGuesses[prevState.currentAttempt][prevState.currentPosition] = letter.toUpperCase();
            return {
                ...prevState,
                guesses: newGuesses,
                currentPosition: prevState.currentPosition + 1
            };
        });
    };

    const removeLetter = () => {
        setGameState(prevState => {
            const newGuesses = prevState.guesses.slice();
            newGuesses[prevState.currentAttempt][prevState.currentPosition - 1] = '';
            return {
                ...prevState,
                guesses: newGuesses,
                currentPosition: prevState.currentPosition - 1
            };
        });
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
        <div className="game">
            <header>
                <h1>Wordle</h1>
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

