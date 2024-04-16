import  { useState } from 'react';
import './Guess.css'; 

function GuessNumberGame() {
  const [numberToGuess, setNumberToGuess] = useState(Math.floor(Math.random() * 99) + 1);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('There is a number between 1 and 99. Try to guess it!');
  const [attempts, setAttempts] = useState(0);
  const [guessHistory, setGuessHistory] = useState([]);

  const handleGuess = (event) => {
    event.preventDefault();
    const userGuess = parseInt(guess, 10);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 99) {
      setMessage('Please enter a valid number between 1 and 99.');  // Keeps this message if input is invalid
      return;
    }

    const newGuessRecord = `Guess: ${userGuess} - `;
    setAttempts(attempts + 1);

    if (userGuess < numberToGuess) {
      setMessage('Too low! Try again.');
      setGuessHistory([...guessHistory, newGuessRecord + 'Too low']);
    } else if (userGuess > numberToGuess) {
      setMessage('Too high! Try again.');
      setGuessHistory([...guessHistory, newGuessRecord + 'Too high']);
    } else {
      setMessage('Congratulations! You got the number!');  // Change message on correct guess
      setGuessHistory([...guessHistory, newGuessRecord + 'Correct!']);
      setNumberToGuess(Math.floor(Math.random() * 99) + 1); // Optionally reset the number
    }
    setGuess('');
  };

  const resetGame = () => {
    setNumberToGuess(Math.floor(Math.random() * 99) + 1);
    setMessage('I have thought of a new number between 1 and 99. Try to guess it!');
    setAttempts(0);
    setGuess('');
    setGuessHistory([]); // Clear guess history
  };

  return (
    <div className="game">
      <h1>Number Guessing Game</h1>
      <p>{message}</p>
      <form onSubmit={handleGuess}>
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Enter a number between 1-99"
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={resetGame}>Guess Again</button>
      <div>
        <h2>Guess History</h2>
        <ul>
          {guessHistory.map((record, index) => (
            <li key={index}>{record}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GuessNumberGame;