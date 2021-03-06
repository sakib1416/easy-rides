
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
import { createContext, useState } from 'react';
import Register from './components/Register/Register';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import BookTransport from './components/BookTransport/BookTransport';
import Destination from './components/Destination/Destination';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  
  return (
    <UserContext.Provider value = {[loggedInUser, setLoggedInUser]}>
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
          <PrivateRoute path = "/destination/:transportType">
            <BookTransport></BookTransport>
          </PrivateRoute>
          <PrivateRoute path = "/destination">
            <Destination></Destination>
          </PrivateRoute>
          <Route path="/register">
            <Register></Register>
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
    </UserContext.Provider>
  );
}

export default App;
