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
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Developer Connector</h1>
                <p className="lead">
                  Create a developer profile/portfolio, share posts and get help
                  from other developers
                </p>
                <hr />

                <div className="buttonsContainer">
                  <Link className="btn_Style" to="/register">
                    <button type="button" class="btn btn-primary">
                      SignUp
                    </button>
                  </Link>

                  <Link className="btn_Style" to="/login">
                    <button type="button" class="btn btn-light">
                      Login
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
