import { Vehicle, INewVehicle, IUpdateVehicle } from "./vehicle.model";
import { IsNumber, IsString, RequiredProperty, ObjectValidatorUtils, Container, IsArray, IsBoolean, IsObject } from "@plugdata/core";
import { isNumber, isBoolean, isObject } from "util";

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


////////////////


/* reservation
reservation-log
plugcore-log
plugcore-user
plugcore-rol
plugcore-api-token
plugcore-api-log
holidayhotels-hotelroom
myrentacar-car
worldairlines-fight
besttours-tour */

export class PriceInCurrencies {
	@IsString()
	@RequiredProperty()
	price: number;

	@IsNumber()
	@RequiredProperty()
	currency: string;
}

export class LabelTranslation {
	@IsString()
	@RequiredProperty()
	language: string;
	@IsString()
	@RequiredProperty()
	value: string;
}

export class PlugCoreLog {
	@IsString()
	@RequiredProperty()
	id: string;
	@IsString()
	@RequiredProperty()
	name: string;
	@IsString()
	@RequiredProperty()
	level: string;
	@IsNumber()
	@RequiredProperty()
	time: number;
	@IsNumber()
	@RequiredProperty()
	pid: number;
	@IsString()
	@RequiredProperty()
	hostname: string;
	@IsString()
	@RequiredProperty()
	v: string;
	@IsString()
	@RequiredProperty()
	msg: string;
}

export class PlugCoreUser {

	@IsString()
	@RequiredProperty()
	id: string;

	@IsString()
	@RequiredProperty()
	name: string;
	
	@IsString()
	@RequiredProperty()
	passwordHash: string;

	
	@IsString()
	@RequiredProperty()
	email: string;

	@IsNumber()
	@RequiredProperty()
	lastLogin: number;

	@IsArray({
		items: {
			title: 'availablePaths',
			type: 'array',
			items: {
				type: 'string'
			}
		},
		uniqueItems: true
	})
	@RequiredProperty()
	roles: string[];


}

export class PlugCoreRol {

	@IsString()
	@RequiredProperty()
	id: string;

	@IsString()
	@RequiredProperty()
	name: string;

	@IsArray({
		items: ObjectValidatorUtils.generateJsonSchema(LabelTranslation),
		minItems: 1,
		uniqueItems: true
	})
	@RequiredProperty()
	translatedLabel: LabelTranslation[];

	@IsArray({
		items: {
			title: 'availablePaths',
			type: 'array',
			items: {
				type: 'string'
			}
		},
		uniqueItems: true
	})
	availableActions?: string[];

	@IsBoolean()
	@RequiredProperty()
	isAdmin: boolean;


}
export class PlugCoreApiToken {

	@IsString()
	@RequiredProperty()
	token: string;

	@IsArray({
		items: {
			title: 'availablePaths',
			type: 'array',
			items: {
				type: 'string'
			}
		},
		uniqueItems: true
	})
	availablePaths?: string[];

	@IsBoolean()
	@RequiredProperty()
	allPathsAvailable: boolean;

	@IsNumber()
	@RequiredProperty()
	validityStart: number;

	@IsNumber()
	@RequiredProperty()
	validityEnd: number;

}

export class PlugCoreApiLog {

	@IsString()
	@RequiredProperty()
	id: string;

	@IsNumber()
	@RequiredProperty()
	date: number;

	@IsString()
	@RequiredProperty()
	path: string;

	@IsString()
	@RequiredProperty()
	httpMethod: string;

	@IsString()
	@RequiredProperty()
	apiToken: string;

	@IsNumber()
	@RequiredProperty()
	callDuration: number;

}

export class HotelRoom {

	@IsString()
	@RequiredProperty()
	id: string;
	@IsString()
	@RequiredProperty()
	hotel: string;
	@IsString({
		pattern: 'big|small'
	})
	@RequiredProperty()
	roomType: 'big' | 'small';

	@IsNumber()
	@RequiredProperty()
	checkInDate: number;

	@IsNumber()
	@RequiredProperty()
	checkOutDate: number;

	@IsArray({
		items: ObjectValidatorUtils.generateJsonSchema(PriceInCurrencies),
		minItems: 1,
		uniqueItems: true
	})
	@RequiredProperty()
	price: PriceInCurrencies[]

}

export class Car {

	@IsString()
	@RequiredProperty()
	id: string;

	@IsString()
	@RequiredProperty()
	brand: string;

