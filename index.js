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
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })

  .then(() => {

  let newRecipe = {
    title: 'vegan and gluten free vanilla protein milkshake',
    level: 'Easy Peasy',
    ingredients: ['soy milk', 'vanilla vegan and gluten free protein', 'chia seeds'],
    cuisine: 'gluten free and vegan',
    dishType: 'Breakfast',
    image:
      'https://beamingbaker.com/wp-content/uploads/2020/02/The-Best-Vanilla-Vegan-Protein-Shake-Recipe-1.jpg',
    duration: 5,
    creator: 'Lau'
  };

  Recipe.create(newRecipe)
    .then((result) => console.log(`recipe added: ${result.title}`))
    .catch((err) => console.log(err));


    Recipe.insertMany(data)
    .then((result) => {
      result.forEach((item) => {
        console.log(`this is ${item.title} recipe`)
      })
    })
   .catch((err) => console.log(err))
    

   Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"},{duration: 100},{new: true})
  .then(() => console.log("Recipe Updated"))
  .catch((err) => console.log(err))

  Recipe.deleteOne({title: "Carrot Cake"})
  .then(() => console.log("Carrot Cake recipe deleted"))
  .catch((error) => console.log(error))


mongoose.connection.on('disconnected', () => console.log('Mongoose disconnected'));

