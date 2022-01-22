import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'TicksToSecondsPipe'
})

export class TicksToSecondsPipe implements PipeTransform{
    transform(value: number): string {
        return value / Math.pow(10, 7) + " Seconds";
    }
}
