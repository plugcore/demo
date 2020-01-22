import {
	OnInit, Logger, ObjectValidator,
	Service, TypeChecker, ObjectUtils, ObjectValidatorUtils,
	StringUtils, EventDispatcher, InjectConfiguration
} from '@plugcore/core';
import { Collection, MongoDbDatasource } from '@plugcore/ds-mongodb';
import { VehicleModel } from './vehicle.api';
import { INewVehicle, IUpdateVehicle, Vehicle } from './vehicle.model';
import { VehicleEvents } from './vehivle.events';
import { CustomConfiguration } from '../configuration/custom.configuration';

/**
 * This class is an example of database service with all CRUD operations
 */
@Service({ connection: 'mymongodb' })
export class VehicleService implements OnInit {

	private collection: Collection<Vehicle>;
	private isValidVehicle: (data: VehicleModel) => any;

	constructor(
		private log: Logger,
		private dbConnection: MongoDbDatasource,
		private objectValidatorFactory: ObjectValidator,
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
			// ensureIndexes: [{ key: { id: -1 } }]
		});
	}

	public async findAll() {
		// { projection } Removes the '_id' field that have all objects in mongodb
		return <any>this.collection.find({}, { projection: { _id: 0 } });
	}

	public async findOne(id: Vehicle['id']) {
		return this.collection.findOne({ id }, { projection: { _id: 0 } });
	}

	public async create(vehicle: INewVehicle): Promise<Vehicle> {
		const newVehicle: Vehicle = ObjectUtils.deepAssign(vehicle, { id: StringUtils.createRandomId() });
		// Example of object validaton. We can use directly the "this.isValidVehicle" function
		// or we can use the util from objectValidatorFactory so it's easy to do
		const vehicleValidation = this.objectValidatorFactory.validate(this.isValidVehicle, newVehicle);
		if (vehicleValidation.valid) {
			await this.collection.insertOne(newVehicle);
			// Example of custom events. This will be recived in
			// VehicleEventsService.onVehicleCreated
			this.eventDispatcher.emit(VehicleEvents.vehicleCreated, newVehicle);
			return newVehicle;
		} else {
			throw new Error(StringUtils.objToStr(vehicleValidation.errors));
		}
	}

	public async update(id: Vehicle['id'], vehicle: IUpdateVehicle) {
		this.log.debug(`Updating vehicle ${id}`);
		return this.collection.updateOne({ id }, { $set: vehicle });
	}

	public async remove(vehicleOrId: Vehicle['id'] | Vehicle) {
		const id = TypeChecker.isString(vehicleOrId) ? vehicleOrId : vehicleOrId.id;
		this.log.debug(`Removing vehicle ${id}`);
		return this.collection.deleteOne({ id });
	}

}

