import {Pipe, PipeTransform} from "@angular/core";
import {FlexDate} from "./flex-date";
import {FlexDatePrecision} from "./flex-date-precision";

@Pipe({name: 'flexDate'})
export class FlexDatePipe implements PipeTransform {
    transform(value: FlexDate): string {

        if (!value) {
            return '';
        }

        switch (value.precision) {
            case FlexDatePrecision.Day: {
                return value.year + '-' + value.month + '-' + value.day;
            }
            case FlexDatePrecision.Month: {
                return value.year + '-' + value.month;
            }
            case FlexDatePrecision.Year: {
                return String(value.year);
            }
            default: {
                return '';
            }
        }
    }
}
