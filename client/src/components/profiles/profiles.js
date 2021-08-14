import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/spinner";
import { getProfiles } from "../../redux/actions/profileActions";
import ProfileItem from "./profileItem";
import grabUnplash from "../../redux/actions/fetchPics";
import "../../styles/profiles.scss";

function Profiles() {
  //PRIMERO: SELECTORS NECESARIOS
  //1. Definimos el Profile selector
  const profileSelector = useSelector((state) => state.profile);
  const picsSelector = useSelector((state) => state.pics.unplashPic.results);

  //2. Definimos la accion que levanta todos los profiles
  //---TRAEMOS TODOS LOS PROFILES---//
  const dispatch = useDispatch();

  //2. Definimos la accion que queremos que dispatch dispare (traemos la action de registro desde redux). Esta accion se va a disparar el me item 3
  const getProfilesAction = () => dispatch(getProfiles());
  const getProfilesPics = () => dispatch(grabUnplash());

  //3. Una vez definida la accion que registra en el state de redux toda la info incluida en los inputs, la incluimos dentro de un metodo. Cuando llamamos este metodo, se disparara la accion de consulta contenida dentro.
  const getProfilesMethod = () => {
    getProfilesAction();
  };

  //4. Disparamos la accion de consulta del punto 3 cada vez que renderiza el componente
  useEffect(() => {
    getProfilesMethod();
    getProfilesPics();
  }, []);

  //Aca definimos el componente que levanta y muestra todos los profiles
  let profileItems = "";
  //Mientras profiles este "null" se muestre el spinner de carga
  if (profileSelector.profiles === null || profileSelector.loading) {
    profileItems = <Spinner />;
  } else {
    //Si Profiles no esta vacia se loopea y se muestra todos los profiles que hay
    if (profileSelector.profiles.length > 0) {
      profileItems = profileSelector.profiles.map((profile) => (
        <ProfileItem
          key={profile._id}
          profile={profile}
          picture={picsSelector}
        />
      ));
    } else {
      //En caso que Profiles sea 0 o este vacio, se muestra lo siguiente
      profileItems = <h4>No Profiles found</h4>;
    }
  }

  return (
    <div className="profiles">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="profile-list-title">
              <h1>Developer Profiles</h1>
              <p>Browse and connect with developers</p>
            </div>
            <div className="profile-item-module">{profileItems}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

export default Profiles;
