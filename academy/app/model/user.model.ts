export interface User {
    _id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    image?: string;
    NewsLettersSubscription?: boolean;
    role?: 'Admin' | 'Tutor' | 'Student';
    createdAt?: string;
    updatedAt?: string;
}
