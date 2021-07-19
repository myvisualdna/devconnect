import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ProfileHeader from "./profileHeader";
import ProfileAbout from "./profileAbout";
import ProfileCreds from "./profileCreds";
import ProfileGithub from "./profileGithub";
import Spinner from "../common/spinner";
import { getProfileByHandle } from "../../redux/actions/profileActions";

function Profile(props) {
  //ANTES QUE NADA:
  //Definimos el Profile selector
  const profileSelector = useSelector((state) => state.profile);
  //Definimos el Errors selector
  const errorsSelector = useSelector((state) => state.errors);

  //Guardamos en esta constante, el nombre del perfil que aparece en la url
  //Nos servira para disparar la accion de redux que buscar perfiles por nombre
  let profileHandle = props.match.params.handle;

  //GET PROFILE ACTION
  //---VAMOS TRAER EL PERFIL DE UN USUARIO ESPECIFICO ---//
  //1. Llamamos dispatch para disparar nuestra accion de consulta
  const dispatch = useDispatch();

  //2. Definimos la accion que queremos que dispatch dispare (traemos la action de registro desde redux). Esta accion se va a disparar el me item 3
  const getProfileByHandleAction = (profileHandle) =>
    dispatch(getProfileByHandle(profileHandle));

  //3. Una vez definida la accion que registra en el state de redux toda la info incluida en los inputs, la incluimos dentro de un metodo. Cuando llamamos este metodo, se disparara la accion de consulta contenida dentro.
  const getProfileByHandleMethod = (profileHandle) => {
    getProfileByHandleAction(profileHandle);
  };

  //Cargamos el perfil del usuario especifico, al renderizar el componente
  useEffect(() => {
    console.log(props.match.params.handle);
    getProfileByHandleMethod(profileHandle);
  }, []);

  console.log(profileSelector);
  let profileContent;

  if (profileSelector.profile === null || profileSelector.loading) {
    profileContent = <Spinner />;
  } else {
    profileContent = (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/profiles" className="btn btn-light mb-3 float-left">
              Back to profiles
            </Link>
          </div>
        </div>
        <ProfileHeader profile={profileSelector.profile} />
        <ProfileAbout profile={profileSelector.profile} />
        <ProfileCreds profile={profileSelector.profile} />
      </div>
    );
  }

  return (
    <div className="profile">
      <div className="container">
        <div className="row">
          <div className="col-md-12">{profileContent}</div>
        </div>
      </div>
    </div>
  );
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

export default Profile;
