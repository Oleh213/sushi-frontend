import { Pipe, PipeTransform } from '@angular/core';
import {Days} from "../../manager-menu/pipes/date-format.pipe";

@Pipe({
  name: 'orderDataFormat'
})
export class OrderDataFormatPipe implements PipeTransform {

  transform(date: Date): string {
    if (date){
      let newDate = new Date(date);
      let timeFormat = '';
      if (newDate.getUTCMinutes()>9){
        timeFormat = `${newDate.getHours()}:${newDate.getUTCMinutes()} ${newDate.getDate()}.${newDate.getMonth()}.${newDate.getFullYear()}`
      }
      else {
        timeFormat = `${newDate.getHours()}:0${newDate.getUTCMinutes()} ${newDate.getDate()}.${newDate.getMonth()}.${newDate.getFullYear()}`
      }
      return timeFormat ;
    }
    else return '';
  }

}
