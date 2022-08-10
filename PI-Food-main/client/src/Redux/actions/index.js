import axios from "axios";

// /*~~~~~~~~~~~~~~GETS~~~~~~~~~~~~~~*/
// //conecciones front y back//

  //funcion para traer todas las recetas del back.........
   export function GetRecipe() {
    return async function(dispatch){
    let json = await axios.get(`http://localhost:3001/recipes`)
     dispatch({ 
           type: 'GET_RECIPES',    
           payload: json.data
     })
    };
   }

   export function cleandetail(){
    return{
      type:"CLEAN",
      payload :[]
    }
   }
  // funcion para traer por nombre en la searchbar.............
  export function GetRecipesByName(name){
    return async function(dispatch){
     let json = await axios.get(`http://localhost:3001/recipes?name=${name}`);
     return dispatch({
        type : "GET_BY_NAME",
        payload: json.data    
     })
    } 
  }
  // funcion para ordenar por nombre............
  export function orderByName (payload) {
    return {
        type : "ORDER_BY_NAME",
        payload
    }
  }
  // funcion para ordenar por puntuacion........
  export function orderByPuntuation (payload){
    return {
        type : "ORDER_BY_PUNTUATION",
        payload
    }
  }
  // funcion que que filtre por dieta.....
  export function filterRecipesByTypeDiet (payload){
    return {
        type : "FILTER_BY_TYPEDIET",
        payload
    }
}
  
//**********CREACION DE RECETAS*************/
 //funcion que trae los tipos de dietas.......///asyc con axios
  export function getTypeDiets (){
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/diets`);
         console.log(json.data)
         dispatch( {
             type : "GET_TYPE_DIETS",
            payload: json.data
         })

   }

//   export function getTypeDiets(){                // fetch con promesas
//     return function(dispatch){
//         return fetch("http://localhost:3001/diets")
//         .then((r)=>r.json())
//         .then(json => dispatch({
//             type: "GET_TYPE_DIETS",
//             payload: json
//         }))
//     }
// }
}
//resetea el detail
export function resetDetail(){
  return{
      type: "RESET_DETAIL"
  }
}

export function filterDb(payload){
  return{
    type:"FILTER_BYDB",
    payload
  }
}

 
//funcion para la creacion de recetas que tare las recetas....
export function postRecipes (payload){
  return async function(dispatch){
      var json = await axios.post(`http://localhost:3001/recipes`,payload);
      return json
  }

}

// funcion para traer  recetas por id
export function getRecipesById (id){
  return async function(dispatch){
      var json = await axios.get(`http://localhost:3001/recipes/${id}`);
  return dispatch( {
      type : "GET_BY_ID",
      payload: json.data
  })
}
}



