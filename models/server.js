const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      authPath: "/api/",
      usuariosPath: "/api/usuarios",
      categoriasPath: "/api/categorias",
      prodctosPath: "/api/productos",
      buscarPath: "/api/buscar",
    };

    // Conectar Base de datos
    this.databaseConnect();

    //Middleware
    this.middlewares();

    // Rutas de aplicacion
    this.routes();
  }

  async databaseConnect() {
    await dbConnection();
  }

  middlewares() {
    // Cors
    this.app.use(cors());

    // Lectura y parseo de datos
    this.app.use(express.json());

    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.authPath, require("../routes/auth"));
    this.app.use(this.paths.usuariosPath, require("../routes/usuarios"));
    this.app.use(this.paths.categoriasPath, require("../routes/categorias"));
    this.app.use(this.paths.prodctosPath, require("../routes/productos"));
    this.app.use(this.paths.buscarPath, require("../routes/buscar"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Aplicacion en  http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
