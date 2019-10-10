import { Controller, Get, Delete, Post } from '@plugdata/web';
import { Tour, TourRelatedProducts, FindFutureToursInCityUrlParameters, FindRelatedProductsUrlParameters, Reservation, FindUserReservationsUrlParameters, ReservationReferences } from './vehicle.api';

/**
 * This class is an example of a controller with all REST operations
 * All methods generate documentation and have validations for inputs
 */
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
