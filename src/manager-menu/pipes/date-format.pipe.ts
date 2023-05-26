import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe  implements PipeTransform {

  transform(date: Date): string {
    if (date){
      let newDate = new Date(date);
      let timeFormat = '';
      if (newDate.getUTCMinutes()>9){
        timeFormat = `${newDate.getHours()}:${newDate.getUTCMinutes()}`
      }
      else {
        timeFormat = `${newDate.getHours()}:0${newDate.getUTCMinutes()}`
      }
      let dateFormat = ` ${ Days.find(x=> x.key === newDate.getUTCDay())!.value}`;
      return timeFormat + dateFormat;
    }
    else return '';
  }

}
export const Days = [
  { key: 1, value: 'Пн.'},
  { key: 2, value: 'Вт.' },
  { key: 3, value: 'Ср.' },
  { key: 4, value: 'Чт.'},
  { key: 5, value: 'Пт.' },
  { key: 6, value: 'Сб.' },
  { key: 0, value: 'Нд.' },
]
