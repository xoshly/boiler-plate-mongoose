require('dotenv').config();
let mongoose = require("mongoose");

mongoose.connect("mongodb+srv://arandall:hairtechlove54165@cluster0.ae9e3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});


const Schema = mongoose.Schema; //declares mongoose first 

const personSchema = new mongoose.Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let janedoe = new Person({name: "Jane Doe", age: 32, favoriteFoods: ["eggs", "steak"]});
  janedoe.save(function(err, data) {
    if(err) return console.error(err);
    done(null, data)
  });
  
};

const arrayOfPeople = [
  {name: "John Brown", age: 20, favoriteFoods: ["porkchops", "yams"]},
  {name: "Ashley Lewis", age: 25, favoriteFoods: ["turkey", "dressing"]},
  {name: "Kenya Davis", age: 39, favoriteFoods: ["chicken", "rice"]}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, people) {
    if(err) return console.error(err);
    done(null, people);
  });
 
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, personFound) {
    if(err) return console.error(err);
    done(null, personFound);
  });
  
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, data) {
    if(err) return console.error(err);
    done(null, data);
  });
  
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data) {
    if(err) return console.error(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err, person) {
    if(err) return console.error(err);
    
    person.favoriteFoods.push(foodToAdd);

    person.save(function(err, updatedPerson) {
      if(err) return console.error(err);
      done(null, updatedPerson);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.error(err);
    done(null, updatedDoc);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedDoc) => {
    if(err) return console.error(err);
    done(null, removedDoc);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, response) =>{
    if(err) return console.error(err);
    done(null, response)
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
    .sort({name: 1})
    .limit(2)
    .select({age: 0})
    .exec((err, people) => {
      if(err) return console.error(err);
      done(null, people)
    })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
