import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCurrentProfile,
  deleteAccount,
} from "../../redux/actions/profileActions";
import PropTypes from "prop-types";
import Spinner from "../common/spinner";
import { Link } from "react-router-dom";
import ProfileActions from "./profileActions";
import Experience from "./experience";
import Education from "./education";

function Dashboard() {
  //Redux Get Profile Process
  //---VAMOS A OBTENER EL PERFIL DEL USUARIO ---//
  //1. Llamamos dispatch para disparar nuestra accion de consulta
  const dispatch = useDispatch();

  //2. Definimos la accion que queremos que dispatch dispare (traemos la action de mostrar el profile desde redux). Esta accion se va a disparar el me item 3
  const getProfileAction = () => dispatch(getCurrentProfile());

  //3. Una vez definida la accion que trae el profile en el state de redux toda la info incluida en los inputs, la incluimos dentro de un metodo. Cuando llamamos este metodo, se disparara la accion de consulta contenida dentro.
  const getProfileMethod = () => {
    getProfileAction();
  };

  ///////////BORRAR PROFILE ////////////////////
  //ITEM 1
  //1. Definimos la action de borrar account
  const deleteAccountAction = () => dispatch(deleteAccount());

  //2. Incluimos esa action en un method
  const deleteAccountMethod = () => {
    deleteAccountAction();
  };

  //3. Disparamos el methodo al usar el onClick
  const onDeleteClick = (e) => {
    deleteAccountMethod();
  };

  /////MOSTRAR PROFILE
  //Definimos el auth selector
  const authSelector = useSelector((state) => state.auth);
  //Definimos el Profile selector
  const profileSelector = useSelector((state) => state.profile);

  //Definimos la logica que muestra el profile (si existe)
  let dashboardcontent;
  if (profileSelector.profile === null || profileSelector.loading) {
    dashboardcontent = <Spinner />;
  } else {
    //Chequeamos que el usuario ya logado tenga un data para el profile
    if (Object.keys(profileSelector.profile).length > 0) {
      dashboardcontent = (
        <div>
          <p className="lead text-muted">
            Welcome{" "}
            <Link to={`/profile/${profileSelector.profile.handle}`}>
              {authSelector.user.name}
            </Link>
          </p>
          <ProfileActions />
          {/*
          TODO: exp and edu
          ITEM 1
          */}
          <Experience experience={profileSelector.profile.experience} />
          <Education education={profileSelector.profile.education} />
          <div style={{ marginBottom: "60px" }} />
          <button onClick={onDeleteClick} className="btn btn-danger">
            Delete My account
          </button>
        </div>
      );
    } else {
      //User esta logado pero no tiene profile
      dashboardcontent = (
        <div>
          <p className="lead text-muted">Welcome {authSelector.user.name}</p>
          <p>
            You have note yet setup a profile, please add some info about
            youtself.
          </p>
          <Link to="/create-profile" className="btn btn-lg btn-info">
            Create Profile
          </Link>
        </div>
      );
    }
  }

  //////////////RENDERIZADO POR PRIMERA VEZ////////////////////

  //Al iniciar verificamos si el user esta autenticado, si lo esta traemos el
  useEffect(() => {
    if (authSelector.isAuthenticated === true) {
      getProfileMethod();
    }
  }, []);

  return (
    <div className="dashboard">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="fs-1">Dashboard</h1>
            {dashboardcontent}
          </div>
        </div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

export default Dashboard;
