const express = require("express");
const app = express();
app.use(express.json());

//rutas
const rutasRoutes = require("./routes/rutas.routes");
app.use("/api", rutasRoutes);

module.exports = app;