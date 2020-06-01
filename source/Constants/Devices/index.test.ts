import {expect} from 'chai';
import {DeviceType, DEVICES, DEVICES_TYPES, fromSize} from './index';

describe('device', () => {

    let devicesListOrderedBySize = Object.keys(DEVICES)
        .map((key): DeviceType => DEVICES[key])
        .sort(({min: A}: DeviceType, {min: B}: DeviceType) => A - B);

    it('no gaps in sizes coverage', () => {
        const START = 0;
        const FINISH = Infinity;

        const position = devicesListOrderedBySize
            .reduce((position: number, {min, max}: DeviceType) => {
                return position === min || position === (min - 1) ?
                    max :
                    position;
            }, START);

        expect(position).to.be.equal(FINISH);
    });

    it('guess from size', () => {
        const {type} = fromSize(1000) || {};
        expect(type).to.be.equal(DEVICES_TYPES.LAPTOP);
    });

});
