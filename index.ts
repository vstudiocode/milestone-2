import express from "express";
import ejs from "ejs";
import { Car } from "./interfaces/cars"

const app = express();

let vehicles: any;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("port", 3000);

app.get("/", (req, res) => {
    res.render("index.ejs", { vehicles: vehicles })
});

app.listen(app.get("port"), async () => {
    let dataFileOnline = "https://raw.githubusercontent.com/vstudiocode/milestone-2/main/data.json";
    let response = await fetch(dataFileOnline);
    let data: Car = await response.json();
    vehicles = data;
    console.log(data);
    console.log("[server] http://localhost:" + app.get("port"))
});