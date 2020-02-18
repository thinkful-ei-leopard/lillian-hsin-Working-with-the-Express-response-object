'use strict';

const express = require('express');
const morgan = require ('morgan');
const playData = require('./playstore');

const app = express();

app.use(morgan('common'));

app.get('/apps', (req, res) =>{

  const {genres = '', sort} = req.query;

  const validGenre = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];

  if ('genre' in req.query && !validGenre.inludes(genres)){
    return res.status(400).send('Genres must match with validGenres');
  }

  if (sort){
    if(!['rating', 'app'].includes(sort)){
      return res.status(400).send('Sort must be one of rating or app');
    }
  }

  let results = playData.filter(app => 
    app['App'].toLowerCase()
      .includes(genres.toLowerCase()));

      

  if(sort){
    results.sort((a, b) =>{
      return a[sort] > b[sort] ? 1 : -1;
    });
  }
  

  res.json(results);

});

app.listen(8000, () => {
  console.log('Express is listening on 8000');
});
