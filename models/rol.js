const { Schema, model } = require('mongoose')

const RoleSchema = new Schema({
    rol : {
        type : "String", 
        required: [true, "Rol Requerido"]
    }
});

module.exports = model('Role', RoleSchema);