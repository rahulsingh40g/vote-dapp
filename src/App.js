import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import VoterId from './components/voter-id/Voter-Id';
import Error from './components/error/Error';
import Success from './components/success/Success';

function App() {
  return (
    <div className="app">
      <Header />
      <Success />
      <Footer />
    </div>
  );
}

export default App;
