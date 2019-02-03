import { Injectable } from '@angular/core';

const REGEX_TOKEN = /{(.+?)}/g;

@Injectable()
export class TokenTransformationService {

    public replaceTokens(translation: string, tokens: Object) {
        if (tokens) {
            translation = translation.replace(REGEX_TOKEN, (match, key) => {
                return tokens[key] || key;
            });
        }
        return translation;
    }

}
