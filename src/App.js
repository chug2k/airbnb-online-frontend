import React from "react";
import ExperiencesList from "./components/ExperiencesList";
import AddExperience from "./components/AddExperience";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "rheostat/initialize";
import "rheostat/css/rheostat.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/add">
            <AddExperience />
          </Route>
          <Route path="/">
            <ExperiencesList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
