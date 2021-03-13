import React from "react";
import HomePage from "./containers/HomePage/HomePage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductListPage from "./containers/ProductListPage/ProductListPage";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/:slug" exact component={ProductListPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
