export default interface Commute {
    id: number;
    destination: string;
    origin: string;
    commuterName: string;
    driverName: string
    price: number;
    requestTime: string;
    status: string;
    score: number;
}

export interface CommuteRequest {
	destinationNeighborhoodId?: number;
	destinationDetails?: string;
	destinationId?: number;
	originNeighborhoodId?: number;
    originDetails?: string;
    originId?: number;
    price: number | "";
}