	@IsString()
	@RequiredProperty()
	model: string;

	
	@IsArray({
		items: ObjectValidatorUtils.generateJsonSchema(PriceInCurrencies),
		minItems: 1,
		uniqueItems: true
	})
	@RequiredProperty()
	price: PriceInCurrencies[]

	@IsNumber()
	@RequiredProperty()
	pickupDate: number;

	@IsNumber()
	@RequiredProperty()
	dropDate: number

}

export class Flight {

	@IsString()
	@RequiredProperty()
	id: string;
	@IsString()
	@RequiredProperty()
	departureAirport: string;
	@IsString()
	@RequiredProperty()
	arrivalAirport: string;
	@IsNumber()
	@RequiredProperty()
	departureDate: number;
	@IsNumber()
	@RequiredProperty()
	arrivalDate: number;
	@IsArray({
		items: ObjectValidatorUtils.generateJsonSchema(PriceInCurrencies),
		minItems: 1,
		uniqueItems: true
	})
	@RequiredProperty()
	price: PriceInCurrencies[]
}

export class FindFutureToursInCityUrlParameters {
	
	@IsString()
	@RequiredProperty()
	cityId: string;

}


export class FindRelatedProductsUrlParameters {
	
	@IsString()
	@RequiredProperty()
	tourId: string;

}
export class FindUserReservationsUrlParameters {
	
	@IsString()
	@RequiredProperty()
	userId: string;

}

export class Tour {
	
	@IsString()
	@RequiredProperty()
	id: string;

	@IsString()
	@RequiredProperty()
	name: string;
	
	@IsString()
	@RequiredProperty()
	description: string;
	
	@IsString()
	@RequiredProperty()
	longDescription: string;

	@IsString()
	@RequiredProperty()
	imageUrl: string;

	@IsArray({
		items: ObjectValidatorUtils.generateJsonSchema(PriceInCurrencies),
		minItems: 1,
		uniqueItems: true
	})
	@RequiredProperty()
	price: PriceInCurrencies[]

}

export class ReservationFlights {
	@IsObject(Flight)
	departingFlight: Flight;
	@IsObject(Flight)
	returningFlight: Flight
}

export class ReservationFlightsReferences {
	
	@IsString()
	@RequiredProperty()
	departingFlight: string;
	
	@IsString()
	@RequiredProperty()
	returningFlight: string;

}

export class ReservationReferences {

	@IsString()
	@RequiredProperty()
	userId: string;

	@IsString()
	@RequiredProperty()
	tourId: string;

	@IsString()
	@RequiredProperty()
	hotelRoomId: string;

	@IsObject(ReservationFlightsReferences)
	@RequiredProperty()
	flights: ReservationFlightsReferences;

	@IsString()
	@RequiredProperty()
	vehicleId?: Vehicle

}

export class Reservation {
	
	@IsString()
	@RequiredProperty()
	id: string;

	@IsString()
	@RequiredProperty()
	userId: string;

	@IsObject(HotelRoom)
	@RequiredProperty()
	hotel: HotelRoom;

	@IsObject(ReservationFlights)
	@RequiredProperty()
	flights: ReservationFlights;

	@IsObject(Vehicle)
	vehicle?: Vehicle

}

export class ReservationLog {

	@IsString()
	@RequiredProperty()
	id: string;

	@IsNumber()
	@RequiredProperty()
	date: number;

	@IsString()
	@RequiredProperty()
	userLocation: string;

	@IsString()
	@RequiredProperty()
	searchedCity: string;

	@IsBoolean()
	@RequiredProperty()
	purchased: boolean;

}

export class TourRelatedProducts {
	
	
	@IsArray({
		items: ObjectValidatorUtils.generateJsonSchema(Flight),
		minItems: 1,
		uniqueItems: true
	})
	@RequiredProperty()
	departingFlights: Flight;

	@IsArray({
		items: ObjectValidatorUtils.generateJsonSchema(Flight),
		minItems: 1,
		uniqueItems: true
	})
	@RequiredProperty()
	returningFlights: Flight

	@IsArray({
		items: ObjectValidatorUtils.generateJsonSchema(VehicleModel),
		minItems: 1,
		uniqueItems: true
	})
	@RequiredProperty()
	vehicles: VehicleModel

	@IsArray({
		items: ObjectValidatorUtils.generateJsonSchema(HotelRoom),
		minItems: 1,
		uniqueItems: true
	})
	@RequiredProperty()
	hotelRooms: HotelRoom;
}
/* 
console.log(JSON.stringify(ObjectValidatorUtils.generateJsonSchema(Reservation)));
 */