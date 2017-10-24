import React, {Component} from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import {ifStringEmpty, ifNotEmptyArray} from '../externalFunctions';

import $ from 'jquery';

import './InputField.css';

class InputField extends Component {

    constructor() {
        super();
        this.state = {
            themes: [],
            data: [],
            dropdownStyle: {
                backgroundImage: "url('images/arrow.png')",
                backgroundPosition: "97% center",
                backgroundRepeat: "no-repeat"
            }
        };
        this.addItem = this.addItem.bind(this);
    }

    addItem({target}) {
        InputField.addIRItem($(target), this.props.id);
    }

    static removeItem({target}) {
        $(target).parent().remove();
    }

    static addIRItem(target, id) {

        let clone,
            parent = target.parent().parent().parent();

        if(id === "scientific_research") {

            clone = parent.find($('.data-input')[0]).clone().removeClass('default');
            clone.find('.delete-icon').on("click", function() {
                $(this).parent().remove();
            });
            clone.find('textarea').val("");

            clone.insertBefore(
                parent.find($('.input-container .data-input'))[0]
            );

        } else {

            parent = parent.find($('.input-container'));

            clone = $(parent.find('.data-input')[0]).clone().removeClass('default');
            clone.find('.delete-icon').on("click", function() {
                $(this).parent().remove();
            });
            clone.find('textarea').val("");
            clone.find('.pages').val("");

            clone.insertBefore(
                parent.find($('.input-container .data-input'))[0]
            );

        }
    };

    render() {

        const info = this.props.info ? <p className="info">{this.props.info}</p> : "";
        const addInfo = this.props.addInfo ? <p className="add-info">{this.props.addInfo}</p> : "";

        let content, input;

        if( this.props.id === "scientific_research") {

            if(this.props.data) {

                content = this.props.data.reverse().map((item, index) => {

                    if( !ifStringEmpty(item.value) ) {
                        return (
                            <div className={index === this.props.data.length - 1 ? "data-input default" : "data-input"} key={index}>
                                <span className="delete-icon" onClick={InputField.removeItem}>&#10005;</span>
                                <select className="theme_select" style={this.state.dropdownStyle} required>
                                    {this.props.themes}
                                </select>
                                <textarea placeholder="Зміст виконаної роботи (до 1000 знаків)" defaultValue={item.value}/>
                            </div>);
                    } else {
                        return(
                            <div className="data-input default">
                            <span className="delete-icon" onClick={InputField.removeItem}>&#10005;</span>
                            <select className="theme_select" style={this.state.dropdownStyle} required>
                                {this.props.themes}
                            </select>
                            <textarea placeholder="Зміст виконаної роботи (до 1000 знаків)"/>
                        </div>);
                    }

                });

            }

            input = <div className="input-container">
                {info}
                {content}
            </div>;

        } else {

            if( this.props.data && ifNotEmptyArray(this.props.data) && this.props.inputType === "extended") {

                content = this.props.data.reverse().map((item, index) => {
                    return (
                        <div className={index === this.props.data.length - 1 ? "data-input default extended" : "data-input extended"} key={index}>
                            <span className="delete-icon" onClick={InputField.removeItem}>&#10005;</span>
                            <textarea placeholder="Зміст виконаної роботи (до 1000 знаків)" defaultValue={item.value}/>
                            <input type="number" className="pages" placeholder="Обсяг. друк. арк." defaultValue={item.pages}/>
                        </div>
                    );
                });

            } else if(this.props.inputType === "extended") {
                content = <div className="data-input default extended">
                    <span className="delete-icon" onClick={InputField.removeItem}>&#10005;</span>
                    <textarea placeholder="Зміст виконаної роботи (до 1000 знаків)"/>
                    <input type="number" className="pages" placeholder="Обсяг. друк. арк."/>
                </div>

            } else if( this.props.data && ifNotEmptyArray(this.props.data) ) {

                content = this.props.data.reverse().map((item, index) => {
                    return (
                        <div className={index === this.props.data.length - 1 ? "data-input default" : "data-input"} key={index}>
                            <span className="delete-icon" onClick={InputField.removeItem}>&#10005;</span>
                            <textarea key={index} placeholder="Зміст виконаної роботи (до 1000 знаків)" defaultValue={item.value}/>
                        </div>
                    );
                });

            } else {
                content = <div className="data-input default">
                    <span className="delete-icon" onClick={InputField.removeItem}>&#10005;</span>
                    <textarea placeholder="Зміст виконаної роботи (до 1000 знаків)"/>
                </div>

            }

            input = <div className="input-container">
                {info}
                {addInfo}
                {content}
            </div>;

        }

        return (
            <div className="IR-item" id={this.props.id}>
                {input}
                <div>
                    <div className="plus-btn">
                        <img src="images/plus.png" alt="plus image" onClick={this.addItem}/>
                    </div>
                </div>
            </div>
        );
    }

}

export default InputField;
