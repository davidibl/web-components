import { Pipe, PipeTransform } from '@angular/core';
import { ConfigurationService } from '../services/configurationService';

@Pipe({
    name: 'configurationValue',
    pure: false,
})
export class ConfigurationValuePipe implements PipeTransform {

    constructor(private _configurationService: ConfigurationService) {
    }

    public transform(key: string): string {
        return this._configurationService.getConfigValue<string>(key);
    }
}
