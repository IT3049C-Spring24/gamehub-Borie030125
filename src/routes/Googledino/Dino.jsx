import { useRef, useEffect, useState } from 'react';
import './Dino.css'; // 引入CSS样式

const Game = () => {
    const canvasRef = useRef(null);
    const [gameOver, setGameOver] = useState(false);
    const [isRunning, setIsRunning] = useState(true);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // 游戏对象
        const trex = { x: 50, y: 150, width: 20, height: 20 };
        const obstacles = [
            { x: canvas.width, y: 150, width: 20, height: 20 },
            { x: canvas.width + 200, y: 150, width: 20, height: 20 }
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
            ctx.fillRect(trex.x, trex.y, trex.width, trex.height);

            // 更新并绘制障碍物
            obstacles.forEach((obstacle, index) => {
                obstacle.x -= 5;
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

        return () => {
            cancelAnimationFrame(animationFrameId);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isRunning]);

    const restartGame = () => {
        setGameOver(false);
        setIsRunning(true);
    };

    return (
        <div>
            <canvas ref={canvasRef} width={800} height={200} className="game-canvas"></canvas>
            {gameOver && (
                <div>
                    <p>游戏结束！</p>
                    <button onClick={restartGame}>重新开始</button>
                </div>
            )}
        </div>
    );
};

export default Game;
