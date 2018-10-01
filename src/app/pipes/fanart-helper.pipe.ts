import { Pipe, PipeTransform } from '@angular/core';
import { CONSTANTS } from '../constant/main';

@Pipe({
    name: 'asFanartPipe',
    pure: true
})

export class FanartPipe implements PipeTransform {
    private imageUrl: string;
    private baseUrl: string;

    constructor() {
        this.baseUrl = CONSTANTS.APP.IMG_BASE_URL;
    }

    transform(unique_name: string, fanart_name: string) {

        this.imageUrl = this.baseUrl + 'fanart/' + unique_name.substring(0, 2) + '/' + fanart_name;
        return this.imageUrl;

    }
}
