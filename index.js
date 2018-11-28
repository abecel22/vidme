const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

let genres = [
    { id: 1, name: 'action' },
    { id: 2, name: 'comedy' },
    { id: 3, name: 'horror' }
];

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/genres', (req, res) => {
    res.send(genres);
});

app.post('/api/genres', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };

    genres.push(genre);
    res.send(genres);
});

function validateGenre(genre) {
    const schema = {
        name: Joi.string()
            .min(3)
            .required()
    };

    return Joi.validate(genre, schema);
}

const port = process.env.port || 3000;
app.listen(port, console.log(`Listening on port ${port}....`));
