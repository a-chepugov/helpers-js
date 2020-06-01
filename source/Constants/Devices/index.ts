export enum DEVICES_TYPES {
    TEAPOT,
    MOBILE_S,
    MOBILE_M,
    MOBILE_L,
    TABLET,
    LAPTOP,
    LAPTOP_L,
    LAPTOP_4K,
}

export type DeviceType = { min: number, max: number, tag: string, type: DEVICES_TYPES, name: string };

export const DEVICES: {
    [propName: string]: DeviceType
} = {
    [DEVICES_TYPES.TEAPOT]:
        {min: 0, max: 319, tag: 'xxxs', type: DEVICES_TYPES.TEAPOT, name: DEVICES_TYPES[DEVICES_TYPES.TEAPOT]},
    [DEVICES_TYPES.MOBILE_S]:
        {min: 320, max: 374, tag: 'xxs', type: DEVICES_TYPES.MOBILE_S, name: DEVICES_TYPES[DEVICES_TYPES.MOBILE_S]},
    [DEVICES_TYPES.MOBILE_M]:
        {min: 375, max: 413, tag: 'xs', type: DEVICES_TYPES.MOBILE_M, name: DEVICES_TYPES[DEVICES_TYPES.MOBILE_M]},
    [DEVICES_TYPES.MOBILE_L]:
        {min: 414, max: 767, tag: 's', type: DEVICES_TYPES.MOBILE_L, name: DEVICES_TYPES[DEVICES_TYPES.MOBILE_L]},
    [DEVICES_TYPES.TABLET]:
        {min: 768, max: 991, tag: 'm', type: DEVICES_TYPES.TABLET, name: DEVICES_TYPES[DEVICES_TYPES.TABLET]},
    [DEVICES_TYPES.LAPTOP]:
        {min: 992, max: 1023, tag: 'l', type: DEVICES_TYPES.LAPTOP, name: DEVICES_TYPES[DEVICES_TYPES.LAPTOP]},
    [DEVICES_TYPES.LAPTOP_L]:
        {min: 1024, max: 1439, tag: 'xl', type: DEVICES_TYPES.LAPTOP_L, name: DEVICES_TYPES[DEVICES_TYPES.LAPTOP_L]},
    [DEVICES_TYPES.LAPTOP_4K]:
        {min: 1440, max: Infinity, tag: 'xxl', type: DEVICES_TYPES.LAPTOP_4K, name: DEVICES_TYPES[DEVICES_TYPES.LAPTOP_4K]},
};

export default DEVICES;

export function fromSize(size: number): DeviceType | never {
    if (Number.isFinite(size) && size > 0) {
        // @ts-ignore
        return Object
            .values(DEVICES)
            .find(({min, max}: DeviceType) => (min <= size) && (size <= max));
    } else {
        throw new Error('Invalid device size: ' + size)
    }
}
