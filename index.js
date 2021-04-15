const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    let myRecipe = {
      title: "Anna's Pie",
      level: "Easy Peasy",
      ingredients: ["Flour", "Hazelnut", "Oatmilk", "Cinnamon"],
      cuisine: "German"
    }
    //ITERATION 2
    return Recipe.create(myRecipe)
  })
  .then((createdRecipe) => {
      console.log('all good!', createdRecipe.title)
    //ITERATION 3
    return Recipe.insertMany(data)
  })
  .then((allRecipes) => {
    //console.log('all recipes', allRecipes)
    for (let i = 0; i < allRecipes.length; i++){
      console.log(allRecipes[i].title)
    }
    //ITERATION 4
    return Recipe.findOneAndUpdate({name: 'Rigatoni alla Genovese'}, {duration: 100})
  })
  .then(() =>{
     console.log('good job, you updated!')
    //ITERATION 5
    return Recipe.deleteOne({name: 'Carrot Cake'})
  })
  .then(() =>{
     console.log('deleted')  
    //ITERATION 6
    return mongoose.connection.close()
   .then(() => {
     console.log('disconnected')
   })
   .catch(error => {
     console.log('disconnection failed')
   })
  })
   
  .catch(error => {
      console.error('Error connecting to the database', error);
  });
