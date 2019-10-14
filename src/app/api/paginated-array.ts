import {Pagination} from "./pagination";

export class PaginatedArray<T> extends Array<T>
{
    pagination: Pagination;
}
