import React from "react";
import { IPropsSearchUser } from "./types";

export const SearchUser: React.FC<IPropsSearchUser> = ({ handleSearch }: IPropsSearchUser): React.ReactElement => {

    return <input onChange={handleSearch} className="h-[50px] p-3 font-rajdhani font-bold text-xl outline-none border-b-[3px] transition-all focus:border-red" type="search" name="searchUser" id="searchUser" placeholder="Buscar usuario..." />;

};

export default SearchUser;