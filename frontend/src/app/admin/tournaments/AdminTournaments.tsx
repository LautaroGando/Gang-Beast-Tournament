"use client";

import ButtonCreateTournament from '@/components/AdminTournamentComponents/ButtonCreateTournament/ButtonCreateTournament';
import ModalCreateTournament from '@/components/AdminTournamentComponents/ModalCreateTournament/ModalCreateTournament';
import TournamentList from '@/components/AdminTournamentComponents/TournamentList/TournamentList';
import React, { useState } from 'react';

export const AdminTournaments: React.FC = (): React.ReactElement => {

    const [modal, setModal] = useState<boolean>(false);
    const [refresh, setRefresh] = useState<boolean>(false);

    const handleOpenModal = () => {

        setModal(true);

    };

    const handleCloseModal = () => {

        setModal(false);
        setRefresh(!refresh);

    };

    return (

        <div className='w-full p-10 min-h-[calc(100dvh-120px)] flex flex-col gap-10'>
            <h1 className='font-dynapuff text-5xl'>Administrar torneos</h1>
            <ButtonCreateTournament handleOpenModal={handleOpenModal} />
            <ModalCreateTournament modal={modal} handleCloseModal={handleCloseModal} />
            <TournamentList refresh={refresh} setRefresh={setRefresh} />
        </div>

    );

}

export default AdminTournaments;