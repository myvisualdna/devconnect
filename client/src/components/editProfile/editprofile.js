import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/textFieldGroup";
import TextAreaFieldGroup from "../common/textAreaFieldGroup";
import InputGroup from "../common/inputGroup";
import SelectListGroup from "../common/selectListGroup";
import {
  createTheProfile,
  getCurrentProfile,
} from "../../redux/actions/profileActions";
import isEmpty from "../../validation/is-empty";
import { useHistory } from "react-router-dom";
import "../../styles/editStyle.scss";

///ESTE ARCHIVO USA CASI LA MISMA ESTRUCTURA Y COMPONENTES QUE EL ARCHIVO "createProfile"

function EditProfile(props) {
  //Aqui vamos a crear los states que necesita cada input de la form

  const [displaySocialInputs, setDisplaySocialInputs] = useState(false);
  const [handle, setHandle] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [skills, setSkills] = useState("");
  const [githubUsername, setGithubUsername] = useState("");
  const [bio, setBio] = useState("");
  const [twitter, setTwitter] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [youtube, setYoutube] = useState("");
  const [instagram, setInstagram] = useState("");
  const [errors, setErrors] = useState({});

  //PRIMERO: SELECTORS NECESARIOS
  //Definimos el Profile selector
  const profileSelector = useSelector((state) => state.profile);
  //Definimos el Errors selector
  const errorsSelector = useSelector((state) => state.errors);

  /////////////////////////////////////////////////////////////////
  //SEGUNDO: DISPARO DE ACTIONS//////////////////////////////////
  //Disparando la accion de editar perfil
  //1. Llamamos dispatch para disparar nuestra accion de consulta
  const dispatch = useDispatch();

  //2. Definimos la funcionalidad "history" que nos permitira hacer REDIRECT
  const history = useHistory();

  //3. Definimos la accion que queremos que dispatch dispare (traemos la action de crear perfil desde redux). Esta accion se va a disparar el me item 3
  const CreateProfileAction = (props, history) =>
    dispatch(createTheProfile(props, history));

  //4. Una vez definida la accion que "crea/escribe el Perfil" en el state de redux, la incluimos dentro de un metodo. Cuando llamamos este metodo, se disparara la accion de consulta contenida dentro.
  const CreateProfileMethod = (profileData, history) => {
    CreateProfileAction(profileData, history);
  };

  //5. Creamos un metodo para la accion que verifica si existe un perfil creado para este usuario. Si existe, lo trae. Quedando listo para editarlo.
  const getCurrentProfileAction = () => dispatch(getCurrentProfile());
  const getCurrentProfileMethod = () => getCurrentProfileAction();

  /////////////////////////////////////////////////////////////////////
  //TERCERO: PROCESO DE EDICION/////////////////////////

  ///6. Asi funciona la "EDICION": Apenas renderiza el componente, disparamos el metodo que trae el profile existen del usuario (si existe). Una vez que trajo esa info existente, la guarda en el state de redux (dentro del apartado "profile"), al cual podemos acceder mediante "profileSelector".
  useEffect(() => {
    getCurrentProfileMethod();
    //*****TRATAMIENTL ESPECIAL PARA SKILLS */
    //**Skills es un array entonces no solo lo traemos del perfil guardado sino que tambien lo pintamos en pantalla para que el usuario pueda editarlo si quiere */
    const savedSkills = profileSelector.profile.skills;
    setSkills(savedSkills);
  }, []);

  /////7. Ya trajimos el profile existente y lo guardamos dentro del state de redux (lo consultamos con "profileSelector"). Aqui sucederan tres acciones:
  //A) Leemos que hay en cada input del profile existente (ahora ya guardado en el state de redux)
  //B) Si hacemos un cambio en un input, ese cambio se sube al state de redux al hacer submit
  //C) En los inputs que no hubo cambio, se mantiene el valor traido/levantado por "profileSelector"
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    const profileData = {
      //Conclusion: cuando modificamos un input, se sube ese valor nuevo al state de redux. Cuando no hay cambio, mantenemos el valor que trajimos de "profileSelector"
      handle: isEmpty(handle) ? profileSelector.profile.handle : handle,
      company: isEmpty(company) ? profileSelector.profile.company : company,
      website: isEmpty(website) ? profileSelector.profile.website : website,
      location: isEmpty(location) ? profileSelector.profile.location : location,
      status: isEmpty(status) ? profileSelector.profile.status : status,
      //**  Tratamiento especial para SKILLS  **//
      skills: skills === "" ? profileSelector.profile.skills : `${skills}`,
      githubUsername: isEmpty(githubUsername)
        ? profileSelector.profile.githubUsername
        : githubUsername,
      bio: isEmpty(bio) ? profileSelector.profile.bio : bio,
      twitter: isEmpty(twitter) ? profileSelector.profile.twitter : twitter,
      facebook: isEmpty(facebook) ? profileSelector.profile.facebook : facebook,
      linkedin: isEmpty(linkedin) ? profileSelector.profile.linkedin : linkedin,
      youtube: isEmpty(youtube) ? profileSelector.profile.youtube : youtube,
      instagram: isEmpty(instagram)
        ? profileSelector.profile.instagram
        : instagram,
    };
    //Al hacer "submit" Disparamos el metodo de creacion de perfil pasandole la profileData anterior
    console.log(profileData.handle);
    console.log(profileData.status);
    console.log(profileData.skills);
    CreateProfileMethod(profileData, history);
  };

  /////SETEAMOS ONCHANGE PARA CADA INPUT
  //Seteamos el "onChange" Name del formulario
  const onChangeName = (e) => {
    setHandle(e.target.value);
    console.log(handle);
  };

  //Seteamos el "onChange" Status del formulario
  const onChangeStatus = (e) => {
    setStatus(e.target.value);
    console.log(status);
  };

  //Seteamos el "onChange" company del formulario
  const onChangeCompany = (e) => {
    setCompany(e.target.value);
    console.log(company);
  };

  //Seteamos el "onChange" website del formulario
  const onChangeWebsite = (e) => {
    setWebsite(e.target.value);
    console.log(website);
  };

  //Seteamos el "onChange" location del formulario
  const onChangeLocation = (e) => {
    setLocation(e.target.value);
    console.log(location);
  };

  //Seteamos el "onChange" skills del formulario
  const onChangeSkills = (e) => {
    setSkills(e.target.value);
    console.log(skills);
  };

  //Seteamos el "onChange" github del formulario
  const onChangeGithub = (e) => {
    setGithubUsername(e.target.value);
    console.log(githubUsername);
  };

  //Seteamos el "onChange" bio del formulario
  const onChangeBio = (e) => {
    setBio(e.target.value);
    console.log(bio);
  };

  //Seteamos el "onChange" Twitter del formulario
  const onChangeTwitter = (e) => {
    setTwitter(e.target.value);
    console.log(twitter);
  };

  //Seteamos el "onChange" Facebook del formulario
  const onChangeFacebook = (e) => {
    setFacebook(e.target.value);
    console.log(facebook);
  };

  //Seteamos el "onChange" linkedin del formulario
  const onChangeLinkedin = (e) => {
    setLinkedin(e.target.value);
    console.log(linkedin);
  };

  //Seteamos el "onChange" youtube del formulario
  const onChangeYoutube = (e) => {
    setYoutube(e.target.value);
    console.log(youtube);
  };

  //Seteamos el "onChange" instagram del formulario
  const onChangeInstagram = (e) => {
    setInstagram(e.target.value);
    console.log(instagram);
  };

  //////////////////////////////////////////
  ////ERROR MESSAGES
  let handleError = undefined;
  if (errorsSelector.errors) {
    handleError = errorsSelector.errors.handle;
    console.log(handleError);
  }

  let skillsError = undefined;
  if (errorsSelector.errors) {
    skillsError = errorsSelector.errors.skills;
    console.log(skillsError);
  }

  let statusError = undefined;
  if (errorsSelector.errors) {
    statusError = errorsSelector.errors.status;
    console.log(statusError);
  }

  let companyError = undefined;
  if (errorsSelector.errors) {
    companyError = errorsSelector.errors.company;
    console.log(companyError);
  }

  let websiteError = undefined;
  if (errorsSelector.errors) {
    websiteError = errorsSelector.errors.website;
    console.log(websiteError);
  }

  let locationError = undefined;
  if (errorsSelector.errors) {
    locationError = errorsSelector.errors.location;
    console.log(locationError);
  }

  let bioError = undefined;
  if (errorsSelector.errors) {
    bioError = errorsSelector.errors.bio;
    console.log(bioError);
  }

  let githubUsernameError = undefined;
  if (errorsSelector.errors) {
    githubUsernameError = errorsSelector.errors.githubUsername;
    console.log(githubUsernameError);
  }

  //Seteamos el componente para "socialInputs", que se muestra cuando clickeamos el boton para mostrar
  //Primero creamos la funcion toggle para el boton "add social"
  const toggleSocial = () => setDisplaySocialInputs(!displaySocialInputs);

  //Aqui seteamos el contenido que debe mostrarse (los inputs para cada social media)
  let socialInputs;
  if (displaySocialInputs === true) {
    socialInputs = (
      <div>
        <InputGroup
          placeholder="Twitter Profile URL"
          name="twitter"
          icon="fab fa-twitter"
          value={twitter}
          onChange={onChangeTwitter}
          error={errors.twitter}
        />
        <InputGroup
          placeholder="Facebook Profile URL"
          name="facebook"
          icon="fab fa-facebook"
          value={facebook}
          onChange={onChangeFacebook}
          error={errors.facebook}
        />
        <InputGroup
          placeholder="Linkedin Profile URL"
          name="linkedin"
          icon="fab fa-linkedin"
          value={linkedin}
          onChange={onChangeLinkedin}
          error={errors.linkedin}
        />
        <InputGroup
          placeholder="Youtube Profile URL"
          name="youtuber"
          icon="fab fa-youtube"
          value={youtube}
          onChange={onChangeYoutube}
          error={errors.youtube}
        />
        <InputGroup
          placeholder="Instagram Profile URL"
          name="instagram"
          icon="fab fa-instagram"
          value={instagram}
          onChange={onChangeInstagram}
          error={errors.instagram}
        />
      </div>
    );
  }

  //Seleccionar options para el status
  const options = [
    { label: "Select Professional Status", value: 0 },
    { label: "Developer", value: "Developer" },
    { label: "Junior Developer", value: "Junior Developer" },
    { label: "Senior Developer", value: "Senior Developer" },
    { label: "Manager", value: "Manager" },
    { label: "Student", value: "Student" },
    { label: "Other", value: "Other" },
  ];

  return (
    <div className="create-profile" style={{ marginTop: "24px" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="edit-profile-title">Edit Profile</h1>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="*Profile handle"
                name="handle"
                value={handle}
                onChange={onChangeName}
                error={handleError}
                info="A unique handle for your profile URL. Your full name, your company name, your nickname."
              />
              <SelectListGroup
                placeholder="Status"
                name="status"
                value={status}
                options={options}
                onChange={onChangeStatus}
                error={statusError}
                info="Give us an idea of where you are at in your career."
              />
              <TextFieldGroup
                placeholder="Company"
                name="company"
                value={company}
                onChange={onChangeCompany}
                error={companyError}
                info="Could be your own company or one you work for."
              />
              <TextFieldGroup
                placeholder="Website"
                name="website"
                value={website}
                onChange={onChangeWebsite}
                error={websiteError}
                info="Could be your own website or a company one."
              />
              <TextFieldGroup
                placeholder="Location"
                name="location"
                value={location}
                onChange={onChangeLocation}
                error={locationError}
                info="City or state suggested (i.e. Boston, MA)"
              />
              <TextFieldGroup
                placeholder="Skills"
                name="skills"
                value={skills}
                onChange={onChangeSkills}
                error={skillsError}
                info="Please use a comma separated values (i.e. HTML, CSS, Javascript, PHP, etc)."
              />
              <TextFieldGroup
                placeholder="Github"
                name="github"
                value={githubUsername}
                onChange={onChangeGithub}
                error={githubUsernameError}
                info="Provide your Github repo"
              />
              <TextFieldGroup
                placeholder="Share a short Bio"
                name="bio"
                value={bio}
                onChange={onChangeBio}
                error={bioError}
                info="Tell us a little about yourself"
              />

              <div className="mb-3">
                <button
                  type="button"
                  className="log-button"
                  onClick={toggleSocial}
                  style={{ marginRight: "24px" }}
                >
                  Add Social
                </button>
                <span className="text-muted">Optional</span>
              </div>
              {socialInputs}
              <input type="submit" value="Submit" className="signup-button" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

export default EditProfile;
