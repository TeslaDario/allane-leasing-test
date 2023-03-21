import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capSplit',
})
export class CapSplitPipe implements PipeTransform {
  transform(value: string): string {
    return (
      value
        // insert a space before all caps
        .replace(/([A-Z])/g, ' $1')
        // uppercase the first character
        .replace(/^./, function (str) {
          return str.toUpperCase();
        })
    );
  }
}
