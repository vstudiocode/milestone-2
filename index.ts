import express from "express";
import ejs from "ejs";
import { Car } from "./interfaces/cars"

const app = express();

let vehicles: any;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("port", 3000);

app.get("/", (req, res) => {
    let filteredVehicles: Car[] = [...vehicles];

    if (req.query["q"] !== undefined) {
        const queryString = req.query["q"].toString().toLowerCase();
        filteredVehicles = filteredVehicles.filter(vehicle => vehicle.name.toLowerCase().includes(queryString));
    }

    if (req.query["s"] !== undefined) {
        const sortParam = req.query["s"].toString().toLowerCase();
        switch (sortParam) {
            case 'nameasc':
                filteredVehicles.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'namedesc':
                filteredVehicles.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'classasc':
                filteredVehicles.sort((a, b) => a.class.localeCompare(b.class));
                break;
            case 'classdesc':
                filteredVehicles.sort((a, b) => b.class.localeCompare(a.class));
                break;
            case 'playstyleasc':
                filteredVehicles.sort((a, b) => a.playstyle[0].localeCompare(b.playstyle[0]));
                break;
            case 'playstyledesc':
                filteredVehicles.sort((a, b) => b.playstyle[0].localeCompare(a.playstyle[0]));
                break;
            case 'playstylesasc':
                filteredVehicles.sort((a, b) => a.playstyle[1].localeCompare(b.playstyle[1]));
                break;
            case 'playstylesdesc':
                filteredVehicles.sort((a, b) => b.playstyle[1].localeCompare(a.playstyle[1]));
                break;
        }
    }

    res.render("index.ejs", { vehicles: filteredVehicles });
});



app.listen(app.get("port"), async () => {
    let dataFileOnline = "https://raw.githubusercontent.com/vstudiocode/milestone-2/main/data.json";
    let response = await fetch(dataFileOnline);
    let data: Car = await response.json();
    vehicles = data;
    // console.log(data);
    console.log("[server] http://localhost:" + app.get("port"))
});