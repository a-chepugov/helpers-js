import {DEVICES_TYPES, DeviceType} from "../Devices";

export type CurrencyType = { sign: string, code: string, abbreviated?: string };

export enum CURRENCIES_TYPES {
    USD,
    EUR,
    UAH,
}

export const CURRENCIES: {
    [propName: string]: CurrencyType
} = {
    [CURRENCIES_TYPES.USD]: {sign: '$', code: 'USD'},
    [CURRENCIES_TYPES.EUR]: {sign: '€', code: 'EUR'},
    [CURRENCIES_TYPES.UAH]: {sign: '₴', code: 'UAH', abbreviated: 'грн'},
};

export default CURRENCIES;
