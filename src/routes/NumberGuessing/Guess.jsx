import { useState } from 'react';
import './Guess.css'; // 确保已经正确引入CSS文件

function GuessNumberGame() {
  const [numberToGuess, setNumberToGuess] = useState(Math.floor(Math.random() * 99) + 1);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('I have thought of a number between 1 and 99. Try to guess it!');
  const [attempts, setAttempts] = useState(0);

  const handleGuess = (event) => {
    event.preventDefault();
    const userGuess = parseInt(guess, 10);
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 99) {
      setMessage('Please enter a valid number between 1 and 99.');
      return;
    }

    setAttempts(attempts + 1);

    if (userGuess < numberToGuess) {
      setMessage('Too low! Try again.');
    } else if (userGuess > numberToGuess) {
      setMessage('Too high! Try again.');
    } else {
      setMessage(`Congratulations! The correct answer was ${numberToGuess}. You took ${attempts + 1} attempts.`);
    }
    setGuess('');
  };

  const resetGame = () => {
    setNumberToGuess(Math.floor(Math.random() * 99) + 1);
    setMessage('I have thought of a new number between 1 and 99. Try to guess it!');
    setAttempts(0);
    setGuess('');
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
    </div>
  );
}

export default GuessNumberGame;
