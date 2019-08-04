import { Service, Logger, OnEvent } from "@plugdata/core";
import { Vehicle } from "./vehicle.model";

export class VehicleEvents {
	public static readonly vehicleCreated = 'vehicleCreated';
}

@Service()
export class VehicleEventsService {

	constructor(
		private log: Logger
	) {}

	@OnEvent(VehicleEvents.vehicleCreated)
	public onVehicleCreated(vehicle: Vehicle) {
		this.log.info('From event: new vehicle created -> ' + vehicle.id);
	}

}
