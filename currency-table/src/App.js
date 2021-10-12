import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" component={Home}/>
        <Route path="/signin"  />
        <Route path="/sign-up" />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
