import { Controller, Get, Delete, Post } from '@plugdata/web';
import { Tour, TourRelatedProducts, FindFutureToursInCityUrlParameters, FindRelatedProductsUrlParameters, Reservation, FindUserReservationsUrlParameters, ReservationReferences, Flight, HotelRoom, FindToursParams, FindFlightsParams, FindHotelRoomsParams, FindVehiclesParams, VehicleCancelation, HotelRoomCancelation, FlightCancelation, TourCancelation, VehiclePurchase, HotelRoomPurchase, FlightPurchase, TourPurchase } from './vehicle.api';
import { Vehicle } from './vehicle.model';

/**
 * This class is an example of a controller with all REST operations
 * All methods generate documentation and have validations for inputs
 */
/* @Controller({ urlBase: '/tours' })
export class VehicleController {

	//
	// Public API
	//

	@Get('/find-future-tours-in-city/:cityId', {
		schema: <any>{
			tags: ['tours'],
			summary: 'Returns a list of future tours for a given city',
		},
		routeSchemas: {
			urlParameters: FindFutureToursInCityUrlParameters,
			response: { model: Tour, isArray: true }
		}
	})
	public async findFutureToursInCity() {
	}

	@Get('/find-related-products-for-tour/:tourId', {
		schema: <any>{
			tags: ['tours'],
			summary: 'Given a tour it tries to offer all related products',
		},
		routeSchemas: {
			urlParameters: FindRelatedProductsUrlParameters,
			response: TourRelatedProducts
		}
	})
	public async findRelateDproducts() {
	}

}


@Controller({ urlBase: '/reservations' })
export class ReservationsController {

	//
	// Public API
	//

	@Post('/', {
		schema: <any>{
			tags: ['reservations'],
			summary: 'Creates a new reservation composed of a tour and complement products',
		},
		routeSchemas: {
			request: ReservationReferences
		}
	})
	public async createReservation() {
	}

	@Get('/find-user-reservations/:userId', {
		schema: <any>{
			tags: ['reservations'],
			summary: 'Returns all the reservation the user made until now',
		},
		routeSchemas: {
			urlParameters: FindUserReservationsUrlParameters,
			response: { model: Reservation, isArray: true }
		}
	})
	public async findUserReservations() {
	}

	@Delete('/cancel-reservation/:reservationId', {
		schema: <any>{
			tags: ['reservations'],
			summary: 'Cancels a tour reservation and all the related products',
		},
		routeSchemas: {
			urlParameters: FindRelatedProductsUrlParameters
		}
	})
	public async cancelReservation() {
	}

}


@Controller({ urlBase: '/tours' })
export class VehicleController {

	//
	// Public API
	//

	@Get('/find-future-tours-in-city/:cityId', {
		schema: <any>{
			tags: ['tours'],
			summary: 'Returns a list of future tours for a given city',
		},
		routeSchemas: {
			urlParameters: FindFutureToursInCityUrlParameters,
			response: { model: Tour, isArray: true }
		}
	})
	public async findFutureToursInCity() {
	}

	@Get('/find-related-products-for-tour/:tourId', {
		schema: <any>{
			tags: ['tours'],
			summary: 'Given a tour it tries to offer all related products',
		},
		routeSchemas: {
			urlParameters: FindRelatedProductsUrlParameters,
			response: TourRelatedProducts
		}
	})
	public async findRelateDproducts() {
	}

} */


@Controller({ urlBase: '/plug' })
export class ReservationsController {

	//
	// Public API
	//


	@Get('/best-tours/find-tours-in-city/:cityId', {
		schema: <any>{
			tags: ['best-tours'],
			summary: 'Returns a list of the recomended tours in a city for a given date',
		},
		routeSchemas: {
			urlParameters: FindToursParams,
			response: { model: Tour, isArray: true }
		}
	})
	public async findUserReservations() {
	}

	@Post('/best-tours/purchase-tour', {
		schema: <any>{
			tags: ['best-tours'],
			summary: 'Makes the necessary arrengments for the purchase of the tour',
		},
		routeSchemas: {
			request: TourPurchase
		}
	})
	public async createReservation() {
	}

	@Delete('/best-tours/cancel-tour', {
		schema: <any>{
			tags: ['best-tours'],
			summary: 'Cancels a tour purchase',
		},
		routeSchemas: {
			request: TourCancelation
		}
	})
	public async cancelReservation() {
	}


	@Get('/world-airlines/find-flights', {
		schema: <any>{
			tags: ['world-airlines'],
			summary: 'Returns a list of the cheapest flights for the given route and date',
		},
		routeSchemas: {
			urlParameters: FindFlightsParams,
			response: { model: Flight, isArray: true }
		}
	})
	public async findUserReservations1() {
	}

	@Post('/world-airlines/book-flight', {
		schema: <any>{
			tags: ['world-airlines'],
			summary: 'Makes the purchase of the flgiht againse the corresponding company',
		},
		routeSchemas: {
			request: FlightPurchase
		}
	})
	public async createReservation1() {
	}

	@Delete('/world-airlines/cancel-flight', {
		schema: <any>{
			tags: ['world-airlines'],
			summary: 'Informs the corresponding company of the flight cancelation',
		},
		routeSchemas: {
			request: FlightCancelation
		}
	})
	public async cancelReservation1() {
	}


	@Get('/holiday-hotels/find-rooms-in-city', {
		schema: <any>{
			tags: ['holiday-hotels'],
			summary: 'Returns a list of the best hotel rooms for the specified parameters',
		},
		routeSchemas: {
			urlParameters: FindHotelRoomsParams,
			response: { model: HotelRoom, isArray: true }
		}
	})
	public async findUserReservations2() {
	}

	@Post('/holiday-hotels/book-room', {
		schema: <any>{
			tags: ['holiday-hotels'],
			summary: 'Informs the correpsonding hotel of the room booking',
		},
		routeSchemas: {
			request: HotelRoomPurchase
		}
	})
	public async createReservation2() {
	}

	@Delete('/holiday-hotels/cancel-room', {
		schema: <any>{
			tags: ['holiday-hotels'],
			summary: 'Informs the correpsonding hotel of the cancelation',
		},
		routeSchemas: {
			request: HotelRoomCancelation
		}
	})
	public async cancelReservation2() {
	}


	@Get('/my-rentacar/find-vehicles-in-city', {
		schema: <any>{
			tags: ['my-rentacar'],
			summary: 'Returns a list of the vehicles that matches the specified criteria',
		},
		routeSchemas: {
			urlParameters: FindVehiclesParams,
			response: { model: Vehicle, isArray: true }
		}
	})
	public async findUserReservation3s() {
	}

	@Post('/my-rentacar/rent-vehicle', {
		schema: <any>{
			tags: ['my-rentacar'],
			summary: 'Makes the arrengements for the vechile rent',
		},
		routeSchemas: {
			request: VehiclePurchase
		}
	})
	public async createReservation3() {
	}

	@Delete('/my-rentacar/cancel-rent', {
		schema: <any>{
			tags: ['my-rentacar'],
			summary: 'Informs the correpsonding company of the cancelation',
		},
		routeSchemas: {
			request: VehicleCancelation
		}
	})
	public async cancelReservation3() {
	}

}
