export function isNull(value: any): boolean {
    return (value === null || value === undefined);
}

export function equal(a: any, b: any) {
    return JSON.stringify(a) === JSON.stringify(b);
}
