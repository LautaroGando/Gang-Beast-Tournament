import { IUserRegister } from "@/helpers/validateRegister";
import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchRegisterUser = async (userData: IUserRegister) => {

    try {

        const response = await fetch(`${API_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (data.error) {

            return Swal.fire({
                title: "¡Error al registrarse!",
                text: `${data.error}`,
                icon: "error",
                timer: 1500,
                timerProgressBar: true,
                showConfirmButton: false,
            });

        };

        Swal.fire({
            title: "¡Usuario registrado con éxito!",
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