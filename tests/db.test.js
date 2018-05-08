// const server = require('./../server.js');
const db = require('./../db/models/store.js')
// Notes:
// 1. Data must be seeded into Mongodb by running npm run seed.
// 2. Mongodb must be started by using mongod from terminal
// 3. use database 'apateez'


var place_id = '9999999'

test('the data is an array', () => {
  expect.assertions(1);
  return db.findOne(place_id).then((data) => {
    expect(Array.isArray(data)).toBe(true);
  });
});

test('the data is an array of length 1', () => {
  expect.assertions(1);
  return db.findOne(place_id).then((data) => {
    expect(data.length).toBe(1);
  });
});

test('the data has a place_id', () => {
  expect.assertions(1);
  return db.findOne(place_id).then(data => {
    expect(data[0].place_id).not.toBe(undefined);
  });
});

test('the data[0].reviews is an array', () => {
  expect.assertions(1);
  return db.findOne(place_id).then(data => {
    expect(Array.isArray(data[0].reviews)).toBe(true);
  });
});

test('the data[0].reviews contains reviews', () => {
  expect.assertions(1);
  return db.findOne(place_id).then(data => {
    expect(data[0].reviews.length).not.toBe(undefined);
  });
});

test('the data[0].rating exists', () => {
  expect.assertions(1);
  return db.findOne(place_id).then(data => {
    expect(data[0].rating).not.toBe(undefined);
  });
});
