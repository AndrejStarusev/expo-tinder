import { Frustrations } from '../firebase';

import Easy from '../assets/images/Easy.png';
import Medium from '../assets/images/Medium.png';
import Hard from '../assets/images/Hard.png';

export function getImageByDisappointment(d) {
    switch(d) {
        case Frustrations[0]:
            return Easy;
        case Frustrations[1]:
            return Medium;
        case Frustrations[2]:
            return Hard;
        default:
            return Easy;
    }
}
