
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './components/Header/Header';
import Blog from './components/Blog/Blog';
import Contact from './components/Contact/Contact';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import NoPageFound from './components/NoPageFound/NoPageFound';

function App() {
  return (
    <div className="App">
      
      <Router>
      <Header></Header>
        <Switch>
          <Route path="/blog">
            <Blog></Blog>
          </Route>
          <Route path="/contact">
            <Contact></Contact>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="*">
            <NoPageFound></NoPageFound>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
