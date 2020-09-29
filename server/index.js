import fs from "fs";
import path from "path";
import express from "express";

import React from "react";
import ReactDOMServer from "react-dom/server";

import App from "../src/App";

const PORT = process.env.PORT || 5000;
const app = express();

app.get("/", (req, res) => {
    const app = ReactDOMServer.renderToString(<App />);

    const indexFile = path.resolve("./build/index.html");
    fs.readFile(indexFile, "utf8", (err, data) => {
        if(err) {
            console.log("Something went wrong: ", err);
            return res.status(500).send("Oops, better luck next time!");
        }
        console.log("success: ", data);
        return res.send(data.replace('<div id="root"></div>', `<div id='root'>${app}</div>`));
    });
});

app.use(express.static("./build"));

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: `, PORT);
});