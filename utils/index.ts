export const convert = {
    kmToMi: (km: number, mi: number): number => {
        return km * 0.621
    },
    miToKm: (mi: number, km: number): number => {
        return mi * 1.609
    },
    mToFt: (m: number, ft: number): number => {
        return m * 3.281
    },
    ftToM: (ft: number, m: number): number => {
        return ft * 0.305
    },
}
