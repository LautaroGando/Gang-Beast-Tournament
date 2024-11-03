import BackToTop from "@/components/GeneralComponents/BackToTop/BackToTop";
import TournamentInformation from "@/components/HomeComponents/TournamentInformation/TournamentInformation";
import { renderStages, stages } from "@/components/HomeComponents/TournamentInformation/utils";
import TournamentInscription from "@/components/HomeComponents/TournamentInscription/TournamentInscription";
import React from "react";

export const Home: React.FC = (): React.ReactElement => {

  return (

    <div>
      <TournamentInformation stages={stages} renderStages={renderStages} />
      <TournamentInscription />
      <BackToTop />
    </div>

  )

};

export default Home;