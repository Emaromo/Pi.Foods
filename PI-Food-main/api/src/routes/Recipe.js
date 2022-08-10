const router = require("express").Router();

const {
  GetRecipe,
  GetSingleRecipe,
  CreatePostRecipe,
  updaterecipe,
  deleteRecipe,
  
} = require("../controles/Recipe");

//Creando routes y añadiendo los controles.

router.delete("/recipe",deleteRecipe);//eliminar una receta creada

router.put("/recipe",updaterecipe);//editar receta

router.get("/recipes",GetRecipe);//obtener todas las recetas (o una, por el nombre pasado via query)

router.get("/recipes/:id",GetSingleRecipe);//obtener una receta mediante su id...

router.post("/recipes", CreatePostRecipe);//crear una receta

GetRecipe,//obtener todas las recetas (o una, por el nombre pasado via query)
GetSingleRecipe,//obtener una receta mediante su id...
CreatePostRecipe,// crear un video juego





module.exports = router;