import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enum',
  standalone: true,
})
export class EnumPipe implements PipeTransform {
  transform(value: string, enumObj: any): string {
    return enumObj[value as keyof typeof enumObj] || value;
  }
}
