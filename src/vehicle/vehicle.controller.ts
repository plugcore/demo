import { Logger } from '@plugcore/core';
import { Controller, DefaultResponseModel, Delete, Get, Patch, Post, Request, Response } from '@plugcore/web';
import { NewVehicleModel, UpdateVehicleModel, VehicleId, VehicleModel } from './vehicle.api';
import { VehicleService } from './vehicle.service';

/**
 * This class is an example of a controller with all REST operations
 * All methods generate documentation and have validations for inputs
 */
@Controller({ urlBase: '/vehicle' })
export class VehicleController {

	constructor(
		private vehicleService: VehicleService,
		private log: Logger
	) { }

	//
	// Public API
	//

	@Get({
		// Route schema defines a series of JsonSchemas to validate
		// things like requests, params, etc.
		// This also helps to generate better OAS documentation
		// at /api-documentation.json
		routeSchemas: {
			response: { model: VehicleModel, isArray: true }
		},
		onRequest: VehicleController.prototype.findAllOnRequest
	})
	public async findAll(): Promise<VehicleModel[]> {
		return this.vehicleService.findAll();
	}

	@Get('/:id', {
		routeSchemas: {
			urlParameters: VehicleId,
			response: VehicleModel
		}
	})
	public async findById(req: Request<undefined, VehicleId>): Promise<VehicleModel> {
		const result = await this.vehicleService.findOne(req.params.id);
		if (!result) {
			// Example of error inside a route
			// This will generate an http 500 error response
			// With a message attribute that will be the same of the thrown error
			throw new Error('Vehicle not found with id ' + req.params.id);
		} else {
			return result;
		}
	}

	@Post({
		routeSchemas: {
			request: NewVehicleModel,
			response: VehicleId
		}
	})
	public async create(req: Request<NewVehicleModel>) {
		// In this case we know
		// the object is validated thanks to the schema
		// passed in `routeValidation.request`
		// but instead we could use `ObjectValidatorFactory`
		const result = await this.vehicleService.create(req.body);
		return { id: result.id };
	}

	@Patch('/:id', {
		routeSchemas: {
			urlParameters: VehicleId,
			request: UpdateVehicleModel,
			response: DefaultResponseModel
		}
	})
	public async update(req: Request<UpdateVehicleModel, VehicleId>) {
		await this.vehicleService.update(req.params.id, req.body);
		return  { success: true };
	}

	@Delete('/:id', {
		routeSchemas: {
			urlParameters: VehicleId,
			response: DefaultResponseModel
		}
	})
	public async remove(req: Request<undefined, VehicleId>) {
		await this.vehicleService.remove(req.params.id);
		return  { success: true };
	}

	//
	// Events
	//

	private async findAllOnRequest(req: Request, res: Response) {
		// Example of event, you can use ante Fastifty event from
		// https://github.com/fastify/fastify/blob/master/docs/Lifecycle.md
		this.log.debug('Example of http event: ' + req.raw.url);
	}

}
