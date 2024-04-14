import { Link } from "react-router-dom";

export default function GamelistPage() {
    return(
        <dev>
            <h1>Game List Page</h1>
            <p>Testwords</p>
            <ul>
                <li><Link to={`/rps`}>Rock Paper Scissors</Link></li>
            </ul>
        </dev>
    );
}