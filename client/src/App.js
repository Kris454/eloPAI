import logo from './logo.svg';
import './App.css';
import Header from './Components/Header'
import Topbar from "./Components/Topbar";
import Bands from "./Components/Bands";
import Albums from "./Components/Albums";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
      <Router>
    <div className="App">

      <header className="App-header">
        <Header />
      </header>
      <header className="App-menu">
        <Topbar />
      </header>
      <header className="App-bands">
        <Bands />
      </header>
      <header className="App-albums">
        <Albums />
      </header>
    </div>
      </Router>
  );
}

export default App;
