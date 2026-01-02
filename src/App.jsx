import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import CategoryHome from './pages/CategoryHome';
import './App.css'; // ここで全体のレイアウトを調整

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <div className="content-wrapper">
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/post/:id" element={<PostDetail />} />
              <Route path="/category/:categoryId" element={<CategoryHome />} />
            </Routes>
          </main>
          <Sidebar />
        </div>
      </div>
    </Router>
  );
}

export default App;
