// Importera Schema och model från mongoose
const { Schema, model } = require("mongoose");

// Definiera ett användarschema med namn, ålder och e-post
const UserSchema = new Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
  },
});

// Skapa en modell baserad på användarschemat
const UserModel = model("users", UserSchema);

// Exportera användarmodellen
module.exports = UserModel;
