/**
 * Created by peter on 2017/11/20.
 */
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

module.exports = {mongoose};

// process.env.NODE_ENV === 'production'
//process.env.NODE_ENV === 'development'
// process.env.NODE_ENV === 'test'
