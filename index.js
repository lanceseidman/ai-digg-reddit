const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.engine('html',require('ejs').renderFile);
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

app.get('/', (req, res) => {
    res.render('index.html');
});

app.post('/recipes', (req, res) => {
  const { title, description, ingredients, instructions } = req.body;
  // Validate the request data
  const recipe = new Recipe({ title, description, ingredients, instructions });
  recipe.save((err) => {
    if (err) {
      console.error('Error saving recipe:', err);
      res.status(500).send('Error saving recipe');
    } else {
      res.status(200).send('Recipe saved successfully');
    }
  });
});

app.put('/recipes/:id/vote', (req, res) => {
  const { id } = req.params;
  const { vote } = req.body;
  // Validate the request data
  Recipe.findByIdAndUpdate(id, { $inc: { votes: vote } }, (err, recipe) => {
    if (err) {
      console.error('Error updating recipe vote count:', err);
      res.status(500).send('Error updating recipe vote count');
    } else if (!recipe) {
      res.status(404).send('Recipe not found');
    } else {
      res.status(200).send('Vote count updated successfully');
    }
  });
});



