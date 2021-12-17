const express = require("express")
const app = express()
const morgan = require("morgan")
const ejs =  require("ejs")
const Container = require("./container")
const Contenedor = require("./container")
const arr = new Container("./productos.txt")

app.set("port" , process.env.PORT || 3001)
app.set("view engine", "ejs")

app.use(express.json())
app.use(morgan("dev"))
app.use(express.urlencoded({extended:true}))
app.get("/productos",(req,res) =>{
  res.render("./form.ejs",{titulo:"Formulario de registro"})
})
app.post("/productos",async(req,res) =>{
    const {id,titulo,autor,imagen} = req.body
    console.log('titulo',titulo)
    console.log('autor', autor)
    console.log('imagen',imagen)
    const newArr = {
        id,
        titulo,
        autor,
        imagen
    }
const arp = await arr.save(newArr)
res.json({ msg: 'Producto Agregado', newArr })
})
app.get("/vista" ,async (req,res) =>{
   
const data = await arr.getAll()
console.log(data)
res.render("./productos",{
  datos:data
})
    
})
app.listen(app.get("port") , () =>{
console.log(`Server on port ${app.get("port")}`)
})