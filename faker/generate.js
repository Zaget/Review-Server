const faker = require('faker');
const fs = require('fs');

faker.locale = 'en_US';

const results = [];

let counter = 10000;
const product = {};

for (let i = 0; i < counter; i++) {
    faker.seed(i);
    product.place_id = i;
    product.name = faker.company.companyName();

    product.reviews = [];
    for (let j = 0; j < Math.floor(Math.random() * (8 - 0) + 0); j++) {
        product.reviews.push({
            author_name: faker.name.firstName() + '' + faker.name.lastName(),
            profile_photo_url: faker.image.avatar(),
            rating: Number((Math.random() * 5).toFixed(0)),
            text: faker.lorem.sentences(),
            relative_time_description: faker.date.recent()
        })
    }
    
    product.rating = Number((Math.random() * 5).toFixed(1));
    product.price_level = Math.floor(Math.random() * (4 - 1) + 1);
    product.neighborhood = faker.address.county();
    product.city = faker.address.city();
    product.street = faker.address.streetName();
    // results.push(product);

    if (i === counter - 1) {
        fs.appendFileSync('../data.json', JSON.stringify(product) + ']', (err) => {
            if (err) {
                throw err;
            } else {
                console.log('File Saved');
            }
        });
        } else {
        fs.appendFileSync('../data.json', JSON.stringify(product) + ',', (err) => {
            if (err) {
                throw err;
            } else {
                console.log('File Save Ongoing');
            }
        });
    }
};

// fs.createWriteStream('..data.json', JSON.stringify(result), (err) => {
//     if (err) {
//         throw err;
//     } else {
//         console.log('File has been saved');
//     }
// })

// fs.writeFileSync('../data.json', JSON.stringify(results), (err) => {
//     if (err) {
//         throw err;
//     } else {
//         console.log('File has been saved');
//     }
// });
