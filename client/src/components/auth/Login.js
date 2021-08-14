import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import { loginUser } from "../../redux/actions/authActions";
import { useHistory } from "react-router-dom";
import TextFieldGroup from "../common/textFieldGroup";
import "../../styles/login.scss";

function Login() {
  //1. Creamos los states que guardaran lo introducido en los inputs de email y password
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");

  //2. Creamos el evento que se ejecuta al cambiar el input de email: al dispararse este evento guardara en el state "email" lo introducido en el input email
  const onChangeEmail = (e) => {
    const emailFetched = e.target.value;
    if (emailFetched) {
      SetEmail(emailFetched);
    }
    console.log(email);
  };

  //3. Creamos el evento que se ejecuta al cambiar el input de passwprd: al dispararse este evento guardara en el state "password" lo introducido en el input email
  const onChangePassword = (e) => {
    const passwordFetched = e.target.value;
    if (passwordFetched) {
      SetPassword(passwordFetched);
    }
    console.log(password);
  };

  //Redux Login Process
  //---VAMOS A LOGAR AL USUARIO ---//
  //1. Llamamos dispatch para disparar nuestra accion de consulta
  const dispatch = useDispatch();

  //2. Definimos la accion que queremos que dispatch dispare (traemos la action de registro desde redux). Esta accion se va a disparar el me item 3
  const loginUserAction = (loggedUser, history) =>
    dispatch(loginUser(loggedUser, history));

  //3. Una vez definida la accion que registra en el state de redux toda la info incluida en los inputs, la incluimos dentro de un metodo. Cuando llamamos este metodo, se disparara la accion de consulta contenida dentro.
  const loginUserMethod = (loggedUser, history) => {
    loginUserAction(loggedUser, history);
  };

  //4. Definimos el evento "OnSubmit" que va a ejecutar el metodo "loginUserMethod" y logueara al usuario.
  const onSubmit = (e) => {
    e.preventDefault();
    const loggedUser = {
      email: email,
      password: password,
    };
    console.log(loggedUser);
    loginUserMethod(loggedUser, history);
  };

  //5. Definimos el selector que consulta el state y lo llena
  const loggedSelector = useSelector((state) => state.auth.isAuthenticated);

  //6. Definimos el selector para los errors
  const errorsSelector = useSelector((state) => state.errors);
  //7. Definimos los mensajes de error para cada input
  let emailError = undefined;
  if (errorsSelector.errors) {
    emailError = errorsSelector.errors.email;
    console.log(emailError);
  }

  let passwordError = undefined;
  if (errorsSelector.errors) {
    passwordError = errorsSelector.errors.password;
    console.log(passwordError);
  }

  //////USE EFFECT VERIFICATION
  //Que sucede si estamos logados y visitamos la pgina de login? No deberia ofrecernos loguearnos, si ya estamos logueados
  //Vamos a utilizar useEffect para verificar al momento de renderizar la pagina de login si el usuario ya esta logado. De ser asi, lo redireccionamos
  let history = useHistory();

  useEffect(() => {
    if (loggedSelector === true) {
      history.push("/dashboard");
    }
  }, []);

  return (
    <div className="login-container">
      <div className="row">
        <div className="col-md-6">
          <div className="left-container">
            <div className="login">
              <h1 className="title-style">Login</h1>
              <p className="sub-title">Sign in to your DevConnector account</p>
              <form onSubmit={onSubmit} action="dashboard.html">
                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={onChangeEmail}
                  error={emailError}
                  className="input-style"
                />
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={onChangePassword}
                  error={passwordError}
                  className="input-style"
                />

                <input type="submit" className="login-button" />
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="right-container"></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
