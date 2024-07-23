import express from 'express'
import 'dotenv/config'
import logger from "./logger.js";
import morgan from "morgan";


const app = express()

app.use(express.json())

const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

const port = process.env.PORT || 3000


let productList = []
let nextId = 1

/* add the product */
app.post("/add",(req,res)=>{
    console.log(req)
 const {name, price} = req.body
 const newProduct = {id: nextId++, name, price}
 productList.push(newProduct)
 res.status(201).send(newProduct)
})


/* List the product */
app.get("/",(req,res)=>{
  logger.info("get products list")
    res.send (productList)
})

/* get a single tea */
app.get('/product/:id',(req,res)=>{
    console.log(productList)
    console.log(req.params.id)
    let item = productList.find(i=>i.id === parseInt(req.params.id))

    if(item) {
        res.status(200).send(item)
    } else {
        res.status(201)
        res.send("Item Not found")
    }
})


/* updtae item */
app.put('/update/:id',(req,res)=>{
    const {name, price} = req.body

    let item = productList.find(i=>i.id === parseInt(req.params.id))

    if(item) {
        item.name = name
        item.price = price
        res.send(item)
    } else {
        res.status(404).send("Not found")
    }
})

/* delete item */

app.get('/delete/:id',(req,res)=>{
   // res.send(req)
    let index = productList.findIndex(i=>i.id === parseInt(req.params.id))
    if(index=== -1) {
        res.status(404).send("Not found")
    }else {
       productList.splice(index,1)
       res.send(productList)
    }
})

app.listen(port,()=>{
    console.log(`server running on port:  ${port}... `)
})