import {Pipe, PipeTransform} from "@angular/core";
import {FlexDate} from "./flex-date";

@Pipe({name: 'flexDate'})
export class FlexDatePipe implements PipeTransform {
    /**
     * @override
     */
    public transform(value: FlexDate): string
    {
        return FlexDate.stringify(value);
    }
}
