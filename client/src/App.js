import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import "./styles/mainStyle.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/dashboard";

//Login Flow
import store from "./redux/store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./redux/actions/authActions";
import { clearCurrentProfile } from "./redux/actions/profileActions";

//Private Routes
import PrivateRoute from "./components/common/privateRoute";
import CreateProfile from "./components/createProfile/createProfile";
import EditProfile from "./components/editProfile/editprofile";
import AddExperience from "./components/add-credentials/addExperience";
import AddEducation from "./components/add-credentials/addEducation";
import Profiles from "./components/profiles/profiles";
import Profile from "./components/profile/profile";
import Posts from "./components/posts/posts";
import Post from "./components/post/post";

//LOGIN - JWT TOKEN
//Verificamos que el token este guardado en el local storage
if (localStorage.jwtToken) {
  //Si el token esta guardado en localstorage, seteanos/guardamos el token en el header para autentificaciones
  setAuthToken(localStorage.jwtToken);
  //Decodificamos el token y accedemos a la info de usuario y el periodo de expiracion
  const decoded = jwt_decode(localStorage.jwtToken);
  //Seteamos/guardamos el usuario en "SetCurrentUser" y cambioamos el state de "isAuthenticated"
  store.dispatch(setCurrentUser(decoded));

  //Chequeamos si el token esta expirado
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Si esta expirado, deslogamos al usuario
    store.dispatch(logoutUser());
    //Si esta expirado, tambien limpiamos el profile
    store.dispatch(clearCurrentProfile());
    //Si delogamos al usuario, debemos limpiar el profile y redirigir al usuario a la pagina de Login
    window.location.href = "/login";
  }
}

function App() {
  return (
    <Router>
      <div className="App-header">
        <Navbar />
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/profile/:handle" component={Profile} />
        {/*
          Las rutas privadas tienen que esar en vueltas en Switch
          */}
        <Switch>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
        <Switch>
          <PrivateRoute
            exact
            path="/create-profile"
            component={CreateProfile}
          />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        </Switch>
        <Switch>
          <PrivateRoute
            exact
            path="/add-experience"
            component={AddExperience}
          />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/add-education" component={AddEducation} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/feed" component={Posts} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/post/:id" component={Post} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
