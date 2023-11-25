const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchPassesByCoords } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');
let IP = ''
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned IP:' , ip);
  IP = ip
});


fetchCoordsByIP(IP, (error, coordinates) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned coordinates: ', coordinates);
  coordinatePair = coordinates
})


let coordinatePair = { latitude: 51.0486151, longitude: -114.0708459 }
fetchPassesByCoords(coordinatePair.latitude, coordinatePair.longitude, (error, passes) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log(`It worked! Returned flyover times: `, passes);
})


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  console.log(passes);
});