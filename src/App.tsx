import "./App.css";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import store from "./store";

import Routes from "./app/routes";

const browserHistory = createBrowserHistory();

const App = () => {
  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Routes />
      </Router>
    </Provider>
  );
}

export default App;
