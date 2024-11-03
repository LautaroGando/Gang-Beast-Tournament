const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchAddPoints = async (userId: number, tournamentId: number, points: number) => {

    try {

        const response = await fetch(`${API_URL}/users/addPoints`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, tournamentId, points }),
        });

        const data = await response.json();

        return data;

    } catch (error) {

        console.log(error);

    };

};