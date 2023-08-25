const express = require('express')
const cors = require('cors')
const DBConnection = require("./db");
const app = express();

DBConnection();

app.use(express.json());
app.use(cors())
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.use("/api", require("./Router/CreateUser"));
app.use("/api", require("./Router/DisplayData"));
app.use("/api", require("./Router/OrderData"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));



// app.use((res, req, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"),
//         res.header(
//             "Access-Control-Allow-Headers",
//             "Origin, X-Requested-With, Content-Type, Accespted",
//             next()
//         )
// })
//important for ettin request from backend ,server at 'http://localhost:5000' is not including the necessary CORS headers in its response

