const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID,  // <--- crea id unocos alfanimericos
      defaultValue: DataTypes.UUIDV4,  //<-- el id que creea es V2 basado en 8bits
      primaryKey: true,
      allowNull: false
    },

    name: {
      type: DataTypes.STRING ,
      allowNull: false,
    },

    summary:{
      type: DataTypes.TEXT,
      allowNull:false
    },

    healthScore:{
      type: DataTypes.FLOAT
    },

    steps:{
      type: DataTypes.TEXT
    },

    image:{
      type: DataTypes.STRING
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },{
    timestamps: false
  });

};
