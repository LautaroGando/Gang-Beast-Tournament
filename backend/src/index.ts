import { PORT } from "./config/envs";
import app from "./server";
import { AppDataSource } from "./config/data-source";
import { preloadAllData } from "./helpers/preloadData";

(async () => {

    await AppDataSource.initialize();

    console.log('Conectado a la base de datos exitósamente.');

    await preloadAllData();

    app.listen(PORT, () => {

        console.log(`Servidor corriendo en el puerto: ${PORT}.`);

    });

})();