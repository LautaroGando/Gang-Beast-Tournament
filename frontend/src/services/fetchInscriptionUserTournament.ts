import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchInscriptionUserTournament = async (userId: number, tournamentId: number) => {

    try {

        const response = await fetch(`${API_URL}/users/inscription`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userId, tournamentId}),
        });

        const data = await response.json();

        if (data.error) {
    
            return Swal.fire({
                title: `${data.error}`,
                icon: "error",
                timer: 1500,
                timerProgressBar: true,
                showConfirmButton: false,
            });

        };

        Swal.fire({
            title: "¡Te has inscripto exitósamente al torneo!",
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