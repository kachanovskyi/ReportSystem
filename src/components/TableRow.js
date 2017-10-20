import React, {Component} from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import {Col} from 'react-bootstrap';
import {ifStringEmpty, ifNotEmptyArray, notifyModalShow, getRandomColor} from '../externalFunctions';

import NotifyModal from './NofityModal';
import $ from 'jquery';

import './TableRow.css';

class TableRow extends Component {

    constructor() {
        super();
        this.state = {

        };
        // this.formSubmitted = this.formSubmitted.bind(this);
        // this.loadData = this.loadData.bind(this);
        // this.loadScientificManager = this.loadScientificManager.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    componentDidMount() {
        // document.getElementById('create_date').valueAsDate = new Date();
        // this.loadData();

        // $('.NewIR textarea').on("blur", function () {
        //
        //     const content = $(this).val(),
        //         plusBtn = $(this).parent().parent().find('.plus-btn');
        //
        //     if (ifStringEmpty(content)) {
        //         plusBtn.removeClass('pulse');
        //         console.log($(this).parent().parent().find('.plus-btn'));
        //     } else {
        //         plusBtn.addClass('pulse');
        //     }
        //
        // });
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

        if(this.props.id = "scientific_research") {

            input = <div className="input-container" id={this.props.id}>
                {info}
                {addInfo}
                <select name="theme_select" id="theme_select" style={this.state.dropdownStyle} required>
                    {this.props.themes}
                </select>
                <textarea maxLength="1000" placeholder="Зміст виконаної роботи (до 1000 знаків)"/>
            </div>;

        } else if(this.props.inputType = "input") {

            input = <div className="input-container" id={this.props.id}>
                {info}
                {addInfo}
                <textarea placeholder="Заповніть дане поле..."/>
            </div>;

        }

        return (

            <div className="IR-item">
                <div className="row table-row">
                    <Col xs={4} md={6} className="row-title">
                        <span>Патенти</span>
                    </Col>
                    <Col xs={4} md={3} className="row-column">
                        <span>Всього</span>
                        <input type="text" name="all_patents_amount" id="all_patents_amount" placeholder="Введіть число..."/>
                    </Col>
                    <Col xs={4} md={3} className="row-column">
                        <span>За звітний період</span>
                        <input type="text" name="patents_amount" id="patents_amount" placeholder="Введіть число..."/>
                    </Col>
                </div>
            </div>

        );
    }

}

export default TableRow;
