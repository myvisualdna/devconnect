import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

//Register User
//Esta accion recibe "userData" que viene desde el frontend (en el frontend se llama "newUser")
export const registerUser = (newUser, history) => (dispatch) => {
  axios
    .post("/api/users/register", newUser)
    .then((res) => history.push("/login"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Login - Get User token
export const loginUser = (loggedUser, history) => (dispatch) => {
  axios
    .post("/api/users/login", loggedUser)
    .then((res) => {
      //Save to localStorage
      const { token } = res.data;

      //Set token to localStorage
      localStorage.setItem("jwtToken", token);
      //Set token to Auth header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);
      //Set current user
      dispatch(setCurrentUser(decoded));
      console.log(decoded);
    })
    .then((res) => history.push("/dashboard"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Creamos una accion que setea/establece el usuario logado actual
//Pasando en el payload, la informacion introducida por el usuario (llamado decoded)
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

//User LOGOUT
export const logoutUser = () => (dispatch) => {
  //Removemos el token en localStorage
  localStorage.removeItem("jwtToken");
  //Removemos el token en el header de autentificaciones para futuras requests
  setAuthToken(false);
  //Seteamos "CurrentUser" como objeto vacio {}, lo que ahra que "isAuthenticated" sea falso
  dispatch(setCurrentUser({}));
};
