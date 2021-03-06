const express = require("express");
const app = express();
const connection = require('./models/database/database');
const Pergunta = require("./models/Pergunta");
const perguntaModel = require('./models/Pergunta');
const Resposta = require('./models/Resposta');

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
    perguntaModel.findAll({raw:true, order:[
        ['id','DESC']
    ]}).then(perguntas => {
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
app.get('/pergunta/:id', (req,res)=> {
    const { id } = req.params
    perguntaModel.findOne({
        where:{id}
    }).then(pergunta => {
        if(pergunta != undefined){
            Resposta.findAll({order:[
                ['createdAt','DESC']
            ],
                where: {perguntaID: pergunta.id}
            }).then(resp =>{
                res.render('pergunta', {pergunta, resp})
            })
            
        }else{
            res.redirect('/')
        }
    })
});

app.post('/responder/:perguntaID', (req,res)=> {
    const {perguntaID} = req.params;
    const corpo = req.body.corpo
    console.log(corpo)
    if (corpo !== '') {
        Resposta.create({perguntaID,corpo})
    .then(()=>{
        res.redirect(`/pergunta/${perguntaID}`)
    });

    }else{
        res.redirect(`/pergunta/${perguntaID}`)
    }
    
})

app.listen(5000, ()=> {
    console.log("running on port: 5000");
});