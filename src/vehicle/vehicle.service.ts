import {
	IDiOnInit, Logger, ObjectValidatorFactory, ProjectConfiguration,
	Service, TypeChecker, ObjectUtils, ObjectValidatorUtils,
	StringUtils, EventDispatcher
} from '@plugdata/core';
import { Collection, MongoDbConnection } from '@plugdata/data';
import { CustomConfiguration } from '../configuration/custom.configuration';
import { VehicleModel } from './vehicle.api';
import { INewVehicle, IUpdateVehicle, Vehicle } from './vehicle.model';
import { VehicleEvents } from './vehivle.events';

/**
 * This class is an example of database service with all CRUD operations
 */
@Service()
export class VehicleService implements IDiOnInit {

	private collection: Collection<Vehicle>;
	private isValidVehicle: (data: VehicleModel) => any;

	constructor(
		private log: Logger,
		private config: ProjectConfiguration<CustomConfiguration>,
		private dbConnection: MongoDbConnection,
		private objectValidatorFactory: ObjectValidatorFactory,
		private eventDispatcher: EventDispatcher
	) {
		// Example of object validation compilation
		// We can compile it from any object or json 
		// that is a valid json schema: https://json-schema.org/
		// Or you can generate it from a decorated class
		// like VehicleModel
		this.isValidVehicle = this.objectValidatorFactory.compile(
			ObjectValidatorUtils.generateJsonSchema(VehicleModel)
		);
	}

	//
	// Public mtehods
	//

	public async onInit() {
		// This gets executed before marking the service as ready
		// to import by other services
		this.collection = await this.dbConnection.getCollection(Vehicle, {
			// Here we create a descending index for id so we can
			// create fast new ids.
			// Here we can add as many custom indexes for one or multiple
			// fields at the same time. 
			ensureIndexes: [{ key: { id: -1 } }]
		});
		// Log example
		// Custom configuration example with env variables and json import
		// All properties can be found in configuration\configuration.json
		this.log.debug('Property in project configuration:', this.config.custom);
	}

	public async findAll() {
		// { projection } Removes the '_id' field that have all objects in mongodb
		return this.collection.find({}, { projection: { _id: 0 } }).toArray();
	}

	public async findOne(id: Vehicle['id']) {
		return this.collection.findOne({ id }, { projection: { _id: 0 } });
	}

	public async create(vehicle: INewVehicle) {
		const newVehicle: Vehicle = ObjectUtils.deepAssign(vehicle, { id: await this.createNewId() });
		// Example of object validaton. We can use directly the "this.isValidVehicle" function
		// or we can use the util from objectValidatorFactory so it's easy to do
		const vehicleValidation = this.objectValidatorFactory.validate(this.isValidVehicle, newVehicle);
		if (vehicleValidation.valid) {
			const result = this.collection.insertOne(newVehicle);
			// Example of custom events. This will be recived in
			// VehicleEventsService.onVehicleCreated
			this.eventDispatcher.emmit(VehicleEvents.vehicleCreated, newVehicle);
			return result;
		} else {
			throw new Error(StringUtils.objToStr(vehicleValidation.errors));
		}
	}

	public async update(id: Vehicle['id'], vehicle: IUpdateVehicle) {
		this.log.debug(`Updating vehicle ${id}`);
		return this.collection.updateOne({ id }, { $set: vehicle });
	}

	public async remove(vehicleOrId: Vehicle['id'] | Vehicle) {
		const id = TypeChecker.isNumber(vehicleOrId) ? vehicleOrId : vehicleOrId.id;
		this.log.debug(`Removing vehicle ${id}`);
		return this.collection.deleteOne({ id });
	}

	//
	// Private mtehods
	//

	private async createNewId() {
		// Since we have created an index for the id field and
		// we are limiting it by 1 we have maximum performance
		const currMaxId = await this.collection.find().sort({ id: -1 }).limit(1).toArray();
		if (currMaxId && currMaxId.length > 0) {
			return currMaxId[0].id + 1;
		} else {
			return 0;
		}
	}

}

