import React from "react";
import { IPropsTournamentInformation, IStage } from "./types";

export const TournamentInformation: React.FC<IPropsTournamentInformation<IStage>> = ({ stages, renderStages }: IPropsTournamentInformation<IStage>): React.ReactElement => {

    return (

        <div>
            {
                stages.map((stage: IStage) => (
                    <div key={stage.id}>
                        {
                            renderStages(stage)
                        }
                    </div>
                ))
            }
        </div>

    );

};

export default TournamentInformation;