export interface MoneyHash {
    amount: number;
    currency: string;
}

export interface Bounty {
    id: string; // private id
    missionObjective: string; // objective
    chainCode: number; // public id
    credits: number; // in-app coins earned
    class: string; // difficulty or rank requirements
    reward: MoneyHash; // reward in tradeable currency
}