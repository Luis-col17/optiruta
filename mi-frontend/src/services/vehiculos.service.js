import axiosConfig from "../api/axios.config";

export const crearVehiculo = async (vehiculo) => {
  const response = await axiosConfig.post("/vehiculos", vehiculo);
  return response.data;
};