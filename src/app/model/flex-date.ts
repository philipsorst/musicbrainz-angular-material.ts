import {FlexDatePrecision} from "./flex-date-precision";

export class FlexDate {
    year: number | null;
    month: number | null;
    day: number | null;
    precision: FlexDatePrecision = FlexDatePrecision.None

    public static parse(dateString: string): FlexDate {
        let flexDate: FlexDate = new FlexDate();
        let parts = dateString.split("-");
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

    public compareTo(other: FlexDate): number {

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
}
