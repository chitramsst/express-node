
import {app} from './app.js'
import dotenv from 'dotenv'
import ConnectDB from './db/index.js'

dotenv.config({
path: './.env'
})

const PORT =  process.env.PORT || 4000

ConnectDB()
.then(() => {
  app.listen(PORT, () => {
    console.log(`listen to port: ${PORT} `);
  })  
})
.catch((err)=>{
  console.log("conneciton error")
})