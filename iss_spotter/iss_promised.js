
const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json')
};

const fetchCoordsByIP = function(body) {
  let ip = JSON.parse(body).ip;
  return request(`https://ipwho.is/${ip}`);
}

const fetchPassesByCoords = function(body){
  let lat = JSON.parse(body).latitude;
  let lon = JSON.parse(body).longitude;
  return request(`https://iss-flyover.herokuapp.com/json/?lat=${lat}&lon=${lon}`);
}
const nextISSTimesForMyLocation = function(callback) {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchPassesByCoords)
  .then((body) => {
    const {response} = JSON.parse(body);
    // console.log(output);
    return response;
  })
}
      

// module.exports = { fetchMyIP, fetchCoordsByIP, fetchPassesByCoords }
module.exports = { nextISSTimesForMyLocation}