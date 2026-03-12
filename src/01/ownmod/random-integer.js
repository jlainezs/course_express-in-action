var MAX = 100;

function randomInteger() {
    return Math.floor((Math.random() * MAX));
}

// Export the function, but not the MAX variable
module.exports = randomInteger;
