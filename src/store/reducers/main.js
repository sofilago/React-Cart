
import {SETMAMMAL, SETBIRD, SETFISH} from "../action-creators/actions";

const initialState = {
	selectedMammal : "Tiger",
	selectedBird : "Eagle",
	selectedFish : "Seahorse",
	mammals : ['Tiger', 'Panda', 'Pig'],
	birds : ['Eagle', 'Flamingo', 'Penguin'],
	fish : ['Seahorse', 'Octopus', 'Stingray']
};
	// Asegurate que entendes los parametros aquí!
	// con cualquier reducer esperamos 2 argumentos
	// somos capaces de dar un valor por defecto a el parametro en la forma vista abajo
export default (state = initialState, action) => {
	if (action.type === SETMAMMAL) {
		return {
			...state,
			selectedMammal: action.animal
		}
	}
	if (action.type === SETBIRD) {
		return {
			...state,
			selectedBird: action.animal
		}
	}
	if (action.type === SETFISH) {
		return {
			...state,
			selectedFish: action.animal
		}
	}
	return{
		...state
	}

};
