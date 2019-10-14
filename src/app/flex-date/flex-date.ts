import {FlexDatePrecision} from "./flex-date-precision";

export class FlexDate
{
    year: number | null;
    month: number | null;
    day: number | null;
    precision: FlexDatePrecision = FlexDatePrecision.None;

    public static parse(dateString: string): FlexDate
    {

        if (dateString == null) {
            return undefined;
        }

        let parts = dateString.split("-");
        if (parts.length === 1 && parts[0] === '') {
            return null;
        }

        let flexDate: FlexDate = new FlexDate();
        if (parts.length > 0) {
            flexDate.year = +parts[0];
            flexDate.precision = FlexDatePrecision.Year;
        }
        if (parts.length > 1) {
            flexDate.month = +parts[1];
            flexDate.precision = FlexDatePrecision.Month;
        }
        if (parts.length > 2) {
            flexDate.day = +parts[1];
            flexDate.precision = FlexDatePrecision.Day;
        }

        return flexDate;
    }

    public static compare(left: FlexDate, right: FlexDate): number
    {
        if (!left && !right) {
            return 0;
        }

        if (left && !right) {
            return 1;
        }

        if (!left && right) {
            return -1;
        }

        return left.compareTo(right);
    }

    public compareTo(other: FlexDate): number
    {

        if (this.year < other.year) {
            return -1;
        }

        if (this.year > other.year) {
            return 1;
        }

        if (this.month < other.month) {
            return -1;
        }

        if (this.month > other.month) {
            return 1;
        }

        if (this.day < other.day) {
            return -1;
        }

        if (this.day > other.day) {
            return 1;
        }


        return 0;
    }

    static stringify(value: FlexDate): string
    {
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
