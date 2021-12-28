import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import VoterId from './components/voter-id/Voter-Id';
import Error from './components/error/Error';
import Success from './components/success/Success';
import Candidates from './components/candidates/Candidates';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/success" element={<Success />} />
          <Route path="/error" element={<Error />} />
          <Route path="/" element={<VoterId />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
