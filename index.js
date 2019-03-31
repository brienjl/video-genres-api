const Joi = require('joi');// using the Joi class for validations
const express = require('express');
const app = express();

app.use(express.json());

// app.get() => return a list of all the movie genres
// app.post() => create a new movie genre
// app.put() => update an existing movie genre
// app.delete() => delete an existing movie genre

const genres = [
    { id: 0, name: 'Action' },
    { id: 1, name: 'Drama' },
    { id: 2, name: 'Documentary' },
    { id: 3, name: 'Horror' },
    { id: 4, name: 'International' },
    { id: 5, name: 'Mature' },
    { id: 6, name: 'Romance' }
]

//start the application
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));

/*
** GET requests
** GET All movie genres
** GET A genres by it's id
*/

//GET All movie genres
app.get('/api/genres', (req, res) => {
    res.send(genres);
});

//Get A genre by it's id
app.get('/api/genres/:id', (req, res) => {
    
    //LOOKUP
    const genre = genres.find(c => c.id === parseInt(req.params.id));

    //VALIDATE
    //If genre isn't found, return 404 - not found
    if (!genre) return res.status(404).send('Movie genre not found')

    //RETURN IF VALID
    res.send(genre);
});

//POST: Create a new Movie Genre
app.post('/api/genres', (req, res) => {
    
    //LOOKUP and VALIDATE
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //POST (CREATE) the new movie genre if valid
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});



function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(genre, schema);
}



