import { Photo } from "./photo";

export interface Member {
    id: number;
    username: string;
    photoUrl: string;
    age: number;
    created: Date;
    gender: string;
    lookingFor: string;
    photos: Photo[];
}