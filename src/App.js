import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import VoterId from './components/voter-id/Voter-Id';
import Error from './components/error/Error';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/error/:id" element={<Error />} />
          <Route path="/" element={<VoterId />} />
          <Route path="*" element={<div>Error! Page Not Found!</div>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
