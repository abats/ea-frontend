import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'asFilterBy',
    pure: false
})

export class FilterByPipe implements PipeTransform {
    transform(items: any[], field: string, value: string): any[] {
        if (!items) {
            return [];
        }
        return items.filter(it => it[field] === value);
    }
}

