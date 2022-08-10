const router = require("express").Router();

const { 
    GetDiets,//Simplemente obtenga las dietas de la API, 
    //cárguelos en la base de datos y envíelos de vuelta al cliente.

} = require("../controles/Diets");

//Creando routes y añadiendo los controles.

router.get("/diets", GetDiets); 

module.exports = router;