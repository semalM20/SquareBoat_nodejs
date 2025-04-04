const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({

    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },

    candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

});

module.exports = mongoose.model('Application', applicationSchema);
