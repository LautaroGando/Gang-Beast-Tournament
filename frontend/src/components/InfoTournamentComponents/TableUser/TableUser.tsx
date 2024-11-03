import React, { useEffect, useState } from "react";
import { IPropsTableUser } from "./types";
import { IUser } from "@/context/UserContext/types";
import { useUser } from "@/context/UserContext/UserContext";
import { fetchAddPoints } from "@/services/fetchAddPoints";
import { fetchRemovePoints } from "@/services/fetchRemovePoints";
import { ITournament } from "@/components/AdminTournamentComponents/TournamentList/types";

export const TableUser: React.FC<IPropsTableUser<IUser>> = ({ users, tournamentId }: IPropsTableUser<IUser>): React.ReactElement => {

    const { user } = useUser();
    const [sortedUsers, setSortedUsers] = useState<IUser[]>([]);

    const getTournamentPoints = (userData: IUser) => {

        const tournament = userData.tournaments.find((tournament: ITournament) => tournament.tournamentId === tournamentId);

        return tournament ? tournament.points || 0 : 0;

    };

    const sortUsersByPoints = (userList: IUser[]) => {

        return [...userList].sort((a, b) => getTournamentPoints(b) - getTournamentPoints(a));

    };

    useEffect(() => {

        setSortedUsers(sortUsersByPoints(users));

    }, [users, user, tournamentId]);

    const handleAddPoints = async (userId: number, points = 1) => {

        const data = await fetchAddPoints(userId, tournamentId, points);

        if (data.error) return;

        setSortedUsers(prevUsers =>
            prevUsers
                .map((user: IUser) => {
                    if (user.id === userId) {
                        return {
                            ...user,
                            tournaments: user.tournaments.map((tournament: ITournament) =>
                                tournament.tournamentId === tournamentId
                                    ? { ...tournament, points: (tournament.points || 0) + points }
                                    : tournament
                            ),
                        };
                    }
                    return user;
                })
                .sort((a, b) => getTournamentPoints(b) - getTournamentPoints(a))
        );

    };

    const handleRemovePoints = async (userId: number, points = 1) => {

        const data = await fetchRemovePoints(userId, tournamentId, points);

        if (data.error) return;

        setSortedUsers(prevUsers =>
            prevUsers
                .map((user: IUser) => {
                    if (user.id === userId) {
                        return {
                            ...user,
                            tournaments: user.tournaments.map((tournament: ITournament) =>
                                tournament.tournamentId === tournamentId
                                    ? { ...tournament, points: (tournament.points || 0) - points }
                                    : tournament
                            ),
                        };
                    }
                    return user;
                })
                .sort((a, b) => getTournamentPoints(b) - getTournamentPoints(a))
        );

    };

    return (

        <div className="flex font-rajdhani text-xl">
            <div className="w-full text-center">
                {
                    sortedUsers.length > 0 ? (
                        sortedUsers.map((userData: IUser, i) => (
                            <div className={`h-[50px] relative flex items-center justify-center ${i === 0 ? 'bg-green text-white font-bold' : i === sortedUsers.length - 1 ? 'bg-red text-white rounded-bl-xl rounded-br-xl' : 'bg-yellow'}`} key={userData.id}>
                                <h2 className="w-full">{i + 1}</h2>
                                <h2 className="w-full">{userData.name}</h2>
                                <h2 className="w-full">{getTournamentPoints(userData)}</h2>
                                {
                                    user?.role === 'admin' ? (
                                        <div className="absolute left-full flex">
                                            <button onClick={(() => handleAddPoints(userData.id))} className="bg-blue text-white w-[30px] h-[30px] ml-1 font-dynapuff text-xl transition-all hover:bg-[#0876dd]">+</button>
                                            <button onClick={(() => handleRemovePoints(userData.id))} className="bg-red text-white w-[30px] h-[30px] ml-1 font-dynapuff text-xl transition-all hover:bg-[#ff5d48]">-</button>
                                        </div>
                                    ) : null
                                }
                            </div>
                        ))
                    ) : (
                        <p className="mt-5">No se encontró ningún participante.</p>
                    )
                }
            </div>
        </div>

    );

};

export default TableUser;