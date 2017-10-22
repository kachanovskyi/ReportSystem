import React, {Component} from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import {Col} from 'react-bootstrap';
import {ifStringEmpty, ifNotEmptyArray, notifyModalShow, getRandomColor} from '../externalFunctions';

import NotifyModal from './NofityModal';
import $ from 'jquery';

import './InputField.css';

class InputField extends Component {

    constructor() {
        super();
        this.state = {
            theme_id: null,
            themes: [],
            dropdownStyle: {
                backgroundImage: "url('images/arrow.png')",
                backgroundPosition: "97% center",
                backgroundRepeat: "no-repeat"
            }
        };
        // this.formSubmitted = this.formSubmitted.bind(this);
        // this.loadData = this.loadData.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    componentDidMount() {

    }

    addItem({target}) {
        console.log(target);
        const $target = $(target);
        let parent = $target.parent().parent().parent();

        console.log(parent);

        console.log(parent.find($('.input-container')).clone());

        if(this.props.id === "scientific_research") {

            parent.find($('.data-input')[0]).clone().appendTo(
                parent.find($('.input-container'))
            );

        } else {

            parent = parent.find($('.input-container'));
            console.log(parent.find('textarea')[0]);
            parent.append( $(parent.find('textarea')[0]).clone() );

        }

        // const selectValue = parent.find('select').val();
        // console.log($('select option[value="' + selectValue + '"]').text());
    };

    render() {

        const info = this.props.info ? <p className="info">{this.props.info}</p> : "";
        const addInfo = this.props.addInfo ? <p className="add-info">{this.props.addInfo}</p> : "";

        let input = <div className="input-container">
            {info}
            {addInfo}
            <textarea placeholder="Заповніть дане поле..."/>
        </div>;

        if( this.props.id === "scientific_research") {
            input = <div className="input-container">
                {info}
                <div className="data-input">
                    <select className="theme_select" style={this.state.dropdownStyle} required>
                        {this.props.themes}
                    </select>
                    <textarea placeholder="Зміст виконаної роботи (до 1000 знаків)"/>
                </div>
            </div>;
        }

        return (
            <div className="IR-item" id={this.props.id}>
                {input}
                <div>
                    <div className="plus-btn">
                        <img src="images/plus.png" onClick={this.addItem}/>
                    </div>
                </div>
            </div>
        );
    }

}

export default InputField;
