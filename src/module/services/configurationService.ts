import { Injectable } from '@angular/core';
import { isNull } from '../functions/checks';
import { getObjectProperty } from '../functions/objectUtils';

@Injectable()
export class ConfigurationService {

    private _configuration: Object;

    public constructor() {
    }

    public addConfiguration(configuration: Object) {
        this._configuration = configuration;
    }

    public getConfigValue<T>(configPath: string, defaultValue?: T): T {
        const value = getObjectProperty(configPath, this._configuration);
        if (!value) {
            return defaultValue;
        }
        return value;
    }

}
