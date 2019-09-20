import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute'
import Login from "./components/Login";
import Bubbles from './components/BubblePage'
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute path="/bubbles" component={Bubbles} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
