const {Schema, model} = require('mongoose');

const AllergenSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false
    }
});

const AllergenModel = model('Allergen', AllergenSchema);

module.exports = {AllergenSchema, AllergenModel}