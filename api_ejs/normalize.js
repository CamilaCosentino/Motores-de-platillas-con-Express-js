const {normalize,schema} = require("normalizr")
const util = require("util")
const obj =  require("./mensajes.json")

const AuthorsSchema = new schema.Entity("author",{idAttribute:"email"})

const mensajesSchema = new schema.Entity("text")
const mensajesPack = {
    author: [AuthorsSchema],
    text: mensajesSchema
   

   

}
const normalizeM = normalize(obj,mensajesPack)
function print(objeto){
    console.log(util.inspect(objeto,false,12,true))
}
print(normalizeM)

module.exports = normalizeM


