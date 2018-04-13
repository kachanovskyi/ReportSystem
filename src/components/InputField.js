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
            },
            inputState: ''
        };
        this.addItem = this.addItem.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
        if (id === "scientific_research" || id === "scientific_research_global") {

            clone = parent.find($('.data-input').filter(function () {
                return $(this).attr("id") === id;
            })[0]).clone().removeClass('default');
            clone.find('.delete-icon').on("click", function () {
                $(this).parent().remove();
            });
            clone.find('textarea').val("");
            clone.find('select').val("");

            clone.insertAfter(
                parent.find($('.input-container .data-input')).last()
            );

        } else {

            parent = parent.find($('.input-container'));

            clone = $(parent.find('.data-input')[0]).clone().removeClass('default');
            clone.find('.delete-icon').on("click", function () {
                $(this).parent().remove();
            });
            clone.find('textarea').val("");
            clone.find('.pages').val("");

            clone.insertAfter(
                parent.find($('.input-container .data-input')).last()
            );

        }
    };

    handleChange = (event) => {
        this.setState({ inputState: event.target.value.replace(/[^\d.,]/g, '')             // numbers and decimals only
                    .replace(/(^[\d]{4})[\d]/, '$1')   // not more than 4 digits at the beginning
                    .replace(/([.,].*)[.,]/, '$1')         // decimal can’t exist more than once
                    .replace(/([.,][\d])./, '$1') });
    };

    render() {

        const info = this.props.info ? <p className="info">{this.props.info}</p> : "";
        const addInfo = this.props.addInfo ? <p className="add-info">{this.props.addInfo}</p> : "";

        let content, input;

        if (this.props.id === "scientific_research" || this.props.id === "scientific_research_global") {

            // console.log(this.props.id);
            // console.log(this.props.data);

            if (this.props.data) {

                content = this.props.data.map((item, index) => {

                    if (!ifStringEmpty(item.value)) {
                        return (
                            <div className={index ? "data-input" : "data-input default"} key={index} id={this.props.id}>
                                <span className="delete-icon" onClick={InputField.removeItem}>&#10005;</span>
                                <select className="theme_select" style={this.state.dropdownStyle} id={this.props.id}>
                                    {this.props.themes}
                                </select>
                                <textarea placeholder="Зміст виконаної роботи (до 1000 знаків)"
                                          defaultValue={item.value}/>
                            </div>);
                    } else {
                        return (
                            <div className="data-input default" key={index} id={this.props.id}>
                                <span className="delete-icon" onClick={InputField.removeItem}>&#10005;</span>
                                <select className="theme_select" style={this.state.dropdownStyle} id={this.props.id}>
                                    {this.props.themes}
                                </select>
                                <textarea placeholder="Зміст виконаної роботи (до 1000 знаків)"/>
                            </div>);
                    }

                });

            } else {

                content = <div className="data-input default" id={this.props.id}>
                    <span className="delete-icon" onClick={InputField.removeItem}>&#10005;</span>
                    <select className="theme_select" style={this.state.dropdownStyle} id={this.props.id}>
                        {this.props.themes}
                    </select>
                    <textarea placeholder="Зміст виконаної роботи (до 1000 знаків)"/>
                </div>;

            }

            input = <div className="input-container">
                {info}
                {content}
            </div>;

        } else {

            if (this.props.data && ifNotEmptyArray(this.props.data) && this.props.inputType === "extended") {

                content = this.props.data.map((item, index) => {
                    return (
                        <div className={index ? "data-input extended" : "data-input default extended"} key={index}>
                            <span className="delete-icon" onClick={InputField.removeItem}>&#10005;</span>
                            <textarea placeholder="Зміст виконаної роботи (до 1000 знаків)" defaultValue={item.value}/>
                            <input type="number" onKeyPress={this.checkForPattern} pattern="^[+-]?([0-9]*[.])?[0-9]+$"
                                   step="0.1" min="0" className="pages" placeholder="Обсяг. друк. арк. автора"
                                   defaultValue={item.pages}/>
                        </div>
                    );
                });
            } else if (this.props.inputType === "extended") {
                content = <div className="data-input default extended">
                    <span className="delete-icon" onClick={InputField.removeItem}>&#10005;</span>
                    <textarea placeholder="Бібліографічний опис згідно з державним стандартом (до 1000 знаків)"/>
                    <input type="text" value={this.state.inputState} onChange={this.handleChange} step="0.1" min="0"
                           className="pages"
                           placeholder="Обсяг друк. арк. автора"/>
                </div>

            } else if (this.props.data && ifNotEmptyArray(this.props.data)) {

                if (this.props.id === "article_impactor" || this.props.id === "article_wss" || this.props.id === "article_international"
                    || this.props.id === "article_ukraine" || this.props.id === "article_ukraine_other" || this.props.id === "theses_ukraine"
                    || this.props.id === "theses_international") {
                    content = this.props.data.map((item, index) => {
                        return (
                            <div className={index ? "data-input" : "data-input default"} key={index}>
                                <span className="delete-icon" onClick={InputField.removeItem}>&#10005;</span>
                                <textarea key={index}
                                          placeholder="Бібліографічний опис згідно з державним стандартом (до 1000 знаків)"
                                          defaultValue={item.value}/>
                            </div>
                        );
                    });
                } else if (this.props.id === "international_conferences") {
                    content = this.props.data.map((item, index) => {
                        return (
                            <div className={index ? "data-input" : "data-input default"} key={index}>
                                <span className="delete-icon" onClick={InputField.removeItem}>&#10005;</span>
                                <textarea key={index}
                                          placeholder="Назва конференції, час та місце проведення (до 1000 знаків)"
                                          defaultValue={item.value}/>
                            </div>
                        );
                    });
                } else {
                    // content = this.props.data.reverse().map((item, index) => {
                    content = this.props.data.map((item, index) => {
                        return (
                            <div className={index ? "data-input" : "data-input default"} key={index}>
                                <span className="delete-icon" onClick={InputField.removeItem}>&#10005;</span>
                                <textarea key={index} placeholder="Зміст виконаної роботи (до 1000 знаків)"
                                          defaultValue={item.value}/>
                            </div>
                        );
                    });
                }

            } else {
                if (this.props.id === "article_impactor" || this.props.id === "article_wss" || this.props.id === "article_international"
                    || this.props.id === "article_ukraine" || this.props.id === "article_ukraine_other" || this.props.id === "theses_ukraine"
                    || this.props.id === "theses_international") {
                    content = <div className="data-input default">
                        <span className="delete-icon" onClick={InputField.removeItem}>&#10005;</span>
                        <textarea placeholder="Бібліографічний опис згідно з державним стандартом (до 1000 знаків)"/>
                    </div>
                } else if (this.props.id === "international_conferences") {
                    content = <div className="data-input default">
                        <span className="delete-icon" onClick={InputField.removeItem}>&#10005;</span>
                        <textarea placeholder="Назва конференції, час та місце проведення (до 1000 знаків)"/>
                    </div>
                } else {
                    content = <div className="data-input default">
                        <span className="delete-icon" onClick={InputField.removeItem}>&#10005;</span>
                        <textarea placeholder="Зміст виконаної роботи (до 1000 знаків)"/>
                    </div>
                }
            }

            input = <div className="input-container">
                {info}
                {addInfo}
                {content}
            </div>;

        }

        if (this.props.id === "scientific_research" || this.props.id === "scientific_research_global") {
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
        } else {
            return (
                <div className="IR-item" id={this.props.id}>
                    {input}
                </div>
            );
        }
    }

}

export default InputField;
