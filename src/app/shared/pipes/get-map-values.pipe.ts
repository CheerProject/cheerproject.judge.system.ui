import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getMapValues'
})
export class GetMapValuesPipe implements PipeTransform {
  transform(map: Map<any, any>): any[] {
    const ret = [];

    map.forEach((val, key) => {
      ret.push(val);
    });

    return ret;
  }
}
