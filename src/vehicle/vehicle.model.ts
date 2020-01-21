
export class Vehicle {
	public id: string;
	public model: string;
	public year: number;
}

// The new vehicle object has all the fields but the id,
// since a new one will be created each time
export interface INewVehicle extends Omit<Vehicle, 'id'> { }

// The update vehicle interface has all it's fields as optional
// The id must come as a requerd parameter
export interface IUpdateVehicle extends Partial<Omit<Vehicle, 'id'>> { }
