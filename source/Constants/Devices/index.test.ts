import {expect} from 'chai';
import {DeviceType, DEVICES} from './index';

describe('device', () => {

    let devicesListOrderedBySize = Object.keys(DEVICES)
        .map((key): DeviceType => DEVICES[key])
        .sort(({min: A}: DeviceType, {min: B}: DeviceType) => A - B);

    it('no gaps in sizes coverage', () => {
        const START = 0;
        const FINISH = Infinity;

        const position = devicesListOrderedBySize
            .reduce((position: number, {min, max}: DeviceType) => {
                return position === min ||  position === (min - 1) ?
                    max :
                    position;
            }, START);

        expect(position).to.be.equal(FINISH);
    });

});
