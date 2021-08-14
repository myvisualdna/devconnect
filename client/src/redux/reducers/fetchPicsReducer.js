//Definimos el state inicial: a qui sera un objeto llamado
//"weatherInformation" que esta vacio. El reducer se asegurara
//de chequear la accion que recibe, si coincide con el type que
//espera, va a modificar el state con la info que contenga el
//payload de la action
const initialState = {
  unplashPic: {},
};

//Creamos el reducer, recibe el state inicial y una action
const fetchUnplash = (state = initialState, action) => {
  //si esa accion coincide con el nombre "FETCH_WEATHER"
  //El objeto vacio llamado weatherInformation que integra el
  //state se va a llenar con la info que trae el payload de la action
  if (action.type === "FETCH_UNPLASH") {
    state = { ...state, unplashPic: action.payload };
    //Al final devolvemos el state ya actualizado
  }
  return state;
};

export default fetchUnplash;
