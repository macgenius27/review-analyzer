const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const speak = require('speakeasy-nlp');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/analyze', (req, res) => {
    const review = req.body.review;
    const result = speak.sentiment.analyze(review);
    res.json(result);
});

app.listen(PORT, () => {
    console.log(`Server stared on Port ${PORT}...`);
})