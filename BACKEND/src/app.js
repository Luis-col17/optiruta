const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/exports",
  express.static(path.join(__dirname, "../exports"))
);

const entregaRoutes = require("./routes/entrega.routes");
app.use("/api/entregas", entregaRoutes);

const rutaRoutes = require("./routes/rutas.routes");
app.use("/api/rutas", rutaRoutes);

const vehiculosRoutes = require("./routes/vehiculos.routes");
app.use("/api/vehiculos", vehiculosRoutes);

app.get("/", (req, res) => {
  res.json({
    mensaje: "OPTIRUTA+ API corriendo",
  });
});

module.exports = app;