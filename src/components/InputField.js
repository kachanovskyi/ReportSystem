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
        if(this.props.id === "create_date") {
            document.getElementById('create_date').valueAsDate = new Date();
        }
    }

    addItem({target}) {
        console.log(target);
        const $target = $(target);
        const parent = $target.parent().parent().parent();

        const selectValue = parent.find('select').val();

        console.log($('select option[value="' + selectValue + '"]').text());
    };

    render() {

        const info = this.props.info ? <p className="info">{this.props.info}</p> : "";
        const addInfo = this.props.addInfo ? <p className="add-info">{this.props.addInfo}</p> : "";

        let input = <div className="input-container" id={this.props.id}>
            {info}
            {addInfo}
            <textarea placeholder="Заповніть дане поле..."/>
        </div>;

        if( this.props.id === "scientific_research") {
            input = <div className="input-container" id={this.props.id}>
                {info}
                <select id="theme_select" style={this.state.dropdownStyle} required>
                    {this.props.themes}
                </select>
                <textarea placeholder="Зміст виконаної роботи (до 1000 знаків)"/>
            </div>;
        }

        if( this.props.id.includes("amount") ) {

            input = <input type="text" id={this.props.id} placeholder="Введіть число..."/>

        } else if( this.props.id === "create_date" ) {

            input = <input type="date" id={this.props.id}/>

        }

        {/*<div>*/}
        {/*<div className="IR-item">*/}
        {/*<div className="input-container">*/}
        {/*<p>участь у науково-дослідній тематиці кафедри(підрозділу): шифр, назва НДР (науковий*/}
        {/*керівник)</p>*/}
        {/*<select name="theme_select" id={this.props.id} style={this.state.dropdownStyle} required>*/}
        {/*{this.state.themes}*/}
        {/*</select>*/}
        {/*<textarea name="scientific_research" id="scientific_research" maxLength="1000"*/}
        {/*placeholder="Зміст виконаної роботи (до 1000 знаків)"/>*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*<div className="plus-btn" onClick={this.addItem}>*/}
        {/*<img src="images/plus.png"/>*/}
        {/*</div>*/}
        {/*</div>*/}
        {/*</div>*/}

        {/*<div className="IR-item">*/}
        {/*<div className="input-container">*/}
        {/*<p>участь у виконанні індивідуальних або колективних грантів</p>*/}
        {/*<p className="add-info">окрім грантів на поїздки</p>*/}
        {/*<textarea name="participation_in_grant" id="participation_in_grant"*/}
        {/*placeholder="Заповніть дане поле..."/>*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*<div className="plus-btn">*/}
        {/*<img src="images/plus.png"/>*/}
        {/*</div>*/}
        {/*</div>*/}
        {/*</div>*/}

        {/*<Col xs={4} md={3} className="row-column">*/}
        {/*<span>Всього</span>*/}
        {/*<input type="text" name="all_monographs_amount" id="all_monographs_amount"*/}
        {/*placeholder="Введіть число..."/>*/}
        {/*</Col>*/}

        {/*<Col xs={4} className="row-column">*/}
        {/*<span>Дата засідання</span>*/}
        {/*<input type="date" name="create_date" id="create_date"/>*/}
        {/*</Col>*/}
        {/*</div>*/}

        return (
            <div className="IR-item">
                {input}
                <div>
                    <div className="plus-btn">
                        <img src="images/plus.png"/>
                    </div>
                </div>
            </div>
        );
    }

}

export default InputField;
