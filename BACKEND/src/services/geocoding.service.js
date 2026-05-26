const axios = require("axios");

const geocodificar = async (direccion) => {

    try {

        const url = `https://nominatim.openstreetmap.org/search`;

        const response = await axios.get(url, {
            params: {
                q: direccion,
                format: "json",
                limit: 1
            },
            headers: {
                "User-Agent": "optiruta-app"
            }
        });

        if (response.data.length === 0) {
            return null;
        }

        return {
            lat: response.data[0].lat,
            lng: response.data[0].lon
        };

    } catch (error) {
        console.log(error);
        return null;
    }

};

module.exports = {
    geocodificar
};