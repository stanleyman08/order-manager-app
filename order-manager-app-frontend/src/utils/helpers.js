export function makeJSDateObject(date: Date) {
    if (date instanceof Date) {
        return new Date(date.getTime());
    }
    throw new Error('Cannot properly parse argument passed to cloneCrossUtils');
}
