import { Pipe, PipeTransform } from '@angular/core';
import { CONSTANTS } from '../constant/main';

@Pipe({
    name: 'asUrlPipe',
    pure: true
})

export class UrlPipe implements PipeTransform {
    private imageUrl = 'assets/img/missing.png';
    private returnPoster: any = '';
    private baseUrl: string;

    constructor() {
        this.baseUrl = CONSTANTS.APP.IMG_BASE_URL;
    }

    transform(poster: string, unique_name: string, size: string) {

        if (poster) {
            if (size) {
                this.returnPoster = poster.split('.');
                this.returnPoster = this.returnPoster[0] + '_' + size + '.jpg';
                this.imageUrl = this.baseUrl + 'poster/' + unique_name.substring(0, 2) + '/' + this.returnPoster;
            } else {
                this.imageUrl = this.baseUrl + 'poster/' + unique_name.substring(0, 2) + '/' + poster;
            }
        }

        return this.imageUrl;
    }
}
