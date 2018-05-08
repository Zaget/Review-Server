const fs = require('fs');
const path = require('path');
const createReviews = require('../faker/generateJSON.js').createReviews;
const generate = require('../faker/generateJSON.js').generateData;
const generateDescriptionCSV = require('../faker/generateCSV.js').generateDescriptionCSV;
const generateReviewsCSV = require('../faker/generateCSV.js').generateReviewsCSV;
const csvparse = require('csv-parse');

//<<<<<<<<<<<<<<<<<<<<<<<<<<< Reviews >>>>>>>>>>>>>>>>>>>>>>>>>>>
describe('should generate a review along with description information', () => {
    let review = createReviews(0);
    
    test('should have place_id property as a number', () => {
        expect(typeof review.place_id).toBe('number');
    });

    test('should have name property as a string', () => {
        expect(typeof review.name).toBe('string');
    });

    test('should have reviews property as an array', () => {
        expect(Array.isArray(review.reviews)).toBe(true);
    });

    test('should have reviews property length between 0 and 8', () => {
        expect(review.reviews.length >= 0 && review.reviews.length <= 8).toBe(true);
    });

    test('should have rating property as a number', () => {
        expect(typeof review.rating).toBe('number');
    });

    test('should have rating number between 0 and 5', () => {
        expect(review.rating >= 0 && review.rating <=5).toBe(true);
    });

    test('should have price_level property as a number', () => {
        expect(typeof review.price_level).toBe('number');
    });

    test('should have price_level integer between 1 and 4 inclusively', () => {
        expect(review.price_level >= 1 && review.price_level <= 4).toBe(true);
    })

    test('should have neighborhood property as a string', () => {
        expect(typeof review.neighborhood).toBe('string');
    });

    test('should have city property as a city', () => {
        expect(typeof review.city).toBe('string');
    });

    test('should have street property as a string', () => {
        expect(typeof review.street).toBe('string');
    });

    test('should close array with bracket when i === 0', () => {
        expect()
    });
});

//<<<<<<<<<<<<<<<<<<<<<<<<< JSON File Generation >>>>>>>>>>>>>>>>>>>>>>>>>
describe('should generate a JSON file of X length where X is the desired number of reviews', () => {
    let testData = null;
    beforeEach((done) => {
        generate(10, fs.createWriteStream(path.join(__dirname, './generateTest.json')), 'utf8', () => {
            done();
        });
    });

    test('should create file with length of 10', () => {
        testData = require('./generateTest.json');
        expect(testData.length).toBe(10);
    });
});

//<<<<<<<<<<<<<<<<<<<<<<<<< CSV Description File Generation >>>>>>>>>>>>>>>>>>>>>>>>>

describe('should generate a CSV file of X length where X is the desired number of reviews', () => {
    let testDescription = null;
    let entry = null;
    beforeEach((done) => {
        generateDescriptionCSV(10, fs.createWriteStream('./tests/descriptionTest.csv'), 'utf8', () => {
            done();
        });
    });
    beforeEach((done) => {
        fs.readFile(path.join(__dirname, '/descriptionTest.csv'), 'utf8', (err, data) => {
            if (err) {
                console.log('CSV readfile error', err);
            } else {
                csvparse(data, (err, results) => {
                    if (err) {
                        console.log('csvparse error', err);
                    } else {
                        testDescription = results;
                        entry = testDescription[0];
                        done();
                    }
                })
            }
        })
    });

    test('should have length of 10', () => {
        expect(testDescription.length).toBe(10);
    });

    test('description entry should contain place_id property', () => {
        expect(parseInt(entry[0])).toBe(9);
    });

    test('description entry should contain name property', () => {
        expect(typeof entry[1]).toBe('string');
    });

    test('description entry should contain rating property', () => {
        expect((entry[2] >= 0) && (entry[2] <= 5)).toBe(true);
    });

    test('description entry should contain price_level property', () => {
        expect((entry[3] >= 1) && (entry[3] <= 4)).toBe(true);
    });

    test('description entry should contain neighborhood property', () => {
        expect(typeof entry[4]).toBe('string');
    });

    test('description entry should contain city property', () => {
        expect(typeof entry[5]).toBe('string');
    });

    test('description entry should contain street property', () => {
        expect(typeof entry[6]).toBe('string');
    });
});

//<<<<<<<<<<<<<<<<<<<<<<< CSV Reviews File Generation >>>>>>>>>>>>>>>>>>>>>>>>

describe('should generate a CSV file of X length where X is the desired number of reviews', () => {
    let testReview = null;
    let entry = null;
    beforeEach((done) => {
        generateReviewsCSV(10, fs.createWriteStream('./tests/reviewsTest.csv'), 'utf8', () => {
            done();
        });
    });
    beforeEach((done) => {
        fs.readFile(path.join(__dirname, '/reviewsTest.csv'), 'utf8', (err, data) => {
            if (err) {
                console.log('CSV readfile error', err);
            } else {
                csvparse(data, (err, results) => {
                    if (err) {
                        console.log('csvparse error', err);
                    } else {
                        testReview = results;
                        entry = testReview[0];
                        done();
                    }
                })
            }
        })
    });

    test('should be defined', () => {
        expect(entry).not.toBe(null || undefined);
    });
});