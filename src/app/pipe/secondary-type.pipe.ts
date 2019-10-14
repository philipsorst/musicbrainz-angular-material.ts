import {Pipe, PipeTransform} from "@angular/core";
import {ReleaseGroup} from "../model/release-group";

@Pipe({name: 'mbSecondaryType'})
export class MbSecondaryTypePipe implements PipeTransform
{
    /**
     * @override
     */
    public transform(value: Array<ReleaseGroup>, selectedPipes: Array<String>): Array<ReleaseGroup>
    {
        return value.filter((element: ReleaseGroup) => {

            for (let secondaryType of element.secondaryTypes) {
                if (selectedPipes.indexOf(secondaryType) === -1) {
                    return false;
                }
            }

            return true;
        });
    }
}
