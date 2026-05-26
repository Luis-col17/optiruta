import axiosConfig from "../api/axios.config";

export const crearEntrega = async (entrega) => {
  const response = await axiosConfig.post("/entregas", entrega);
  return response.data;
};