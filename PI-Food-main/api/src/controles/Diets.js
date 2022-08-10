const {SaveDietDb,GetDietsFromDB} = require("./utils");
//SaveDietDb(),//funcion para Guardar las dietas de la api a la db........
//GetDietsFromDB(),//funcion para Obtener las dietas agregados previamente a db.......

//Simplemente obtenga las dietas de la API, cárguelos en la base de datos y envíelos de vuelta al cliente.
const GetDiets = async (req, res) => {
  try {
    await SaveDietDb();
    let Diets = await GetDietsFromDB();
    Diets = Diets.map((d) => {
      return {
        id: d.id,
        name: d.name,
      };
    }); 
    res.send(Diets);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  GetDiets,//Simplemente obtenga las dietas de la API, cárguelos en la base de datos y envíelos de vuelta al cliente.
}; 