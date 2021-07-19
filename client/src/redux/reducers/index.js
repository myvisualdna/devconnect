//Aqui se reunen todos los reducers que tenemos

//Importamos el combinador de reducers
import { combineReducers } from "redux";

//Importamos todos los reducers que tenemos
//import fetchUsers from "./userReducer";
//import fetchNotes from "./notesReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import postReducer from "./postReducer";

//Creamos el reducer raiz (el cual debera ser importado en el store)
//Va a contener todos los reducers que importamos anteriormente
const rootReducer = combineReducers({
  //fetchUsers,
  //fetchNotes,
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  post: postReducer
});

export default rootReducer;
