const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchRemovePoints = async (userId: number, tournamentId: number, points: number) => {

    try {

        const response = await fetch(`${API_URL}/users/removePoints`, {
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