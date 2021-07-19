import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/textFieldGroup";
import TextAreaFieldGroup from "../common/textAreaFieldGroup";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { addEducation } from "../../redux/actions/profileActions";

function AddEducation(props) {
  //1. Definimos los state de cada input del formulario
  const [school, setSchool] = useState("");
  const [degree, setDegree] = useState("");
  const [fieldofstudy, setFieldofstudy] = useState("");
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

  //Seteamos el "onChange" title del formulario
  const onChangeDegree = (e) => {
    setDegree(e.target.value);
    console.log(degree);
  };

  const onChangeSchool = (e) => {
    setSchool(e.target.value);
    console.log(school);
  };

  //Seteamos el "onChange" location del formulario
  const onChangeFieldofstudy = (e) => {
    setFieldofstudy(e.target.value);
    console.log(fieldofstudy);
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
  let schoolError = undefined;
  if (errorsSelector.errors) {
    schoolError = errorsSelector.errors.school;
    console.log(schoolError);
  }

  let degreeError = undefined;
  if (errorsSelector.errors) {
    degreeError = errorsSelector.errors.degree;
    console.log(degreeError);
  }

  let fieldofstudyError = undefined;
  if (errorsSelector.errors) {
    fieldofstudyError = errorsSelector.errors.fieldofstudy;
    console.log(fieldofstudyError);
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
  const EditProfileAction = (eduData, history) =>
    dispatch(addEducation(eduData, history));

  //4. Una vez definida la accion que "crea el eprfil" en el state de redux, la incluimos dentro de un metodo. Cuando llamamos este metodo, se disparara la accion de consulta contenida dentro.
  const EditProfileMethod = (eduData, history) => {
    EditProfileAction(eduData, history);
  };

  //////////////////////////////////////////
  //Seteamos el ONSUBMIT del formulario
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    //Definimos la data que le vamos a enviar a la action de redux
    let eduData = {
      school: school,
      degree: degree,
      fieldofstudy: fieldofstudy,
      from: from,
      to: to,
      current: current,
      description: description,
    };
    console.log(eduData);
    EditProfileMethod(eduData, history);
  };

  return (
    <div className="add-experience">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Add Education</h1>
            <p className="lead text-center">
              Add any school, bootcamp, etc that you have attended
            </p>
            <small className="d-block pb-3">* required fields</small>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="* Degree or Certification"
                name="degree"
                value={degree}
                onChange={onChangeDegree}
                error={degreeError}
              />
              <TextFieldGroup
                placeholder="* School"
                name="school"
                value={school}
                onChange={onChangeSchool}
                error={schoolError}
              />
              <TextFieldGroup
                placeholder="* Field of Study"
                name="fieldofstudy"
                value={fieldofstudy}
                onChange={onChangeFieldofstudy}
                error={fieldofstudyError}
              />
              <h6>From Date</h6>
              <TextFieldGroup
                type="date"
                name="from"
                value={from}
                onChange={onChangeFrom}
                error={fromError}
              />
              <h6>To Date</h6>
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
                  Current Education
                </label>
              </div>
              <TextFieldGroup
                placeholder="Program Description"
                name="description"
                value={description}
                onChange={onChangeDescription}
                error={descriptionError}
                info="Tell us about the program you were in."
              />
              <input
                type="submit"
                value="submit"
                className="btn btn-info btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

AddEducation.propTypes = {
  addEducaton: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

export default AddEducation;
