const Stores = require('./db/models/store.js');
const mongoose = require('mongoose');
const inputData = require('./data.json');

const seedDb = (array) => {
  let counter = 0;

  const createList = () => {
    const obj = {
      place_id: array[counter].place_id,
      name: array[counter].name,
      reviews: array[counter].reviews,
      rating: array[counter].rating,
      price_level: array[counter].price_level,
      neighborhood: array[counter].neighborhood,
      city: array[counter].city,
      street: array[counter].street,
    };

    Stores.insertOne(obj, (err, content) => {
      if (err) {
        return err;
      }
      counter++;
      if (counter < array.length) {
        createList();
      } else {
        mongoose.disconnect();
        return counter;
      }
    });
  };

  Stores.clearDb(() => createList());
};

seedDb(inputData);

// mongoimport -d apateez-reviews -c stores --jsonArray --file test.json --numInsertionWorkers 12
