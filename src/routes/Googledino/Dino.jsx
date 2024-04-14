import { useRef, useEffect, useState } from 'react';
import './Dino.css'; // 引入CSS样式

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

        // 游戏对象
        const trex = { x: 50, y: 150, width: 20, height: 20 };
        const obstacles = [
            { x: 1000, y: 150, width: 20, height: 35 },
            { x: 1400, y: 150, width: 15, height: 20 },
            { x: 1850, y: 150, width: 12, height: 15 },
            { x: 2250, y: 150, width: 30, height: 30 },
            { x: 2700, y: 150, width: 25, height: 30 },
            { x: 3150, y: 150, width: 18, height: 12 },
            { x: 3550, y: 150, width: 14, height: 28 },
            { x: 4000, y: 150, width: 16, height: 22 },
            { x: 4450, y: 150, width: 28, height: 20 },
            { x: 4900, y: 150, width: 10, height: 38 },
            { x: 5300, y: 150, width: 27, height: 16 },
            { x: 5700, y: 150, width: 22, height: 24 },
            { x: 6100, y: 150, width: 17, height: 29 },
            { x: 6500, y: 150, width: 21, height: 21 },
            { x: 6900, y: 150, width: 26, height: 19 },
            { x: 7300, y: 150, width: 19, height: 23 },
            { x: 7700, y: 150, width: 13, height: 27 },
            { x: 8100, y: 150, width: 29, height: 18 },
            { x: 8500, y: 150, width: 23, height: 26 },
            { x: 8900, y: 150, width: 11, height: 17 },
            { x: 9300, y: 150, width: 24, height: 28 },
            { x: 9700, y: 150, width: 18, height: 20 },
            { x: 10100, y: 150, width: 20, height: 15 },
            { x: 10500, y: 150, width: 15, height: 22 },
            { x: 10900, y: 150, width: 26, height: 12 },
            { x: 11300, y: 150, width: 14, height: 25 },
            { x: 11700, y: 150, width: 18, height: 18 },
            { x: 12100, y: 150, width: 29, height: 16 },
            { x: 12500, y: 150, width: 17, height: 20 },
            { x: 12900, y: 150, width: 25, height: 14 },
            { x: 13300, y: 150, width: 21, height: 26 },
            { x: 13700, y: 150, width: 12, height: 23 },
            { x: 14100, y: 150, width: 28, height: 19 },
            { x: 14500, y: 150, width: 16, height: 21 },
            { x: 14900, y: 150, width: 20, height: 17 },
            { x: 15300, y: 150, width: 24, height: 29 },
            { x: 15700, y: 150, width: 19, height: 15 },
            { x: 16100, y: 150, width: 27, height: 22 },
            { x: 16500, y: 150, width: 22, height: 24 },
            { x: 16900, y: 150, width: 18, height: 18 },
            { x: 17300, y: 150, width: 14, height: 26 },
            { x: 17700, y: 150, width: 23, height: 20 },
            { x: 18100, y: 150, width: 16, height: 12 },
            { x: 18500, y: 150, width: 25, height: 27 },
            { x: 18900, y: 150, width: 21, height: 16 },
            { x: 19300, y: 150, width: 19, height: 21 },
            { x: 19700, y: 150, width: 27, height: 25 },
            { x: 20100, y: 150, width: 15, height: 18 },
            { x: 20500, y: 150, width: 12, height: 24 },
            { x: 20900, y: 150, width: 28, height: 29 },
            { x: 21300, y: 150, width: 20, height: 14 },
            { x: 21700, y: 150, width: 24, height: 23 },
            { x: 22100, y: 150, width: 17, height: 19 },
            { x: 22500, y: 150, width: 26, height: 21 },
            { x: 22900, y: 150, width: 23, height: 17 },
            { x: 23300, y: 150, width: 15, height: 25 },
            { x: 23700, y: 150, width: 21, height: 20 },
            { x: 24100, y: 150, width: 18, height: 16 },
            { x: 24500, y: 150, width: 29, height: 22 },
            { x: 24900, y: 150, width: 14, height: 18 },
            { x: 25300, y: 150, width: 22, height: 27 },
            { x: 25700, y: 150, width: 20, height: 13 },
            { x: 26100, y: 150, width: 16, height: 28 },
            { x: 26500, y: 150, width: 25, height: 17 },
            { x: 26900, y: 150, width: 19, height: 19 },
            { x: 27300, y: 150, width: 12, height: 26 },
            { x: 27700, y: 150, width: 27, height: 15 },
            { x: 28100, y: 150, width: 21, height: 24 },
            { x: 28500, y: 150, width: 18, height: 20 },
            { x: 28900, y: 150, width: 24, height: 17 },
            { x: 29300, y: 150, width: 15, height: 23 },
            { x: 29700, y: 150, width: 23, height: 21 },
            { x: 30100, y: 150, width: 29, height: 16 },
            { x: 30500, y: 150, width: 13, height: 19 },
            { x: 30900, y: 150, width: 22, height: 27 },
            { x: 31300, y: 150, width: 16, height: 14 },
            { x: 31700, y: 150, width: 20, height: 29 },
            { x: 32100, y: 150, width: 25, height: 15 },
            { x: 32500, y: 150, width: 17, height: 22 },
            { x: 32900, y: 150, width: 21, height: 18 },
            { x: 33300, y: 150, width: 26, height: 26 },
            { x: 33700, y: 150, width: 19, height: 13 },
            { x: 34100, y: 150, width: 28, height: 24 },
            { x: 34500, y: 150, width: 12, height: 20 },
            { x: 34900, y: 150, width: 24, height: 17 },
            { x: 35300, y: 150, width: 15, height: 25 },
            { x: 35700, y: 150, width: 23, height: 21 },
            { x: 36100, y: 150, width: 29, height: 16 },
            { x: 36500, y: 150, width: 13, height: 19 },
            { x: 36900, y: 150, width: 22, height: 27 },
            { x: 37300, y: 150, width: 16, height: 14 },
            { x: 37700, y: 150, width: 20, height: 29 },
            { x: 38100, y: 150, width: 25, height: 15 },
            { x: 38500, y: 150, width: 17, height: 22 },
            { x: 38900, y: 150, width: 21, height: 18 },
            { x: 39300, y: 150, width: 26, height: 26 },
            { x: 39700, y: 150, width: 19, height: 13 },
            { x: 40100, y: 150, width: 28, height: 24 },
            { x: 40500, y: 150, width: 12, height: 20 },
            { x: 40900, y: 150, width: 24, height: 17 },
            { x: 41300, y: 150, width: 15, height: 25 },
            { x: 41700, y: 150, width: 23, height: 21 },
            { x: 42100, y: 150, width: 29, height: 16 },
            { x: 42500, y: 150, width: 13, height: 19 },
            { x: 42900, y: 150, width: 22, height: 27 },
            { x: 43300, y: 150, width: 16, height: 14 },
            { x: 43700, y: 150, width: 20, height: 29 },
            { x: 44100, y: 150, width: 25, height: 15 },
            { x: 44500, y: 150, width: 17, height: 22 },
            { x: 44900, y: 150, width: 21, height: 18 },
            { x: 45300, y: 150, width: 26, height: 26 },
            { x: 45700, y: 150, width: 19, height: 13 },
            { x: 46100, y: 150, width: 28, height: 24 },
            { x: 46500, y: 150, width: 12, height: 20 },
            { x: 46900, y: 150, width: 24, height: 17 },
            { x: 47300, y: 150, width: 15, height: 25 },
            { x: 47700, y: 150, width: 23, height: 21 },
            { x: 48100, y: 150, width: 29, height: 16 },
            { x: 48500, y: 150, width: 13, height: 19 },
            { x: 48900, y: 150, width: 22, height: 27 },
            { x: 49300, y: 150, width: 16, height: 14 },
            { x: 49700, y: 150, width: 20, height: 29 },
        ];

        const jump = () => {
            let jumpHeight = 0;
            const maxJumpHeight = 50;
            const jumpSpeed = 5;

            const jumpInterval = setInterval(() => {
                if (jumpHeight >= maxJumpHeight) {
                    clearInterval(jumpInterval);
                    fall();
                } else {
                    trex.y -= jumpSpeed;
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

            // 绘制小恐龙
            ctx.fillStyle = 'white';
            ctx.fillRect(trex.x, trex.y, trex.width, trex.height);

            // 更新并绘制障碍物
            obstacles.forEach((obstacle) => {
                obstacle.x -= 5;
                ctx.fillStyle = 'red';
                ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

                // 碰撞检测
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
            if (e.keyCode === 32 && trex.y >= 150) { // 空格键
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
