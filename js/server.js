const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const path = require('path');

const app = express();
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://mongoadmin:secret@localhost:1888/?authMechanism=DEFAULT");

var nameSchema = new mongoose.Schema({
    id: String,
    content: String
});
var Task = mongoose.model("Task", nameSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//express.static loads static files as styles.css or jquery and javascript dependencies
//without it, index.html is just html without any styles or functionality
app.use(express.static(path.join(__dirname, '..')));

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.post('/test', function (req, res) {
    res.send({'res': req.body.answer + 10});
});

app.post('/create', function (req, res) {
    let data = new Task(req.body);
    data.save()
        .then(item => {
            res.send({
                'content': req.body.content,
                'response': 'task saved into database'
            });
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});