const mongoose = require('mongoose');

const AllergenSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        unique:true
    },
    description: {
        type: String,
        required: false
    }
});

const AllergenModel = mongoose.model('Allergen', AllergenSchema);

module.exports = {AllergenSchema, AllergenModel}