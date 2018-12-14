const debug = true;
// Base SETUP
// =============================================================================
// Init Express in this application

const express = require('express');
const app = express();
const port = 1337;

// Instanciate our Router
const router = express.Router();

// Middleware
// =============================================================================

if( debug == true ) {

    router.use((req, res, next) => {
        console.log(req.method, req.url);

        next();
    });
};

// Routes

const routes = require('./controllers/routes');
// =============================================================================

// Have app use routes controller
app.use('/listings', routes);
// Have the express object use the router

// START THE SERVER
// =============================================================================

app.listen(port, () => {
    console.log("RentMe is running on " + port);
});
