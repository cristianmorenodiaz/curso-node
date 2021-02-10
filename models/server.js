const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

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

        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicacion en  http://localhost:${this.port}`)
        })
    }

}

module.exports = Server;