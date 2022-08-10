//Un store es un objeto que mantiene el árbol de estado de la aplicación. 
//Solo debe haber un único store en una aplicación de Redux, ya que la composición ocurre en los reducers.
//applyMiddleware Recibirían el dispatch como argumento y podrían llamarlo de forma asíncrona. Estas funciones se denominan thunks . 
//Otro ejemplo de middleware es redux-promise . Le permite enviar una acción asíncrona de Promise y envía una acción normal cuando se resuelve Promise.
//El módulo redux-devtools-extension nos ayudará a filtrar todo lo que pase por el store 
//y así poder verlo desde la consola de desarrolladores de Redux que te recomiendo instalar
 import {createStore,applyMiddleware,} from "redux";
 import { composeWithDevTools } from "redux-devtools-extension";
 import thunk from "redux-thunk";//siver para llammada asincrona 
 import rootReducer from "../reducer/index.js";



 export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk))); // para que se puedan unar los devtools