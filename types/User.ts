export default interface User {
	id: string;
	role: "ADMIN" | "DRIVER" | "COMMUTER";
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	phoneNumber: string;
    neighborhoods?: number[]
}
