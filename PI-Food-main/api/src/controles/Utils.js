const axios = require("axios");
const { Diet , Recipe } = require("../db");
const {API_KEY,API_KEY2,API_KEY3,API_KEY4,API_KEY5,API_KEY6,API_KEY7} = process.env;

//CREACION DE TODAS LAS FUNCIONES PARA APLICAR EN SUS RECPECTIVOS CONTROLES DE DIETS  Y RECIPE

 const GetInfoApiRecipe = async() =>{
  
  let urlApifullrecipe = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY7}&addRecipeInformation=true&number=100`)).data.results
  
  const infoApifullrecipe =  urlApifullrecipe.map((info)=>{
      return{

          id: info.id,
          name: info.title,
          healthScore: info.healthScore, // que tan saludable es la receta 
          image: info.image,
          diets: info.diets, // retorna un array con los tipos de dietas
          score: info.spoonacularScore,  // puntuacion de la receta 
          dishTypes: info.dishTypes, // el tipo de la receta 
          summary: info.summary, // resumen de la receta 
          steps: info.analyzedInstructions[0] ? info.analyzedInstructions[0].steps.map(el => el.step) : ['No se encontro un 🦶 a 🦶 (┬┬﹏┬┬)']
          
      }
  });

  return infoApifullrecipe;
}

 //funcion para obtener informacion de recipe en DB  ......  

 const  GetInfoDbRecipe = async () =>{
    let GetInfoDiet = await Recipe.findAll({
        include:{
            model: Diet,
            attributes: ["name"],
            through: {attributes: []}
        }
    })
    return GetInfoDiet.map(recipe =>{
      let type = recipe.diets.map(d =>d.name)
      return {id:recipe.id,
              name:recipe.name,
              healthScore:recipe.healthScore, 
              image: recipe.image||"https://images2.alphacoders.com/105/thumb-1920-1051199.png",
              diets: type,
              score: recipe.spoonacularScore,  
              dishTypes:recipe.dishTypes, 
              sumary: recipe.sumary, 

      }
    })
 };


 // funcion de Concatenancion de Recetas de la api y de las Recetas creadas en db ......
 const GetAllInfoRecipes = async () =>{
    const infoApi = await GetInfoApiRecipe();
    const infoDb = await GetInfoDbRecipe();
    const fullInfo = infoApi.concat(infoDb)

    return fullInfo
 }

 //Funcion para buscar en DB y API una receta mediante su id........ 
   
  const GeIdRecipesId = async (id) =>{
    //>>>>>>En Db<<<<<<
    try {
         const RecipesIdDb= await Recipe.findByPk(id, {
            include: {
                     
                       model: Diet,
                       attributes: ['name'],
                       through: {attributes: [],}
                     }
         });
          return [RecipesIdDb];
    } catch(error) {
        console.log('🗑 ಠ_ಠ',error)
        }
        id = parseInt(id)
      
      //>>>>>>En Api<<<<<<
      try {
        
     const info = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?&apiKey=${API_KEY7}`)
    
          recipeapi = { 
            id: info.data.id,
            name: info.data.title,
            healthScore: info.data.healthScore, // que tan saludable es la receta 
            image: info.data.image,
            diets: info.data.diets, // retorna un array con los tipos de dietas
            score: info.data.spoonacularScore,  // puntuacion de la receta 
            dishTypes: info.data.dishTypes, // el tipo de la receta 
            summary: info.data.summary, // resumen de la receta 
            steps: info.data.analyzedInstructions[0]?.steps.map(e => {
              return {
                  number: e.number,
                 step: e.step
               }}),
            
            
          }
          return [recipeapi]
      } catch (error) {
        console.log(' 🗑 ',error)      
    }
  }

  //funcion para Guardar las dietas de la api a la db.........
 const SaveDietDb = async () => {
  try {
    const apiInfo = await GetInfoApiRecipe();
    const alldiets = apiInfo.map(info => info.diets) 
    const sinClonDiets = new Set(alldiets.flat())
    sinClonDiets.forEach(async d =>{await Diet.findOrCreate({where:{name: d}})})
    const collectDiest = await Diet.findAll()
    return collectDiest   
  }catch (error) {
  console.log(' 🗑 ',error)      
  }
 };

 //funcion para Obtener las dietas agregados previamente a db.......
 const GetDietsFromDB = async () => {
  try {
    let DietsDB = await  Diet.findAll();
    DietsDB =  DietsDB.map((d) => d.toJSON());
    return DietsDB;
  } catch (error) {
    console.log(error);
  }
 }

 

 module.exports = {
  GetInfoApiRecipe,// funcion para obtener toda la informacion de las rectetas de la api ......
  GetInfoDbRecipe,//funcion para obtener informacion de recipe en DB  ...... 
  GetAllInfoRecipes,//funcion de Concatenancion de Recetas de la api y de las Recetas creadas en db ......
  GeIdRecipesId,//Funcion para buscar en DB y API una receta mediante su id........
  SaveDietDb,//funcion para Guardar las dietas de la api a la db........
  GetDietsFromDB,//funcion para Obtener las dietas agregados previamente a db.......
 }

    
