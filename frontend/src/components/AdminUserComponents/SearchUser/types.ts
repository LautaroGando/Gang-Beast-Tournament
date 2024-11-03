import { ChangeEvent } from "react";

export interface IPropsSearchUser {
    handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
};