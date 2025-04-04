const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({

    title: String,

    description: String,

    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

});

module.exports = mongoose.model('Job', jobSchema);
