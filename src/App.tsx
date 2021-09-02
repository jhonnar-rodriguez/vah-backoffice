import "./App.css";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import store from "./store";

import Routes from "./app/routes";
import { ThemeProvider } from "@material-ui/core";
import theme from "./app/theme";

const browserHistory = createBrowserHistory();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
