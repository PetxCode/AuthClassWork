import "antd/dist/antd.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AppProvider } from "./components/ContextAPI/AuthState";
import ImageUpload from "./components/FileUpload/ImageUpload";
import CourseScreen from "./components/Registration/Course";
import HomeScreen from "./components/Registration/HomeScreen";
// import PrivateRoute from "./components/Registration/PrivateRoute";
import Registration from "./components/Registration/Registration";
// import StudyScreen from "./components/Registration/Study";
import HeaderView from "./HeaderView";
import { AuthProvider } from "./WorkFile/Context/AuthManager";
import PrivateRoute from "./WorkFile/Context/PrivateRoute";
import Courese from "./WorkFile/HomeDesign/Courese";
import HomeDesign from "./WorkFile/HomeDesign/HomeDesign";
import Report from "./WorkFile/HomeDesign/Report";
import StudyScreen from "./WorkFile/HomeDesign/StudyPage";
import UserRegistration from "./WorkFile/HomeDesign/UserRegistration";
import RentAHome from "./RentAHome/RantAHome";
import PostAHome from "./RentAHome/PostAHome";
import ViewDetail from "./RentAHome/ViewDetail";

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          {" "}
          <Switch>
            <Route exact path="/" component={HomeDesign} />
            <Route exact path="/edit/:id" component={ViewDetail} />
            <Route exact path="/rent" component={RentAHome} />
            <Route exact path="/post" component={PostAHome} />
            <Route exact path="/reg" component={UserRegistration} />
            <PrivateRoute exact path="/cos" component={Courese} />
            <PrivateRoute exact path="/report" component={Report} />
            <PrivateRoute exact path="/stu" component={StudyScreen} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;

// <Route exact path="/login" component={Registration} />
//             <Route exact path="/" component={HomeScreen} />
//             <Route exact path="/upload" component={ImageUpload} />
//             <PrivateRoute exact path="/course" component={CourseScreen} />
//             <PrivateRoute exact path="/study" component={StudyScreen} />
