import { GET_ERRORS } from "../actions/types";

const initialState = {};

//Creamos el reducer, recibe el state inicial y una action
const errorReducer = (state = initialState, action) => {
  //si esa accion coincide con el nombre "FETCH_WEATHER"
  //El objeto vacio llamado weatherInformation que integra el
  //state se va a llenar con la info que trae el payload de la action
  if (action.type === GET_ERRORS) {
    state = { ...state, errors: action.payload };
    //Al final devolvemos el state ya actualizado
    console.log(state);
  }
  return state;
};

export default errorReducer;
