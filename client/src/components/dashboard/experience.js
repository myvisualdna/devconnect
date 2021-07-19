import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteExperience } from "../../redux/actions/profileActions";
import { useHistory } from "react-router-dom";

function Experience(props) {
  //1. Definimos el Profile selector
  const profileSelector = useSelector((state) => state.profile);

  //2. Definimos la accion de eliminar experiencia
  //---VAMOS A BORRAR LA EXPERIENCIA ---//
  //1. Llamamos dispatch para disparar nuestra accion de consulta
  const dispatch = useDispatch();

  //2. Definimos la accion que queremos que dispatch dispare (traemos la action de mostrar el profile desde redux). Esta accion se va a disparar el me item 3
  const deleteExperienceAction = (id) => dispatch(deleteExperience(id));

  //3. Una vez definida la accion que trae el profile en el state de redux toda la info incluida en los inputs, la incluimos dentro de un metodo. Cuando llamamos este metodo, se disparara la accion de consulta contenida dentro.
  const deleteExperienceMethod = (id) => {
    deleteExperienceAction(id);
  };

  //4. Definimos "history" que nos permite redireccionar

  const onClickDelete = (id) => {
    deleteExperienceMethod(id);
    console.log("Delete Experience");
    console.log(id);
  };

  let experience = "";
  //Recibimos la experiencia via props desde el archivo Dashboard
  //Si props no es un array vacio
  if (props.experience !== []) {
    //Entonces loopeamos
    experience = props.experience.map((exp) => (
      <tr ket={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
          {exp.to === null ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={() => onClickDelete(exp._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  } else {
    experience = "No experience added.";
  }

  return (
    <div>
      <h4 className="mb-4">Experience Credentials</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Years</th>
            <th />
          </tr>
          {experience}
        </thead>
      </table>
    </div>
  );
}

export default Experience;
