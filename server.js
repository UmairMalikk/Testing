const express = require('express')
const morgan  = require('morgan')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const app = express()
const port  = process.env.port || 8000;

app.use(morgan('dev'))

app.use('/',(req,res)=>{
    res.send('hello')
})
 
app.listen(port,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log(`Server is connected on ${port}`)
    }
})