import "antd/dist/antd.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AppProvider } from "./components/ContextAPI/AuthState";
import CourseScreen from "./components/Registration/Course";
import HomeScreen from "./components/Registration/HomeScreen";
import PrivateRoute from "./components/Registration/PrivateRoute";
import Registration from "./components/Registration/Registration";
import StudyScreen from "./components/Registration/Study";
import HeaderView from "./HeaderView";

function App() {
  return (
    <div>
      <AppProvider>
        <Router>
          {" "}
          <Switch>
            <Route exact path="/login" component={Registration} />
            <Route exact path="/" component={HomeScreen} />
            <PrivateRoute exact path="/course" component={CourseScreen} />
            <PrivateRoute exact path="/study" component={StudyScreen} />
          </Switch>
        </Router>
      </AppProvider>
    </div>
  );
}

export default App;
