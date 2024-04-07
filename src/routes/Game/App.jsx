import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import GameListPage from './GameListPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/gamelist" element={<GameListPage />} />
        {/* 其他游戏路由 */}
      </Routes>
    </Router>
  );
}

export default App;
