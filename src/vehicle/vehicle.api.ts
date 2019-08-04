import { Vehicle, INewVehicle, IUpdateVehicle } from "./vehicle.model";
import { IsNumber, IsString, RequiredProperty } from "@plugdata/core";

// In this file we are going to define all the models that the vehicle
// api is going to use. We can have
// - Response: JSON response
// - Request body: For any method that is not GET
// - Query parameters, ex: ?param1=val1,param2=val2. All these parameters are converted to an object
// - URL parameters, ex: /vehicle/:id. Also converted to an object
// - Headers. Also converted to an object
// All these modes are decorated in order to give the proper OAS 3.0 documentation in
// http://localhost:3000/api-documentation.json
// And also are going to validate everything that is defined.
// Further more, these models are going to help us type all the methods.

export class VehicleModel implements Vehicle {
	@IsNumber()
	@RequiredProperty()
	public id: number;
	@IsString()
	@RequiredProperty()
	public model: string;
	@IsNumber()
	@RequiredProperty()
	public year: number;
}

export class NewVehicleModel implements INewVehicle {
	@IsString()
	@RequiredProperty()
	public model: string;
	@IsNumber()
	@RequiredProperty()
	public year: number;
}

// In this case we omit id sinces we will have it from the url
export class UpdateVehicleModel implements Omit<IUpdateVehicle, 'id'> {
	@IsString()
	public model?: string;
	@IsNumber()
	public year?: number;
}

export class VehicleId {
	@IsNumber()
	@RequiredProperty()
	public id: number;
}
