// module.exports = {
//   mongoURI: 'mongodb://Devconnector:Olanicmi2013@ds263948.mlab.com:63948/devconnector'
// }

if (process.env.NODE_ENV === 'production') {
  module.exports = {
    mongoURI: 'mongodb://Iyiola:Olanicmi2013@ds263948.mlab.com:63948/devconnector',
    secretOrKey: 'secret'
  } // DB for production mlab (heroku deployment)
} else {
  module.exports = {
    mongoURI: 'mongodb://localhost:27017/Dev-Connector',
    secretOrKey: 'secret'
  } // DB for local deployment
}