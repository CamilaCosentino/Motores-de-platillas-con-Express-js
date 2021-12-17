
const express = require("express")
const app = express()
const morgan = require("morgan")
const pug = require("pug")
const Contenedor = require("./container")
const arr = new Contenedor("./productos.txt")

app.set("port" , process.env.PORT || 8080)
app.set("views" , "./views")
app.set("views engine" , "pug")
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))



app.get("/productos",(req,res) =>{
    res.render("index.pug", {mensaje: "Creando Formulario con Pug JS en  Express"} )
    
})
app.get("/vista",async(req,res) =>{
const prd = await arr.getAll()
console.log(prd)
    res.render("tabla.pug",{id:"#",name:"Nombre", price:"Precio",image:"Imagen",data:prd})

})
app.post("/productos" , async(req,res) =>{
    const {id,nombre,precio,imagen} = req.body
    console.log('nombre',nombre)
    console.log('precio', precio)
    console.log('imagen',imagen)

    const newArr = {
        id,
        nombre,
        precio,
        imagen
    }
const arp = await arr.save(newArr)

  res.json({ msg: 'Producto Agregado', newArr })
      
    
})
app.listen(app.get("port") , () => {
    console.log(`Server on port ${app.get("port")}`)

})

