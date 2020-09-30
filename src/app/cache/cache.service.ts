import {Injectable} from "@angular/core";

@Injectable()
export class CacheService
{
    private cache: Map<string, any> = new Map<string, any>();

    public getEntry(key: string)
    {
        if (!this.cache.has(key)) {
            return null;
        }

        return this.cache.get(key);
    }

    public setEntry(key: string, value: any)
    {
        this.cache.set(key, value);
    }

    public deleteEntry(key: string)
    {
        this.cache.delete(key);
    }
}
