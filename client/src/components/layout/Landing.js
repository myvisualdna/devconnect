import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../styles/mainStyle.scss";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Landing() {
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
      <div className="landing">
        <div className="dark-overlay">
          <div className="main-container">
            <div className="column-container">
              <div className="title-style">
                <h1>Dev-Social</h1>
              </div>
              <div className="subtitle-style">
                <h4>
                  {" "}
                  Create your developer profile. Share posts and get in contact
                  with other developers.
                </h4>
              </div>
            </div>
            <div className='buttons-container'>
              <Link className="btn_Style" to="/register">
                <button type="button" className="signup-button">
                  Register
                </button>
              </Link>

              <Link className="btn_Style" to="/login">
                <button type="button" className="log-button">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
