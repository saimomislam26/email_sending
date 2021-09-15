import './App.css';
import { Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './Header/Navbar';
import Login from './Body/Login';
import Signup from './Body/Signup';
import Sendemail from './Body/Sendemail';
import Show from './Body/Show';
import Logout from './Body/Logout';
function App() {
  return (
    <div className="App">
      <Navbar />
      <Route exact path="/">
        <Signup />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/sendemail">
        <Sendemail />
      </Route>
      <Route path="/show">
        <Show />
      </Route>
      <Route path="/logout">
        <Logout />
      </Route>

    </div>
  );
}

export default App;
