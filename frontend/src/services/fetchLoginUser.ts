import { IUserLogin } from "@/helpers/validateLogin";
import Swal from "sweetalert2";
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchLoginUser = async (userData: IUserLogin) => {

    try {

        const response = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (data.error) {

            return Swal.fire({
                title: "¡Error al iniciar sesión!",
                text: `${data.error}`,
                icon: "error",
                timer: 1500,
                timerProgressBar: true,
                showConfirmButton: false,
            });

        };

        localStorage.setItem('userData', JSON.stringify(data.user));
        Cookies.set('userData', JSON.stringify(data.user));

        Swal.fire({
            title: "¡Has iniciado sesión con éxito!",
            text: `¡Bienvenido, ${data.user.name}!`,
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