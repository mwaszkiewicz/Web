var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/social', function(){
  console.log('Nawiazano polaczenie z mongodb.');
});

module.exports = mongoose;
