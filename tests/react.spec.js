import React from 'react';
import {expect} from 'chai';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
import {shallow} from 'enzyme';

import {spy} from 'sinon';

import AnimalSelect from '../src/components/AnimalSelect';
import Cage from '../src/components/Cage';
import Exhibit from '../src/components/Exhibit';

describe('React components', () => {
    let animals = ['Tiger', 'Panda', 'Pig', 'Eagle', 'Flamingo', 'Penguin', 'Seahorse', 'Octopus', 'Stingray']

    function getRandomAnimal () {
        return animals[Math.floor(Math.random()*5)]
    }

    describe('<Exhibit />', () => {

        let exhibit, selectedAnimal;
        beforeEach('Crea componente y onChange spy', () => {
            selectedAnimal = getRandomAnimal();
            // Esta es la forma de enzyme de crear el tag y enviar sus props
            // shallow es como un componente padre renderizando un elemento Exhibit y enviando `animals` y `selectedAnimal`
            // `exhibit` es el valor retornado de `shallow()` el cual es un wrapper alrededor de nuestro ReactElement (exhibit)
            exhibit = shallow(<Exhibit animals={animals} selectedAnimal={selectedAnimal}/>);
        });

        it('tiene un estado local inicial con un objeto con la propiedad `selectedAnimal` cuyo valor es igual a la propiedad recibida con el nombre de `selectedAnimal`', () => {
            expect(exhibit.state()).to.be.deep.equal({selectedAnimal});
        });

        it('su render retorna los componentes <AnimalSelect /> y <Cage />', () => {
            expect(exhibit.find(Cage).length).to.be.equal(1);
            expect(exhibit.find(AnimalSelect).length).to.be.equal(1);
        });

        it('pasa su prop selectedAnimal a su hijo: el componente <Cage /> (con el mismo nombre)', () => {
            expect(exhibit.find(Cage).props().selectedAnimal).to.be.equal(selectedAnimal);
        });

        it('pasa su propia prop animals a su hijo: el componente <AnimalSelect /> (con el mismo nombre)', () => {
            expect(exhibit.find(AnimalSelect).props().animals).to.be.deep.equal(animals);
        });

        it('tiene una función `setAnimal` que toma un animal y setea el selectedAnimal del estado a ese animal', () => {
            let newAnimal = getRandomAnimal();
            expect(exhibit.instance().setAnimal).to.be.a('function');
            exhibit.instance().setAnimal(newAnimal);
            expect(exhibit.state()).to.be.deep.equal({selectedAnimal: newAnimal})
        });

        it('se asegura que la función setAnimal esta apropiadamente bindeada dentro del constructor (Utilizar `bind` dentro del constructor)', () => {
            expect(exhibit.instance().setAnimal.hasOwnProperty('prototype')).to.be.false;
        });

        it('pasa su funcion setAnimal como prop de <AnimalSelect /> bajo el nombre de submitAnimal', () => {
            expect(exhibit.find(AnimalSelect).props().submitAnimal).to.be.equal(exhibit.instance().setAnimal);
        });

    });

    describe('<Cage />', () => {

        let cage, animal;
        beforeEach('Crea componente', () => {
            animal = getRandomAnimal();
            cage = shallow(<Cage selectedAnimal={animal} />);
        });

        it('deberia renderear un div con el background correspondiente al selectedAnimal (Utilizar la función `animalBackground` definida al principio del archivo para setear el atributo `style`)', () => {
            expect(cage.is('div')).to.be.equal(true);
            expect(cage.get(0).props.style.backgroundImage).to.be.equal(`url(./src/img/${animal}.gif`);
        });

    });

    describe('<AnimalSelect />', () => {

        let animalSelect, selectedAnimal, setAnimalSpy;
        beforeEach('Crea component', () => {
            setAnimalSpy = spy();
            animalSelect = shallow(<AnimalSelect submitAnimal={setAnimalSpy} animals={animals} />);
        });

        it('debería renderear un form', () => {
            expect(animalSelect.is('form')).to.be.true;
        });

        it('el formulario debería tener un select que liste todos los animales como opciones (Utilizar la prop `animals` que recibe)', () => {
            expect(animalSelect.find('select').length).to.be.equal(1);
            // loopea cada opcion en el select (TIP: map!)
            // El key de cada option deberia ser el nombre de cada animald
            expect(animalSelect.find('option')).to.have.length(animals.length)
            animalSelect.find('option').forEach((animalOption, i) => {
                expect(animalOption.key()).to.be.equal(animals[i])
                expect(animalOption.text().trim()).to.be.equal(animals[i])
            })
        });

        it('debería tener un label para describir el select con el texto: "Selecciona un Animal:"', () => {
            const selectLabel = animalSelect.find('label')
            expect(selectLabel.length).to.be.equal(1);
            expect(selectLabel.text()).to.be.equal("Selecciona un Animal:");
        });

        it('select debería tener un evento onChange que envie el nuevo animal usando la funcion "submitAnimal" (Utilizar la prop `submitAnimal` que recibe)', () => {
            expect(animalSelect.find('select').props('select').onChange)
                .to.be.a('function');
            // eligiendo un animal random
            let animal = getRandomAnimal()
            // simulando un evento 'change' con un evento descrito como el segundo argumento dado a `simulate`
            animalSelect.find('select').simulate('change', {target: {value: animal}});
            // el spy enviado debería ser llamado con el argumento descrito
            expect(setAnimalSpy.calledWith(animal)).to.be.true;
        });

    });

});
