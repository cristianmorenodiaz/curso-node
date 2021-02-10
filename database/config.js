const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MongoDB, {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true, 
            useFindAndModify: false
        });

        console.log("Base de datos en linea");
    } catch(error) {
        console.log(error);
        throw new Error("Error en iniciar BD");
    }
}

module.exports = {
    dbConnection,
}