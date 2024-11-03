const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchUsers = async () => {

    try {
        
        const response = await fetch(`${API_URL}/users`);

        const data = await response.json();

        return data;

    } catch (error) {
      
        console.log(error);

    };

};