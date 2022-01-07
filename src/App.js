import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import VoterId from './components/voter-id/Voter-Id';
import Error from './components/error/Error';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Results from './components/results/Results';
import MyVote from './components/myVote/MyVote';
import { db } from './firebase.js';
import { useEffect, useState } from 'react';

function App() {

  const [parties, setParties] = useState([]);

  useEffect(() => {
    db
      .collection('parties')
      .onSnapshot(snapshot => (
        setParties(snapshot.docs.map(doc => doc.data()))
      ));
  }, []);

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/error/:id" element={<Error />} />
          <Route path="/results" element={<Results parties={parties} />} />
          <Route path="/myvote" element={<MyVote requestAccount={requestAccount} />} />
          <Route path="/" element={<VoterId parties={parties} requestAccount={requestAccount} />} />
          <Route path="*" element={<div>Error! Page Not Found!</div>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
