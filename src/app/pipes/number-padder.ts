import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'asNumberPadderPipe',
  pure: true
})

export class NumberPadderPipe implements PipeTransform {

  constructor() {
  }

  transform(s: string, paddingAmount: number) {
    return s.padStart(2, '0');
  }
}
