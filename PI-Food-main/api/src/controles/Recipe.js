const { GetAllInfoRecipes,GeIdRecipesId} = require("./utils");
const { Diet , Recipe } = require("../db");
//GetAllInfoRecipes,//funcion de Concatenancion de Recetas de la api y de las Recetas creadas en db ......
//GeIdRecipesId,//Funcion para buscar en DB y API una receta mediante su id........
//funcion para crear una nueva receta.......



//obtener todas las recetas (o una, por el nombre pasado via query)

const GetRecipe = async (req, res) =>{
    try {
    const name =req.query.name
    let RecipesTotal = await GetAllInfoRecipes();
    if (name){
        let RecipeName = await RecipesTotal.filter(d => d.name.toLowerCase().includes(name.toLowerCase()))
        RecipeName.length
          
          ? res.status(200).send(RecipeName) 
          : res.status(400).send("Receta no encontrada");
    }else{
        res.status(200).send(RecipesTotal);
    }
 } catch (error) {
    res.status(400).send({ errorMsg: error });
  }

};
//obtener una receta mediante su id...
const GetSingleRecipe = async (req, res) =>{
  try {
    const { id } = req.params;
    const recipe = await GeIdRecipesId(id)
    res.json(recipe)
  } catch (error) {
    res.status(500).send(error.message);
  }
 

}
//funcion para crear una nueva receta.......
const CreatePostRecipe = async (req,res) =>{
  try {
      const {name, summary, healthScore, steps, image,diets} = req.body
      let newRecipe = await Recipe.create({
       name,
       summary,
       healthScore,
       steps,
       image,  
      })
     let RecipeDb= await Diet.findAll({where: {name: diets}})
     newRecipe.addDiet(RecipeDb)
     res.status(200).send("receta creada")
    

   } catch (error) {console.log(error)}
 }
 //eliminar recetas de base de tados............
 const deleteRecipe = async (req, res) => {
  try {
      const oneGuy = await Recipe.findOne({
          where: { id : req.body.id}
      })
      await oneGuy.destroy()
      res.send("Deleted")
  }
  catch (error) {
      console.log("Something went wrong, ", error)
  }
}
//editar recetas de base de datos.........
const updaterecipe = async (req, res) => {
  const {name,image,summary,healthScore,steps,} = req.body
  try {
      const oneGuy = await Recipe.findOne({
          where: { id : req.body.id}
      })
      await oneGuy.update({
          name,
          image,
          summary,
          healthScore,
          steps,

      })
      res.send("Updated")
  }
  catch (error) {
      console.log("Something went wrong, ", error)
  }
}




module.exports = {
    deleteRecipe,
    GetRecipe,//obtener todas las recetas (o una, por el nombre pasado via query)
    GetSingleRecipe,//obtener una receta mediante su id...
    CreatePostRecipe,// crear una receta...
    updaterecipe
   
}