const express = require('express');
const sqlite = require('sqlite3');
const path = require('path');

const app = express();
app.use(express.json());
const db = new sqlite.Database('database.sqlite');

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/login.html'));
});


app.get('/pagina_inicial', function (req, res) {
    res.sendFile(path.join(__dirname + '/pagina_inicial.html'));
});


app.post('/verificar', function (req, res) {
    console.log(req.body);
    db.all("SELECT * FROM USUARIOS WHERE USUARIO = ? AND SENHA = ?", (err, rows) => {
        if(rows)res.send("/pagina_inicial");
        else res.send(err);
    });
});

app.get('/cadastro', function (req, res) {
    res.sendFile(path.join(__dirname + '/cadastro.html'));
});


criar_tabela();

function criar_tabela(){
    var query = "CREATE TABLE IF NOT EXISTS USUARIOS (";
    query += "USUARIO VARCHAR,";
    query += "EMAIL VARCHAR,";
    query += "SENHA VARCHAR );";


    db.run(query, (err) => {
        if (err) console.log(err);
        else console.log("Tabela criada com sucesso!")
    });
}


    app.post('/cadastrar_usuarios', function (req, res) {
        console.log(req.body);
    
        var usuario = req.body.usuario;
        var email = req.body.email;
        var senha = req.body.senha;

        var query = "INSERT INTO USUARIOS ( USUARIO, EMAIL, SENHA ) VALUES ( ?, ?, ? )";

        db.run(query, [usuario, email, senha], (err) => {
        if (err) res.send(err);
        else res.send("Usuário inseridos!");
    });
});


app.listen(3000, console.log('Rodando..'));