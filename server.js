const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "htttp://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./my-disney-api/models");
const Role = db.role;

db.sequelize.sync();

app.get("/", (req, res) => {
    res.json({ message: "Express API is Ready" });
});

require('./my-disney-api/routes/auth.routes')(app);
require('./my-disney-api/routes/user.routes')(app);
require('./my-disney-api/routes/property.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

function initial() {
    /*Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id:2,
        name:"admin"
    });*/
}