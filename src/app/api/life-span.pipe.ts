import {Pipe, PipeTransform} from '@angular/core';
import {LifeSpan} from './life-span';
import {FlexDate} from '../flex-date/flex-date';

@Pipe({
    name: 'mbLifeSpan'
})
export class MbLifeSpanPipe implements PipeTransform
{
    /**
     * @override
     */
    public transform(lifeSpan: LifeSpan): string
    {
        if (!lifeSpan) {
            return 'n/a';
        }

        let ret = FlexDate.stringify(lifeSpan.begin);
        ret += ' - ';
        if (lifeSpan.ended) {
            ret += FlexDate.stringify(lifeSpan.end);
        }

        return ret;
    }
}
