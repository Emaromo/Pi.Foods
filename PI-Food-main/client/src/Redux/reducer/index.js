
 const initialState ={
    Recipes : [],
    _RecipesCopy :[],
    TypeDiets :[],
    details : [],
    detail: [],
    
  }
  
    // RETORNA TODAS LAS RECETAS......


    export default function rootReducer (state = initialState,action ) {
        switch (action.type) {
         case 'GET_RECIPES':
           return {
                 ...state,
                 Recipes : action.payload,
                _RecipesCopy : action.payload,
           };

           case "CLEAN":
            return{
                ...state,
                details:action.payload


            }
            //filtrar por base de datos......
            case "FILTER_BYDB":
            const allrecipestwo = state._RecipesCopy
            if(action.payload==="created")state.Recipes=allrecipestwo.filter(el => typeof el.id=== "string")

            // if(action.payload==="api")state.Recipes=allrecipestwo.filter(el => typeof el.id=== "number")

            return {
                ...state,
                Recipes: state.Recipes
            }
   

         //RETORNA POR NOMBRE
         case 'GET_BY_NAME':
            return {
                ...state,
                Recipes: action.payload,          
            }
         //RETORNA POR ORDEN ACENDENTE Y DESENDENTE DE LA A A Z.......
         case 'ORDER_BY_NAME' :
           let order = action.payload === 'asc' ? 
              state.Recipes.sort(function(a,b) {
                  
                  if(a.name.toLowerCase() > b.name.toLowerCase()) {
                    
                      return 1
                  }
                  if( b.name.toLowerCase() > a.name.toLowerCase()){
                      return -1
                  }
                  return 0
              }) : 
              state.Recipes.sort(function(a,b) {
                  if(a.name.toLowerCase() > b.name.toLowerCase()) {
                      return -1
                  }
                  if( b.name.toLowerCase() > a.name.toLowerCase()){
                      return 1
                  }
                  return 0
              })
              return{
                  ...state ,
                  Recipes : order
              } 
         // retornar por punuacion minima y maxima de saludables
         case 'ORDER_BY_PUNTUATION' : 
         let orderpunt = action.payload === 'min' ? 
            state.Recipes.sort(function(a,b) {
                if(a.healthScore> b.healthScore) {
                    return 1
                }
                if( b.healthScore > a.healthScore){
                    return -1
                }
                return 0
            }) : 
            state.Recipes.sort(function(a,b) {
                if(a.healthScore > b.healthScore) {
                    return -1
                }
                if( b.healthScore > a.healthScore){
                    return 1
                }
                return 0
            })
            return{
                ...state ,
                Recipes : orderpunt
            }
            //retorna dietas
            case 'GET_TYPE_DIETS':
            // console.log('action.payload',action.payload);
            return {
                ...state,
                TypeDiets: action.payload
            }
            //filtra cada tipo de dieta
            case 'FILTER_BY_TYPEDIET':
                const allRec = state. _RecipesCopy

                const typeDietFilter = action.payload === 'All' ? allRec : allRec?.filter((t)=>t.diets.includes(action.payload ))
                return{
                        ...state ,
                        Recipes:typeDietFilter
        
                }

            //retorna por i
                
                case 'GET_BY_ID':
                    return{
                        ...state,
                        details: action.payload
                    }

                    // case "RESET_DETAIL":
                    //     return{
                    //         ...state,
                    //         detail: []
                    //     }
          
          
          
            default:{
          return state
          } 

        }
    }

    
        