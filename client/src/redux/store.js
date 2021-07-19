//Importamos los metodos creadores de store y middleware
import {createStore, applyMiddleware} from 'redux';
import { configureStore } from "@reduxjs/toolkit";

//Importamos thunk para hacer el llamado API (es un middleware)
import thunk from "redux-thunk";

//Importamos el reducer raiz
import RootReducer from './reducers';

//Creamos un middleware que utilizara la libreria thunk
const middleware = applyMiddleware(thunk);

//Creamos el store mezclando el reducer raiz y el middleware
//con el thunk precargado
const store = configureStore({
    reducer: RootReducer,
});

export default store;