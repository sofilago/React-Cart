import {expect} from 'chai';
import {createStore} from 'redux';

import {setMammal, setBird, setFish} from '../src/store/action-creators/actions';
import mainReducer from '../src/store/reducers/main';

const mammals = ['Tiger', 'Panda', 'Pig'];
const birds = ['Eagle', 'Flamingo', 'Penguin'];
const fish = [ 'Seahorse', 'Octopus', 'Stingray'];

function getRandomAnimal (animals) {
    return animals[Math.floor(Math.random()*3)]
}

describe('Action Creators', () => {

	  describe('setMammal', () => {
        it('retorna una acción apropiadamente formateada', () => {
            const testMammal = getRandomAnimal(mammals);
            expect(setMammal(testMammal)).to.be.deep.equal({
                type: 'SET_MAMMAL',
                animal : testMammal
            });
        });
    });

    describe('setBird', () => {
        it('retorna una acción apropiadamente formateada', () => {
            const testBird = getRandomAnimal(birds);
            expect(setBird(testBird)).to.be.deep.equal({
                type: 'SET_BIRD',
                animal: testBird
            });
        });
    });

    describe('setFish', () => {
        it('retorna la acción apropiadamente formateada', () => {
            const testFish = getRandomAnimal(fish);
            expect(setFish(testFish)).to.be.deep.equal({
                type: 'SET_FISH',
                animal: testFish
            });
        });
    });

});


describe('Reducer', () => {

    const initialState = {
        selectedMammal : "Tiger",
        selectedBird : "Eagle",
        selectedFish : "Seahorse",
        mammals,
        birds,
        fish
        }
    let testStore;

    beforeEach('crea un store testeable y lo freeza', () => {
        testStore = createStore(mainReducer);
        // freeza el estado para que no podamos mutar!!
        Object.freeze(testStore.getState());
    });

    it('tiene el estado inicial esperado', () => {
        expect(testStore.getState()).to.be.deep.equal(initialState);
    });

    describe('SET_MAMMAL', () => {
        const newMammal = getRandomAnimal(mammals);
        it('setea la propiedad selectedMammal al animal de la accion "SET_MAMMAL" (no mutando)', () => {
            expect(
                mainReducer(undefined, { type: 'SET_MAMMAL', animal: newMammal})
            ).to.deep.equal({
                selectedMammal: newMammal,
                selectedBird: initialState.selectedBird,
                selectedFish: initialState.selectedFish,
                mammals,
                birds,
                fish
            });
        });
    });

    describe('SET_BIRD', () => {
        const newBird = getRandomAnimal(birds);
        it('setea la propiedad selectedBird al animal en el action creator (no mutando)', () => {
            expect(
                mainReducer(undefined, { type: 'SET_BIRD', animal: newBird })
            ).to.deep.equal({
                selectedMammal: initialState.selectedMammal,
                selectedBird: newBird,
                selectedFish: initialState.selectedFish,
                mammals,
                birds,
                fish
            });
        });
    });

    describe('SET_FISH', () => {
        const newFish = getRandomAnimal(fish);
        it('setea la propiedad selectedFish al animal en el action creator (no mutando)', () => {
            expect(
                mainReducer(undefined, { type: 'SET_FISH', animal: newFish })
            ).to.deep.equal({
                selectedMammal: initialState.selectedMammal,
                selectedBird: initialState.selectedBird,
                selectedFish: newFish,
                mammals,
                birds,
                fish
            });
        });
    });

    describe('SET_REPTILE', () => {
        it('trata de usar un tipo de acción invalido', () => {
            expect(
                mainReducer(undefined, { type: 'SET_REPTILE', animal: "Ball Python" })
            ).to.deep.equal(initialState);
        });
    });

});