const express = require("express");
const app = express();
const path = require("path");
const requests = require("requests")

app.set("view engine", "hbs");
app.get("/", (req, res) => {
    requests("https://api.openweathermap.org/data/2.5/weather?q=Hyderabad&appid=32ae0e636312b2e2294c10907dc51faf")
        .on("data", (chunk) => {
            const arrData = [JSON.parse(chunk)];

            const temp = arrData[0].main.temp;
            const minTemp = arrData[0].main.temp_min;
            const maxTemp = arrData[0].main.temp_max;
            const place = arrData[0].name;
            const country2 = arrData[0].sys.country;
            const weather2 = arrData[0].weather[0].main;
            console.log(temp)
            console.log(minTemp)
            console.log(maxTemp)
            console.log(place)
            console.log(country2)
            console.log(weather2)


            realTemp = temp - 273;
            realMinTemp = minTemp - 273;
            realMaxTemp = maxTemp - 273;
            console.log(realTemp.toFixed(1))
            console.log(realMinTemp.toFixed(1))
            console.log(realMaxTemp.toFixed(1))
            res.render("index", {
                Temperature: realTemp.toFixed(1),
                Temp_Min: realMinTemp.toFixed(1),
                Temp_Max: realMaxTemp.toFixed(1),
                Place: place,
                Country0: country2,
                tempStatus: weather2
            })
        })

})
// we can find the temperature of other city also by using query 
app.get("/about", (req, res) => {
    requests(`https://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&appid=32ae0e636312b2e2294c10907dc51faf`)
        .on("data", (chunk) => {
            const arrData = [JSON.parse(chunk)];

            const temp = arrData[0].main.temp;
            const place = arrData[0].name;
            realTemp = temp - 273;
            res.send(req.query.name)
            console.log(`the city name is ${req.query.name},${place} and the temperature is${realTemp.toFixed(1)}`)
        })
})
// app.get("*", (req, res) => {
//     res.status(404).send("404 Page Not Found")
// })
app.listen("8000", () => {
    console.log("server is running at 8000")
})