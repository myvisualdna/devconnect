import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/textFieldGroup";
import TextAreaFieldGroup from "../common/textAreaFieldGroup";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { addExperience } from "../../redux/actions/profileActions";

function AddExperience(props) {
  //1. Definimos los state de cada input del formulario
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [current, setCurrent] = useState(false);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState("");
  const [disabled, setDisabled] = useState(false);

  //2. Definimos el selector que consulta el state del profile y lo llena
  const profileSelector = useSelector((state) => state.profile);
  //3. Definimos el selector para los errors
  const errorsSelector = useSelector((state) => state.errors);

  /////////////////////////////////////////////
  //Seteamos los ONCHANGE para cada input
  //Seteamos el "onChange" company del formulario
  const onChangeCompany = (e) => {
    setCompany(e.target.value);
    console.log(company);
  };

  //Seteamos el "onChange" title del formulario
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
    console.log(title);
  };

  //Seteamos el "onChange" location del formulario
  const onChangeLocation = (e) => {
    setLocation(e.target.value);
    console.log(location);
  };

  //Seteamos el "onChange" From del formulario
  const onChangeFrom = (e) => {
    setFrom(e.target.value);
    console.log(from);
  };

  //Seteamos el "onChange" To del formulario
  const onChangeTo = (e) => {
    setTo(e.target.value);
    console.log(to);
  };

  //Tratamiento especial para ONCHECK
  const onChangeCheck = (e) => {
    setDisabled(!disabled);
    setCurrent(!current);
  };

  //Seteamos el "onChange" Description del formulario
  const onChangeDescription = (e) => {
    setDescription(e.target.value);
    console.log(description);
  };

  ///////////////////////////////////
  //SETEAMOS ERRORS PARA CADA INPUT
  let companyError = undefined;
  if (errorsSelector.errors) {
    companyError = errorsSelector.errors.company;
    console.log(companyError);
  }

  let titleError = undefined;
  if (errorsSelector.errors) {
    companyError = errorsSelector.errors.title;
    console.log(titleError);
  }

  let locationError = undefined;
  if (errorsSelector.errors) {
    locationError = errorsSelector.errors.location;
    console.log(locationError);
  }

  let fromError = undefined;
  if (errorsSelector.errors) {
    fromError = errorsSelector.errors.from;
    console.log(fromError);
  }

  let toError = undefined;
  if (errorsSelector.errors) {
    toError = errorsSelector.errors.to;
    console.log(toError);
  }

  let descriptionError = undefined;
  if (errorsSelector.errors) {
    descriptionError = errorsSelector.errors.description;
    console.log(descriptionError);
  }

  ///////////
  //Disparando la editar de crear perfil
  //---VAMOS A EDITAR EL PERFIL DE USUARIO ---//
  //1. Llamamos dispatch para disparar nuestra accion de consulta
  const dispatch = useDispatch();

  //2. Definimos la funcionalidad "history" que nos permitira hacer REDIRECT
  const history = useHistory();

  //3. Definimos la accion que queremos que dispatch dispare (traemos la action de crear perfil desde redux). Esta accion se va a disparar el me item 3
  const EditProfileAction = (expData, history) =>
    dispatch(addExperience(expData, history));

  //4. Una vez definida la accion que "crea el eprfil" en el state de redux, la incluimos dentro de un metodo. Cuando llamamos este metodo, se disparara la accion de consulta contenida dentro.
  const EditProfileMethod = (expData, history) => {
    EditProfileAction(expData, history);
  };

  //////////////////////////////////////////
  //Seteamos el ONSUBMIT del formulario
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    //Definimos la data que le vamos a enviar a la action de redux
    let expData = {
      company: company,
      title: title,
      location: location,
      from: from,
      to: to,
      current: current,
      description: description,
    };
    console.log(expData);
    EditProfileMethod(expData, history);
  };

  return (
    <div className="add-experience">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="edit-profile-title">Add Experience</h1>
            <p className="edit-profile-subtitle">
              Add any job or position that you have had in the past or current
            </p>
            <small className="d-block pb-3">* required fields</small>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="* Job Title"
                name="title"
                value={title}
                onChange={onChangeTitle}
                error={titleError}
              />
              <TextFieldGroup
                placeholder="* Company"
                name="company"
                value={company}
                onChange={onChangeCompany}
                error={companyError}
              />
              <TextFieldGroup
                placeholder="Location"
                name="location"
                value={location}
                onChange={onChangeLocation}
                error={locationError}
              />
              <h4 className="small-label">From Date</h4>
              <TextFieldGroup
                type="date"
                name="from"
                value={from}
                onChange={onChangeFrom}
                error={fromError}
              />
              <h4 className="small-label">To Date</h4>
              <TextFieldGroup
                type="date"
                name="to"
                value={to}
                onChange={onChangeTo}
                error={toError}
                disabled={disabled ? "disabled" : ""}
              />
              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="current"
                  value={current}
                  checked={current}
                  onChange={onChangeCheck}
                  id="current"
                />
                <label htmlFor="current" className="form-check-label">
                  Current Job
                </label>
              </div>
              <TextFieldGroup
                placeholder="Job Description"
                name="description"
                value={description}
                onChange={onChangeDescription}
                error={descriptionError}
                info="Tell us about this position."
              />
              <input
                type="submit"
                value="Submit"
                className="signup-button"
                style={{ marginTop: "24px" }}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

export default AddExperience;
