import { Vehicle, INewVehicle, IUpdateVehicle } from "./vehicle.model";
import { IsNumber, IsString, RequiredProperty, ObjectValidatorUtils, Container, IsArray, IsBoolean, IsObject, IConfiguration } from "@plugdata/core";
import { isNumber, isBoolean, isObject } from "util";
import { IWebConfiguration } from "@plugdata/web";

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



interface IPlugsConfiguration {
	holidayHotels: {
		endpoint: string;
		user: string;
		password: string;
	};
	myRentacar: {
		endpoint: string;
		token: string;
	};
	worldAirlines: {
		endpoint: string;
		user: string;
		password: string;
	};
	bestTours: {
		endpoint: string;
		user: string;
		password: string;
	};
};

const logCfg: IConfiguration<IPlugsConfiguration>['log'] = {
	timestamp: true,
	base: {
		hostId: 'ovh2301'
	},
	enabled: true,
	level: 'debug',
	prettyPrint: false,
	useLevelLabels: false,
	messageKey: 'msg',
	changeLevelName: 'level',
	redact: ['email', 'user.password', 'user.email', '[*].email']
};
const webCfg: IWebConfiguration['web'] = {
	oas: {
		basePath: '/api',
		consumes: ['application/json'],
		host: 'vps5662933',
		produces: ['application/json'],
		tags: [{
			name: 'tours',
			description: 'Tour methods'
		}, {
			name: 'reservations',
			description: 'Reservations methods'
		}],
		servers: [{
			url: 'vps5662933',
			description: 'Tours and reservations server',
			variables: {},
			addVariable: () => { }
		}]
	},
	server: {
		port: 3000,
		host: 'vps5662933',
		ipv6Only: false,
		path: '/api',
		exclusive: false
	}
};
const customCfg: IConfiguration<IPlugsConfiguration>['custom'] = {
	holidayHotels: {
		endpoint: 'https://126.160.134.114/api/rooms',
		user: 'ssXIASgiOM',
		password: '!bdQ6&cbt3sJ'
	},
	myRentacar: {
		endpoint: 'https://205.195.7.24/ws/cars',
		token: '66dadeb2-ffba-47ca-8b5f-9cc0dc69b76e'
	},
	worldAirlines: {
		endpoint: 'https://209.54.149.93/c/api',
		user: 'RKIdUyeeaC',
		password: 'Cf%B2xp#5DVi'
	},
	bestTours: {
		endpoint: 'https://202.100.28.13/tours',
		user: 'hfqaVCUNTa',
		password: 'E#p%KQo*cDs%'
	}
};



export class DailyStatsSelectedReport {

	@IsBoolean()
	@RequiredProperty()
	sendSearches: boolean;


	@IsBoolean()
	@RequiredProperty()
	sendPurchaes: boolean;


	@IsBoolean()
	@RequiredProperty()
	sendCancelations: boolean;


	@IsBoolean()
	@RequiredProperty()
	sendViews: boolean;


	@IsBoolean()
	@RequiredProperty()
	sendErrors: boolean;

}

export class SelectedUsersForMail {
	@IsArray({
		items: {
			title: 'users',
			type: 'array',
			items: {
				type: 'number'
			}
		},
		uniqueItems: true
	})
	@RequiredProperty()
	users: number[]
}


export class FindToursParams {
	@IsString()
	@RequiredProperty()
	city: string;
	@IsNumber()
	@RequiredProperty()
	date: number;
}

export class FindFlightsParams {
	@IsString()
	@RequiredProperty()
	departure: string;
	@IsString()
	@RequiredProperty()
	arrival: string;
	@IsNumber()
	@RequiredProperty()
	date: number
}

export class FindHotelRoomsParams {
	@IsString()
	@RequiredProperty()
	city: string;
	@IsNumber()
	@RequiredProperty()
	date: number;
	@IsNumber()
	@RequiredProperty()
	numberOfNights: number;
}

export class FindVehiclesParams {
	@IsString()
	@RequiredProperty()
	city: string;
	@IsNumber()
	@RequiredProperty()
	date: number;
	@IsNumber()
	@RequiredProperty()
	numberOfDays: number;
}

export class TourPurchase {
	@IsString()
	@RequiredProperty()
	tourId: string;
	@IsNumber()
	@RequiredProperty()
	userSharedId: number;
}
export class FlightPurchase {
	@IsString()
	@RequiredProperty()
	flightId: string;
	@IsNumber()
	@RequiredProperty()
	userSharedId: number;
}
export class HotelRoomPurchase {
	@IsString()
	@RequiredProperty()
	hotelRoomId: string;
	@IsNumber()
	@RequiredProperty()
	userSharedId: number;
}
export class VehiclePurchase {
	@IsString()
	@RequiredProperty()
	tourId: string;
	@IsNumber()
	@RequiredProperty()
	userSharedId: number;
}

export class TourCancelation {
	@IsString()
	@RequiredProperty()
	tourId: string;
}
export class FlightCancelation {
	@IsString()
	@RequiredProperty()
	flightId: string;
}
export class HotelRoomCancelation {
	@IsString()
	@RequiredProperty()
	hotelRoomId: string;
}
export class VehicleCancelation {
	@IsString()
	@RequiredProperty()
	tourId: string;
}


console.log({
	FindFutureToursInCityUrlParameters: JSON.stringify(ObjectValidatorUtils.generateJsonSchema(FindFutureToursInCityUrlParameters)),
	Tour: JSON.stringify(ObjectValidatorUtils.generateJsonSchema(Tour)),
	FindRelatedProductsUrlParameters: JSON.stringify(ObjectValidatorUtils.generateJsonSchema(FindRelatedProductsUrlParameters)),
	TourRelatedProducts: JSON.stringify(ObjectValidatorUtils.generateJsonSchema(TourRelatedProducts)),
	ReservationReferences: JSON.stringify(ObjectValidatorUtils.generateJsonSchema(ReservationReferences)),
	FindUserReservationsUrlParameters: JSON.stringify(ObjectValidatorUtils.generateJsonSchema(FindUserReservationsUrlParameters)),
	Reservation: JSON.stringify(ObjectValidatorUtils.generateJsonSchema(Reservation))
});