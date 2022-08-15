const express = require('express')
const bodyParser = require("body-parser")
const app = express()
require('dotenv').config()
const port = process.env.PORT;
const {checkKeys} = require("./configurations/configuration");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const router = require('./routers/query.route');
checkKeys();

// Using swagger for api document
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//To parse URL encoded data
app.use(bodyParser.urlencoded({ extended: false }))

//To parse json data
app.use(bodyParser.json())

app.use('/api', router);
  
app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})

module.exports = {
    app
}