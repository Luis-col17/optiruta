import axiosConfig from "../api/axios.config";

export const obtenerRutasOptimizadas = async () => {
    const response = await axiosConfig.get("/rutas/optimizar");
    return response.data;
};