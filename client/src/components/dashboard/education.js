import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteEducation } from "../../redux/actions/profileActions";
import { useHistory } from "react-router-dom";

function Education(props) {
  //1. Definimos el Profile selector
  const profileSelector = useSelector((state) => state.profile);

  //2. Definimos la accion de eliminar experiencia
  //---VAMOS A BORRAR LA EXPERIENCIA ---//
  //1. Llamamos dispatch para disparar nuestra accion de consulta
  const dispatch = useDispatch();

  //2. Definimos la accion que queremos que dispatch dispare (traemos la action de mostrar el profile desde redux). Esta accion se va a disparar el me item 3
  const deleteEducationAction = (id) => dispatch(deleteEducation(id));

  //3. Una vez definida la accion que trae el profile en el state de redux toda la info incluida en los inputs, la incluimos dentro de un metodo. Cuando llamamos este metodo, se disparara la accion de consulta contenida dentro.
  const deleteEducationMethod = (id) => {
    deleteEducationAction(id);
  };

  //4. Definimos "history" que nos permite redireccionar

  const onClickDelete = (id) => {
    deleteEducationMethod(id);
    console.log("Delete Education");
    console.log(id);
  };

  let education = "";
  //Recibimos la experiencia via props desde el archivo Dashboard
  //Si props no es un array vacio
  if (props.education !== []) {
    //Entonces loopeamos
    education = props.education.map((edu) => (
      <tr ket={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
          {edu.to === null ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={() => onClickDelete(edu._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  } else {
    education = "No education added.";
  }

  return (
    <div>
      <h4 className="mb-4">Education Credentials</h4>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th>Degree</th>
            <th>Years</th>
            <th />
          </tr>
          {education}
        </thead>
      </table>
    </div>
  );
}

export default Education;
