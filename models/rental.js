// mongoDB mongoose imports
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define rental Schema
// =============================================================================

var rentalSchema = new mongoose.Schema({
    // Schema Properties
    createdAt        : { type: Date                    },
    updatedAt        : { type: Date                    },
    renter           : { type: String, required: true  },
    image            : { type: String                  }
});

rentalSchema.pre('save', function(next) {
    // Set createdAt && updateAt
    const now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    };

module.exports = mongoose.model('Rental', rentalSchema);
