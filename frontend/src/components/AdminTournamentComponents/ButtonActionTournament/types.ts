export interface IPropsButtonActionTournament<Item> {
    tournament: Item;
    refresh: boolean;
    setRefresh: (refresh: boolean) => void;
};