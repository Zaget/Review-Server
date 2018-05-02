const faker = require('faker');
const fs = require('fs');

faker.locale = 'en_US';

// const results = [];

// let counter = 10000;
// const product = {};

// for (let i = 0; i < counter; i++) {
//     faker.seed(i);
//     product.place_id = i;
//     product.name = faker.company.companyName();

//     product.reviews = [];
//     for (let j = 0; j < Math.floor(Math.random() * (8 - 0) + 0); j++) {
//         product.reviews.push({
//             author_name: faker.name.firstName() + '' + faker.name.lastName(),
//             profile_photo_url: faker.image.avatar(),
//             rating: Number((Math.random() * 5).toFixed(0)),
//             text: faker.lorem.sentences(),
//             relative_time_description: faker.date.recent()
//         })
//     }
    
//     product.rating = Number((Math.random() * 5).toFixed(1));
//     product.price_level = Math.floor(Math.random() * (4 - 1) + 1);
//     product.neighborhood = faker.address.county();
//     product.city = faker.address.city();
//     product.street = faker.address.streetName();
//     // results.push(product);

//     if (i === counter - 1) {
//         fs.appendFileSync('../data.json', JSON.stringify(product) + ']', (err) => {
//             if (err) {
//                 throw err;
//             } else {
//                 console.log('File Saved');
//             }
//         });
//         } else {
//         fs.appendFileSync('../data.json', JSON.stringify(product) + ',', (err) => {
//             if (err) {
//                 throw err;
//             } else {
//                 console.log('File Save Ongoing');
//             }
//         });
//     }
// };

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Write Stream >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const counter = 10000000;

let product = {};

const createReviews = (index) => {
    product.place_id = index;
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
    return product;
};

const generateData = (writer, encoding, callback) => {
    let i = counter;
    function write() {
        let ok = true;
        do {
        i -= 1;
        let stringData = JSON.stringify(createReviews(i));
        if (i === counter - 1) {
            stringData = `[${stringData}`;
        }
        if (i !== 0) {
            stringData += ',';
        }
        if (i === 0) {
            stringData += ']';
            writer.write(stringData, encoding, callback);
        } else {
            ok = writer.write(stringData, encoding);
        }
        } while (i > 0 && ok);
        if (i > 0) {
        writer.once('drain', write);
        }
    }
    write();
};
    
generateData(fs.createWriteStream('./data.json'), 'utf8', () => {
    console.log('WriteStream Complete');
});