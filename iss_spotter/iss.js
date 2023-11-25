const request = require("request");
const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }
    // console.log(response)
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback){
  request(`https://ipwho.is/${ip}`, (error, response, body) =>{
    if (error) return callback(error, null);
    const data = JSON.parse(body);
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }
    const {latitude, longitude} = data;
    callback(null, {latitude, longitude});
  })
}

const fetchPassesByCoords = function(latitude, longitude, callback){
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  // console.log('url: ', url)
  request(url, (error, response, body) =>{
    if (error) {
      callback(error, null);
      return
    }
    const passes = JSON.parse(body);
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching: ${body}`), null);
      return;
    }
    callback(null, passes);
  })
}

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }
      fetchPassesByCoords(loc,(error, passes) => {
        if (error){
          return callback(error, null);
        }
        callback (null, passes)
      })
    })
  })
}

module.exports = { fetchMyIP, fetchCoordsByIP, fetchPassesByCoords, nextISSTimesForMyLocation }