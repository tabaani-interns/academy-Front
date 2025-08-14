import {User} from "@/app/models/user.model";

export interface Course {
    _id?: string;
    courseTitle?: string;
    subtitle?: string;
    description?: string;
    image?: string;
    level?: 'Beginner' | 'Average' | 'Advanced';
    features?:[string];
    owner?: User;
    category?:string
    rating?:number;
    price?:number;
    modules?:number;
    hours?:number;
    students?:number;
    lessons?:number;
    createdAt?: string;
    updatedAt?: string;
}
