import {expect} from 'chai';
import {IBuilder, IDirector} from './index';

interface Part {
}

class Door implements Part {
}

class Wheel implements Part {
}

class Engine implements Part {
}

class Vehicle {
    protected parts: Array<Part>;
    protected name: string;

    constructor(name: string) {
        this.name = name;
        this.parts = [];
    }

    plug(part: Part) {
        this.parts.push(part);
    }

    countParts() {
        return this.parts.length;
    }
}

abstract class VehicleBuilder implements IBuilder<Vehicle> {
    protected vehicle: Vehicle;

    constructor(name: string) {
        this.vehicle = this.createVehicle(name);
    }

    abstract createVehicle(name: string): Vehicle

    abstract addEngine(): VehicleBuilder;

    abstract addWheel(): VehicleBuilder;

    abstract addDoors(): VehicleBuilder;

    getVehicle(): Vehicle {
        return this.vehicle;
    };
}

class TruckBuilder extends VehicleBuilder {
    createVehicle(name: string): Vehicle {
        return new Vehicle(name);
    }

    addEngine(): TruckBuilder {
        this.vehicle.plug(new Engine());
        return this;
    };

    addWheel(): TruckBuilder {
        this.vehicle.plug(new Wheel());
        this.vehicle.plug(new Wheel());
        this.vehicle.plug(new Wheel());
        this.vehicle.plug(new Wheel());
        return this;
    };

    addDoors(): TruckBuilder {
        this.vehicle.plug(new Door());
        this.vehicle.plug(new Door());
        return this;
    };
}

class BoatBuilder extends VehicleBuilder {
    createVehicle(name: string): Vehicle {
        return new Vehicle(name);
    }

    addEngine(): TruckBuilder {
        this.vehicle.plug(new Engine());
        return this;
    };

    addWheel(): TruckBuilder {
        return this;
    };

    addDoors(): TruckBuilder {
        return this;
    };
}

class VehicleDirector implements IDirector<Vehicle> {
    build(builder: VehicleBuilder): Vehicle {
        return builder
            .addEngine()
            .addWheel()
            .addDoors()
            .getVehicle();
    }
}

describe('Builder', () => {

    it('creates instance with builder', () => {
        const director = new VehicleDirector();
        const boat = director.build(new BoatBuilder('Rapid'));
        expect(boat.countParts()).to.be.equal(1);
    });

    it('compare with manually crated instance', () => {
        const director = new VehicleDirector();
        const truck = director.build(new TruckBuilder('heavy truck'));

        const vehicle = new Vehicle('heavy truck');
        vehicle.plug(new Engine());
        vehicle.plug(new Wheel());
        vehicle.plug(new Wheel());
        vehicle.plug(new Wheel());
        vehicle.plug(new Wheel());
        vehicle.plug(new Door());
        vehicle.plug(new Door());

        expect(truck).to.be.deep.equal(vehicle);
    });

});
