export default interface User {
    id: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    email: string;
}

export enum UserRole {
    Admin = "ADMIN",
    Driver = "DRIVER",
    Commuter = "COMMUTER",
}