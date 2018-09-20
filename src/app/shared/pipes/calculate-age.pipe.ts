import { Pipe, PipeTransform } from '@angular/core';


/**
 * Pipe to get the actual age of a person
 *
 * @export
 * @class GetAgePipe
 * @implements {PipeTransform}
 */
@Pipe({
    name: 'getAge'
})
export class GetAgePipe implements PipeTransform {
    transform(value: string): number {
        const date1 = Date.parse(value);
        const date2 = Date.now();
        const m = date2 - date1;
        if (m > 0) {
            return Math.trunc(m / (1000 * 60 * 60 * 24 * 365));
        } else {
            return 0;
        }

    }
}