const router = require("express").Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const RecipeRouter = require("./Recipe.js");
const DietsRouter = require("./Diets.js");


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/", RecipeRouter);
router.use("/", DietsRouter);



module.exports = router;
