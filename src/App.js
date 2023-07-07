import "./App.css";
import Login from "./Pages/SignUp/Login";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './Pages/WelcomeScreen/WelcomePage'
import SignUp from "./Pages/SignUp/SignUp";
import ChatScreen from "./ChatScreen/chatScreen";
import { PrivateRoute } from "./PvtRoute/PrivateRoute";

function App() {
  return (
    <div className="App-header">
      <div className="main-content">
        <Router>
          <Routes>
            {/* <Route path="/" element={<ChatScreen />} /> */}
            <Route element={<PrivateRoute />}>
              <Route index path="/" element={<Welcome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route  element={<ChatScreen />} path="/chat" />
            </Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
