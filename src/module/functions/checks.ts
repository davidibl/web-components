export function isNull(value: any): boolean {
    return (value === null || value === undefined);
}

export function equal(a: any, b: any) {
    const valA = JSON.stringify(a);
    const valB = JSON.stringify(b);
    return valA === valB;
}
