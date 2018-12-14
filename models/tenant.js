// bcrypt is the node module used to encrypt the password

const bcrypt = require('bcrypt');

// hook up to MongoDB
// ==============================================================================

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// set mongoose { useNewUrlParser: true } to avoid deprecation warnings
mongoose.set('useNewUrlParser', true);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/RentMe');

// Define renter Schema
// =============================================================================

var tenantSchema = new mongoose.Schema({
    // Schema Properties
    createdAt        : { type: Date                    },
    updatedAt        : { type: Date                    },
    email            : { type: String, required: true  },
    password         : { type: String, required: true  },
    firstName        : { type: String,  required: true },
    lastName         : { type: String,  required: true },
    kids             : { type: Boolean, required: true },
    references       : [{type: String                  }]
});

// MONGOOSE HOOKS for createdAt and updateAt  also encrypt the pass
// also salt, and hash the passwor
// =============================================================================

tenantSchema.pre('save', function(next) {
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

tenantSchema.methods.comparePassword = function(password, done) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        done(err, isMatch);
    });
};

module.exports = mongoose.model('Tenant', tenantSchema);
