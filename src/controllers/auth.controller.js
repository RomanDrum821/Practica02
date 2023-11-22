const User = require("../models/auth.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        estado: 0,
        mensaje: "Faltan Parametros",
      });
    } else {
      const user = await User.findOne({ email: email });
      if (!user) {
        res.status(404).json({
          estado: 0,
          mensaje: "Usuario no encontrado",
        });
      } else {
        //Comparar las claves
        //user.password = password;
        const resultComparation = await bcrypt.compare(password, user.password);
        if (resultComparation) {
          const user = await User.findOne({ email: email });
          const Uemail = user.email;
          const UNuser = user.username;
          const token = jwt.sign({ Uemail, UNuser }, process.env.secret);
          //Temporalmente
          res.status(200).json({
            estado: 1,
            mensaje: "Acceso correcto",
            token: token,
          });
        } else {
          res.status(401).json({
            estado: 1,
            mensaje: "Acceso denegado, clave incorrecta",
          });
        }
      }
    }
  } catch (error) {
    res.status(500).json({
      estado: 1,
      mensaje: "Ocurrio un error desconocido",
    });
  }
};
