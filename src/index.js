const express = require("express")

const app = express()
app.set('views', './src/views')
app.set('view engine', 'ejs')
app.use(express.static('./src/views/public'))
app.get('/', (req,res)=>{
    res.render('index')
})

app.listen(5000, ()=> {
    console.log("running on port: 5000")
})