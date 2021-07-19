import isEmpty from "../../validation/is-empty";

import { SET_CURRENT_USER } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
};

//Creamos el reducer, recibe el state inicial y una action
const authReducer = (state = initialState, action) => {
  //si esa accion coincide con el nombre "FETCH_WEATHER"
  //El objeto vacio llamado weatherInformation que integra el
  //state se va a llenar con la info que trae el payload de la action
  if (action.type === SET_CURRENT_USER) {
    state = {
      ...state,
      isAuthenticated: !isEmpty(action.payload),
      user: action.payload,
    };
    //Al final devolvemos el state ya actualizado
    console.log(state);
  }
  return state;
};

export default authReducer;
