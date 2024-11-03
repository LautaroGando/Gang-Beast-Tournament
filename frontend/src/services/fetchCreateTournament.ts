import { ICreateTournament } from "@/helpers/validateCreateTournament";
import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchCreateTournament = async (tournamentData: ICreateTournament) => {

    try {

        const response = await fetch(`${API_URL}/tournaments/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tournamentData),
        });

        const data = await response.json();

        if (data.error) {

            return Swal.fire({
                title: "¡Error al crear el torneo!",
                text: `${data.error}`,
                icon: "error",
                timer: 1500,
                timerProgressBar: true,
                showConfirmButton: false,
            });

        };

        Swal.fire({
            title: "¡Torneo creado con éxito!",
            icon: "success",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
        });

        return data;
        
    } catch (error) {
      
        console.log(error);

    };

};