// Import for encryption
const bcrypt = require('bcrypt');
// Imports for mongoose Schemas
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// =============================================================================

var renterSchema = new mongoose.Schema({
    // Schema Properties
    createdAt        : { type: Date                    },
    updatedAt        : { type: Date                    },
    email            : { type: String, required: true  },
    password         : { type: String, required: true  },
    firstName        : { type: String, required: true  },
    lastName         : { type: String, required: true  },
    phone            : { type: String                  },
    additContacts    : [{type: String                 }],
    rentals          : [{type: String                 }]
});

// MONGOOSE HOOKS for createdAt and updateAt  also encrypt the pass
// also salt, and hash the passwor
// =============================================================================

renterSchema.pre('save', function(next) {
    // Set createdAt && updateAt
    const now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    };
    // Encrypt password
    const user = this;
    if (!user.isModified('password')) {
        return next();
    };
    bcrypt.genSalt(10, (err, salt) => {
        bycrpt.hash(user.password, salt, (err, hash) => {
            user.password = hash;
            next();
        });
    });
});

// bcrypt compare the sting literal to the encrypted value in the DB
// =============================================================================

renterSchema.methods.comparePassword = function(password, done) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        done(err, isMatch);
    });
};

module.exports = mongoose.model('Renter', renterSchema);
