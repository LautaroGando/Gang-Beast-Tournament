import React from "react";

export interface IStage {
    id: number;
    title: string;
    description: string;
    image: string;
};

export interface IPropsTournamentInformation<Item> {
    stages: Item[];
    renderStages: (stage: Item) => React.ReactNode;
};