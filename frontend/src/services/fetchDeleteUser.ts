import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchDeleteUser = async (id: number, refresh: boolean, setRefresh: (refresh: boolean) => void) => {

    try {

        Swal.fire({
            title: "¿Seguro desea eliminar el usuario?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Sí, eliminar usuario!",
            cancelButtonText: "¡No!"
        }).then(async (result) => {

            if (result.isDismissed) return;

            const response = await fetch(`${API_URL}/users/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
    
            const data = await response.json();
    
            if (data.error) {
    
                return Swal.fire({
                    title: "¡Error al eliminar el usuario!",
                    text: `${data.error}`,
                    icon: "error",
                    timer: 1500,
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
    
            };
    
            Swal.fire({
                title: "Usuario eliminado con éxito!",
                icon: "success",
                timer: 1500,
                timerProgressBar: true,
                showConfirmButton: false,
            });

            setRefresh(!refresh);
    
            return data;

        });
        
    } catch (error) {
      
        console.log(error);

    };

};