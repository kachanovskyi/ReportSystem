import React, {Component} from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import {Col} from 'react-bootstrap';
import {ifStringEmpty, ifNotEmptyArray, notifyModalShow, getRandomColor} from '../externalFunctions';

import NotifyModal from './NofityModal';
import $ from 'jquery';

import './InputTableRow.css';

class InputTableRow extends Component {

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
    }

    componentDidMount() {
        if(this.props.id === "create_date") {
            document.getElementById('create_date').valueAsDate = new Date();
        }
    }

    render() {

        const firstColTitle = this.props.firstColTitle !== undefined ? this.props.firstColTitle : "Всього",
            secondColTitle = this.props.secondColTitle !== undefined ? this.props.secondColTitle : "За звітний період";

        let firstPlaceholder = "Введіть число...",
            secondPlaceholder = "Введіть число...";

        let type = "text";

        if(this.props.id === "create_date") {
            type = "date";
            firstPlaceholder = "";
            secondPlaceholder = "Введіть номер...";
        }

        return (
            <div className="row table-row">
                <Col xs={4} md={6} className="row-title">
                    <span>{this.props.title}</span>
                </Col>
                <Col xs={4} md={3} className="row-column">
                    <span>{firstColTitle}</span>
                    <input type={type} id={this.props.firstId} placeholder={firstPlaceholder}/>
                </Col>
                <Col xs={4} md={3} className="row-column">
                    <span>{secondColTitle}</span>
                    <input type="text" id={this.props.secondId} placeholder={secondPlaceholder}/>
                </Col>
            </div>
        );
    }

}

export default InputTableRow;
