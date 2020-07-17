export const SETMAMMAL = 'SET_MAMMAL';

export const SETBIRD = 'SET_BIRD';

export const SETFISH = 'SET_FISH';

export function setMammal (animal) {
    return {
        type: SETMAMMAL,
        animal
    };
}  

export function setBird (animal) {
    return {
        type: SETBIRD,
        animal
    };
}  

export function setFish (animal) {
    return {
        type: SETFISH,
        animal
    };
}  
