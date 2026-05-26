const db = require("../src/config/db");

const COORDENADAS_BARRIOS = require("../src/config/barrios");

const {geocodificar} = require("../src/services/geocoding.service");


// PAUSA PARA RESPETAR NOMINATIM
function esperar(ms) {

    return new Promise(resolve =>
        setTimeout(resolve, ms)
    );
}


async function geocodificarEntregas() {

    try {

        console.log(
            "🗺️ Geocodificando entregas...\n"
        );

        // OBTENER ENTREGAS SIN COORDENADAS
        const [entregas] = await db.query(`
            SELECT *
            FROM entregas
            WHERE lat IS NULL
            OR lng IS NULL
        `);

        console.log(
            `📦 Entregas encontradas: ${entregas.length}\n`
        );

        for (const entrega of entregas) {

            const direccionCompleta = `
                ${entrega.direccion},
                ${entrega.barrio},
                Ibagué,
                Tolima,
                Colombia
            `;

            console.log(
                `📍 Geocodificando: ${direccionCompleta}`
            );
            
            // GEOCODIFICAR
            let coords =
                await geocodificar(
                    direccionCompleta
                );


            // FALLBACK SI FALLA LA DIRECCIÓN
            if (!coords) {

                console.log(
                    "⚠️ Dirección no encontrada"
                );

                console.log(
                    "📍 Usando coordenadas del barrio"
                );

                const barrioCoords =
                    COORDENADAS_BARRIOS[
                        entrega.barrio
                    ];

                // SI EL BARRIO TAMPOCO EXISTE
                if (!barrioCoords) {

                    console.log(
                        "❌ Barrio no encontrado\n"
                    );

                    continue;
                }

                coords = {
                    lat: barrioCoords.lat,
                    lng: barrioCoords.lng
                };
            }

            // ACTUALIZAR MYSQL
            await db.query(
                `
                UPDATE entregas
                SET lat = ?, lng = ?
                WHERE id_entrega = ?
                `,
                [
                    coords.lat,
                    coords.lng,
                    entrega.id_entrega
                ]
            );

            console.log(
                `✅ Actualizada ID ${entrega.id_entrega}`
            );

            console.log(
                `LAT: ${coords.lat}`
            );

            console.log(
                `LNG: ${coords.lng}\n`
            );

            // ESPERAR
            await esperar(1200);
        }

        console.log(
            "\n🎉 Geocodificación finalizada"
        );

    } catch (error) {

        console.log(error);

    }
}


geocodificarEntregas();