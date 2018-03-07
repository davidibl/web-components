export function concatPath(pathLeft: string, pathRight: string): string {
    pathLeft = (pathLeft.endsWith('/')) ? pathLeft.substr(0, pathLeft.length - 1) : pathLeft;
    pathRight = (pathRight.startsWith('/')) ? pathRight.substr(1) : pathRight;
    return pathLeft.concat('/').concat(pathRight);
}

export function concatPaths(pathLeft: string, ...paths: string[]): string {
    return concatPath(pathLeft, paths.reduce((left, right) => {
        return concatPath(left, right);
    }));
}
