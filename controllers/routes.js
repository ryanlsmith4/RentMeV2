// Init Express in this application

const express = require('express');
const app = express();
const router = express.Router();

// Routes
// =============================================================================

    // Index Route
    router.get('/', (req, res) => {
        res.send({
            message: 'Housing index page'
        });
    });

module.exports = router;
