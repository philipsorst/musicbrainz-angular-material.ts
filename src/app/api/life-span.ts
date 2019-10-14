import {FlexDate} from '../flex-date/flex-date';

export class LifeSpan
{
    begin: FlexDate;
    end: FlexDate;
    ended: boolean;

    public static parse(data: any): LifeSpan
    {
        if (!data['begin'] && !data['end']) {
            return null;
        }

        const lifeSpan = new LifeSpan();
        if (data['begin']) {
            lifeSpan.begin = FlexDate.parse(data['begin']);
        }
        if (data['end']) {
            lifeSpan.end = FlexDate.parse(data['end']);
        }
        lifeSpan.ended = true === data['ended'];

        return lifeSpan;
    }
}
