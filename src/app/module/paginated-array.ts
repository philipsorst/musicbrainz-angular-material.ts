import {Pagination} from "../model/pagination";

export class PaginatedArray<T> extends Array<T>
{
    pagination: Pagination;
}
