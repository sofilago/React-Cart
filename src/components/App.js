/*
Este archivo NO es necesario editar para los test specs
*/

import React, {Component} from 'react';
import  Exhibit from './Exhibit';
// El código debajo va a ser útil si queres usar tu store de redux como la fuente de estado y verdad
// import store from '../store';
// import {setMammal, setBird, setFish} from '../store/action-creators/actions';

export default class App extends Component {

    constructor() {
        super();
        // El código de abajo va a ser útil para usar tu store de redux como tu fuente de verdad
        // this.state = store.getState();
        this.state =  {
            selectedMammal : "Tiger",
            selectedBird : "Eagle",
            selectedFish : "Seahorse",
            mammals: ['Tiger', 'Panda', 'Pig'],
            birds: ['Eagle', 'Flamingo', 'Penguin'],
            fish: [ 'Seahorse', 'Octopus', 'Stingray']
        };
    }

    // El código de abajo va a ser útil si queres usar tu store de redux como la fuenta de estado y verdad
    // componentDidMount() {
    //     store.subscribe(() => {
    //         this.setState(store.getState());
    //     });
    // }

    render() {
        const { selectedMammal, selectedBird, selectedFish, mammals, birds, fish } = this.state;
        return (
            <div>
                <h1>E-Zoos.biz</h1>
                <div className="clearfix">
                    <div className="block">
                        <h2>Mammals</h2>
                        {/* setAnimal={setMammal} enviar setAnimal de esta forma te va a permitir conectar tu store de redux con tu Exhibit tag
                        (esto no sigue los test specs, pero es una buena practica) */}
                        <Exhibit selectedAnimal={selectedMammal} animals={mammals}  />
                    </div>
                    <div className="block">
                        <h2>Birds</h2>
                        <Exhibit selectedAnimal={selectedBird} animals={birds} />
                    </div>
                    <div className="block">
                        <h2>Fish</h2>
                        <Exhibit selectedAnimal={selectedFish} animals={fish} />
                    </div>
                </div>
            </div>
        );
    }

}