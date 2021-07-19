import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import { registerUser } from "../../redux/actions/authActions";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import TextFieldGroup from "../common/textFieldGroup";

function Register() {
  //1. Creamos los states para cada input
  const [nameState, SetNameState] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [passwordTwo, SetPasswordTwo] = useState("");
  const [errors, setErrors] = useState({});

  //2. Definimos los metodos onChange para cada input
  const onChangeName = (e) => {
    const nameFetched = e.target.value;
    if (nameFetched) {
      SetNameState(nameFetched);
    }
    console.log(nameState);
  };

  const onChangeEmail = (e) => {
    const emailFetched = e.target.value;
    if (emailFetched) {
      SetEmail(emailFetched);
    }
    console.log(email);
  };

  const onChangePassword = (e) => {
    const passwordFetched = e.target.value;
    if (passwordFetched) {
      SetPassword(passwordFetched);
    }
    console.log(password);
  };

  const onChangePasswordTwo = (e) => {
    const passwordTwoFetched = e.target.value;
    if (passwordTwoFetched) {
      SetPasswordTwo(passwordTwoFetched);
    }
    console.log(passwordTwo);
  };

  //Redux Register Action
  //---PRIMERO VAMOS A CONSEGUIR EL LISTADO DE USUARIOS GUARDADOS ---//
  //1. Llamamos dispatch para disparar nuestra accion de consulta
  const dispatch = useDispatch();

  //2. Definimos la accion que queremos que dispatch dispare (traemos la action de registro desde redux). Esta accion se va a disparar el me item 3
  const registerUserAction = (newUser, history) =>
    dispatch(registerUser(newUser, history));

  //3. Una vez definida la accion que registra en el state de redux toda la info incluida en los inputs, la incluimos dentro de un metodo. Cuando llamamos este metodo, se disparara la accion de consulta contenida dentro.
  const registerUserMethod = (newUser, history) => {
    registerUserAction(newUser, history);
  };

  //Definimos el submit del formulario de registro: creamos un "newUser" array que contiene cada input. A su vez dispara el metodo de registro (el cual consiste en despachar/disparar una accion de redux)
  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: nameState,
      email: email,
      password: password,
      passwordTwo: passwordTwo,
    };
    console.log(newUser);
    registerUserMethod(newUser, history);
  };

  //4. Definimos el selector que consulta el state y lo llena
  const registeredSelector = useSelector((state) => state.auth.user);

  //////////////////ERRORS MESSAGES ///////////////////////

  //5. Definimos el selector para los errors
  const errorsSelector = useSelector((state) => state.errors);

  //6. Definimos los mensajes de error para cada input
  let nameError = undefined;
  if (errorsSelector.errors) {
    nameError = errorsSelector.errors.name;
    console.log(nameError);
  }

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

  let passwordTwoError = undefined;
  if (errorsSelector.errors) {
    passwordTwoError = errorsSelector.errors.passwordTwo;
    console.log(passwordTwoError);
  }

  //////USE EFFECT VERIFICATION
  //Que sucede si estamos logados y visitamos la pgina de login? No deberia ofrecernos loguearnos, si ya estamos logueados
  //Vamos a utilizar useEffect para verificar al momento de renderizar la pagina de login si el usuario ya esta logado. De ser asi, lo redireccionamos
  //Definimos "history" para redireccionar
  let history = useHistory();

  //Definimos el selector de "isAuthenticated"
  const loggedSelector = useSelector((state) => state.auth.isAuthenticated);

  //Hacemos la verificacion de login al renderizar la pagina
  useEffect(() => {
    if (loggedSelector === true) {
      history.push("/dashboard");
    }
  }, []);

  return (
    <div>
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form onSubmit={onSubmit} action="create-profile.html">
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  value={nameState}
                  onChange={onChangeName}
                  error={nameError}
                />

                <TextFieldGroup
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={onChangeEmail}
                  error={emailError}
                />

                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={onChangePassword}
                  error={passwordError}
                />
                <TextFieldGroup
                  placeholder="Confirm Password"
                  name="passwordTwo"
                  type="password"
                  value={passwordTwo}
                  onChange={onChangePasswordTwo}
                  error={passwordTwoError}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
