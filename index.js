const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");

let server;

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Create Mongo connection and get the express app to listen on config.port

mongoose
    .connect(config.mongoose.url, {
        autoIndex: false,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    });

app.listen(config.port, () => {
    console.log("Server running on port: ", config.port);
});
