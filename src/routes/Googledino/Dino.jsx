import { useRef, useEffect, useState } from 'react';
import './Dino.css'; 

const Game = () => {
    const canvasRef = useRef(null);
    const [gameOver, setGameOver] = useState(false);
    const [isRunning, setIsRunning] = useState(true);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(() => {
        return Number(localStorage.getItem('highScore')) || 0;
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId; 

        const trex = { x: 50, y: 150, width: 20, height: 20 };
        const obstacles = initObstacles();

        function initObstacles() {
            let obs = [];
            let xPosition = 1000; // First Obstacle position

            for (let i = 0; i < 100; i++) {
                let height = Math.random() * 15 + 15; // Random height，between 15-30
                let width = Math.random() * 15 + 10;  // Random width，between 15-30
                obs.push({
                    x: xPosition,
                    y: canvas.height - height -30, // Just let trex and obstacles at the same height
                    width: width,
                    height: height
                });
                xPosition += Math.random() * 200 + 200; // Location of next obstacles, distance is over 200
            }
            return obs;
        }

        const jump = () => {
            let jumpHeight = 0;
            const maxJumpHeight = 50;
            const jumpSpeed = 5;

            const jumpInterval = setInterval(() => {
                if (jumpHeight >= maxJumpHeight) {
                    clearInterval(jumpInterval);
                    fall();
                } else {
                    trex.y -= jumpSpeed; //In fact up in the screen
                    jumpHeight += jumpSpeed;
                }
            }, 20);
        };

        const fall = () => {
            const fallSpeed = 5;
            const fallInterval = setInterval(() => {
                if (trex.y < 150) {
                    trex.y += fallSpeed;
                } else {
                    clearInterval(fallInterval);
                }
            }, 20);
        };

        const updateGame = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            //Ground
            ctx.fillStyle = 'white';
            ctx.fillRect(0, canvas.height-30, canvas.width, 2);

            // Draw T-Rex
            ctx.fillStyle = 'white';
            ctx.fillRect(trex.x, trex.y, trex.width, trex.height);

            // Renew obstacle
            obstacles.forEach((obstacle) => {
                obstacle.x -= 2.5;
                ctx.fillStyle = 'red';
                ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

                // Detect Gameover
                if (trex.x < obstacle.x + obstacle.width &&
                    trex.x + trex.width > obstacle.x &&
                    trex.y < obstacle.y + obstacle.height &&
                    trex.y + trex.height > obstacle.y) {
                    setGameOver(true);
                    setIsRunning(false);
                }
            });

            if (isRunning) {
                animationFrameId = requestAnimationFrame(updateGame);
            }
        };

        const handleKeyDown = (e) => {
            if (e.keyCode === 32 && trex.y >= 150) { // Space
                jump();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        animationFrameId = requestAnimationFrame(updateGame);

        const scoreInterval = setInterval(() => {
            if (isRunning) {
                setScore(prevScore => {
                    const newScore = prevScore + 1;
                    if (newScore > highScore) {
                        setHighScore(newScore);
                        localStorage.setItem('highScore', newScore.toString());
                    }
                    return newScore;
                });
            }
        }, 100);

        return () => {
            clearInterval(scoreInterval);
            cancelAnimationFrame(animationFrameId);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isRunning]);

    const restartGame = () => {
        setGameOver(false);
        setIsRunning(true);
        setScore(0);
    };

    

    return (
        <div>
            
            <canvas ref={canvasRef} width={800} height={200} className="game-canvas"></canvas>
            <div>
                <p>Score: {score}</p>
                <p>High Score: {highScore}</p>
                {gameOver && (
                    <div>
                        <p>Game Over!</p>
                        <button onClick={restartGame}>Restart Game</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Game;
