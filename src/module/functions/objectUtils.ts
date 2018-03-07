export function getObjectProperty<T>(propertyPath: string, item: Object) {
    if (!item) {
        return null;
    }

    if (!propertyPath) {
        return item;
    }

    if (propertyPath.indexOf('.') < 0) {
        return item[propertyPath];
    }

    return <T>propertyPath.split('.')
        .reduce((previousValue, param) => previousValue && previousValue[param], item);
}
