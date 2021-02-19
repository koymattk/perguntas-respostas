const express = require("express");
const app = express();
const connection = require('./models/database/database');
const perguntaModel = require('./models/Pergunta');

connection
    .authenticate()
    .then(() => {
        console.log("conexão com o banco de feita com sucesso")
    })
    .catch(error => {
        console.log(error)
    })

app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(express.static('./src/views/public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/', (req,res)=>{
    perguntaModel.findAll({raw:true}).then(perguntas => {
        res.render('index', {perguntas});
        console.log(perguntas)
    });
});

app.get('/perguntar', (req,res)=> {
    res.render('perguntar');
});

app.post('/salvarpergunta', (req,res) => {
    perguntaModel.create(req.body)
        .then(()=> {
            res.redirect('/')
        })
});

app.listen(5000, ()=> {
    console.log("running on port: 5000");
});