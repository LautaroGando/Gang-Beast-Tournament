const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchUserById = async (id: number) => {

    try {

        const response = await fetch(`${API_URL}/users/${id}`);

        const data = await response.json();

        return data;
        
    } catch (error) {
      
        console.log(error);

    };

};