// const { fetchMyIP } = require('./iss_promised');
// const { fetchCoordsByIP } = require('./iss_promised');
// const { fetchPassesByCoords } = require('./iss_promised');
const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

const { nextISSTimesForMyLocation } = require('./iss_promised');
// let output = ''
// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchPassesByCoords)
//   .then(body => console.log(body));
nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message)
  })