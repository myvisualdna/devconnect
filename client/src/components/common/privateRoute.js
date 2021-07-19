import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

//Setup de Ruta privada en el Frontend (la ruta privada del frontend indica que pantallas puede visualizar el usuario, las rutas privadas del backend indica a que rutas se pueden hacer peticiones)


//Este componente habilita una ruta privada, solo accesible para user logado
//Esta ruta da acceso al dashboard, si el user no esta logado redirige a la pagina de login


function PrivateRoute({ component: Component, auth, ...rest }) {
  //Definimos el auth selector
  const authSelector = useSelector((state) => state.auth);
  console.log(authSelector);

  return (
    <Route
      {...rest}
      render={(props) =>
        authSelector.isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default PrivateRoute;
