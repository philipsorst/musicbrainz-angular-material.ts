import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'mbDuration'
})
export class DurationPipe implements PipeTransform
{
    /**
     * @override
     */
    public transform(duration: number): string
    {
        const seconds = Math.floor(duration / 1000);
        const formattedSeconds = seconds % 60;
        const minutes = Math.floor(seconds / 60);

        return minutes + ':' + String(formattedSeconds).padStart(2, '0');
    }
}
