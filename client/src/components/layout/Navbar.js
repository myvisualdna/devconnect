import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/actions/authActions";
import { clearCurrentProfile } from "../../redux/actions/profileActions";
import "../../styles/mainStyle.scss";
import "../../styles/navbar.scss";

function Navbar() {
  //Redux LOGOUT Action
  //---VAMOS A DESLOGAR AL USUARIO DESDE LA NAVBAR ---//
  //1. Llamamos dispatch para disparar nuestra accion de deslogado
  const dispatch = useDispatch();

  //2. Definimos la accion que queremos que dispatch dispare (traemos la action de deslogueo desde redux). Esta accion se va a disparar el me item 3
  const logOutUserAction = () => dispatch(logoutUser());

  //3. Una vez definida la accion que desloguea al usuario en el state de redux incluimos esta accion dentro de un metodo. Cuando llamamos/ejecutemos este metodo, se disparara la accion de redux contenida dentro.
  const logoutUserMethod = () => {
    logOutUserAction();
  };

  //ACCION QUE LIMPIA EL PROFILE AL DESLOGUEAR

  //2. Definimos la accion que queremos que dispatch dispare (traemos la action de deslogueo desde redux). Esta accion se va a disparar el me item 3
  const clearProfileAction = () => dispatch(clearCurrentProfile());

  //3. Una vez definida la accion que desloguea al usuario en el state de redux incluimos esta accion dentro de un metodo. Cuando llamamos/ejecutemos este metodo, se disparara la accion de redux contenida dentro.
  const clearProfileMethod = () => {
    clearProfileAction();
  };

  ///////////////////////////

  //4. Una vez definido el metodo de deslogueo, vamos a definir el evento OnClick en el cual deberia dispararse "logoutUserMethod" para deslogar al usuario
  const onLogoutClick = (e) => {
    e.preventDefault();
    logoutUserMethod();
    clearProfileMethod();
  };

  //Por ultimo definimos el conditional que evaluara si "isAuthenticated" is true en el state de redux y asi mostrar la navbar de usuario logado o de usuario invitado

  //Para eso necesitamos el selector
  const loginSelector = useSelector((state) => state.auth);

  //Definimos Navbars para usuario logado
  const authLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="navbar-item" to="/feed">
          Post Feed
        </Link>
      </li>
      <li>
        <Link className="navbar-item" to="/register">
          Sign Up
        </Link>
      </li>
      <li className="nav-item">
        <a href="" onClick={onLogoutClick} className="navbar-item">
          <img
            className="rounded-circle"
            src={loginSelector.user.avatar}
            alt={loginSelector.user.name}
            style={{ width: "25px", marginRight: "5px" }}
            title="You must have a gravatar connected to your email to display an image"
          />
          Logout
        </a>
      </li>
    </ul>
  );

  //NavBar para usuario invitado
  const guestLinks = (
    <ul className="navbar-nav ml-auto">
      <li>
        <Link className="navbar-item" to="/dashboard">
          Dashboard
        </Link>
      </li>
      <li className="nav-item">
        <Link className="navbar-item" to="/register">
          Sign Up
        </Link>
      </li>
      <li className="nav-item">
        <Link className="navbar-item" to="/login">
          Login
        </Link>
      </li>
    </ul>
  );

  //Usamos el selector anterior para definir el conditional que decidira que navbar mostrar
  let navbarToShow = guestLinks;
  if (loginSelector.isAuthenticated === true) {
    navbarToShow = authLinks;
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="nav-logo" to="/">
              Dev-Social
            </Link>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="navbar-item" to="/profiles">
                  Developers
                </Link>
              </li>
            </ul>
            <form className="d-flex">{navbarToShow}</form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
