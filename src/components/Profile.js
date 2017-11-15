import React, {Component} from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import {Col} from 'react-bootstrap';
import {ifStringEmpty, ifNotEmptyArray} from '../externalFunctions';

// import NotifyModal from './NofityModal';
import $ from 'jquery';

import './Profile.css';
import './NewIR.css';
import './InputField.css';

class NewIR extends Component {

    constructor() {
        super();
        this.state = {
            faculties: [],
            cathedras: [],
            faculty_id: 1,
            cathedra_id: 1,
            data: [],
            dropdownStyle: {
                backgroundImage: "url('images/arrow.png')",
                backgroundPosition: "97% center",
                backgroundRepeat: "no-repeat"
            }
        };
        // this.formSubmitted = this.formSubmitted.bind(this);
        // this.loadData = this.loadData.bind(this);
        this.updateFaculty = this.updateFaculty.bind(this);
        this.loadFaculty = this.loadFaculty.bind(this);
        this.loadCathedra = this.loadCathedra.bind(this);
    }

    componentDidMount() {
        // this.loadData();
        this.loadFaculty();
    }

    updateFaculty() {
        this.setState({
            faculty_id: $('.faculty_select').val(),
            cathedra_id: 1
        });

        this.loadCathedra($('.faculty_select').val());
    }

    loadCathedra(id) {
        const self = this;

        console.log(id);

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // fetch(`${BASEURL}/faculty/${faculty_id}/cathedra`, {
        //         method: 'GET',
        //         headers: myHeaders,
        //         credentials: 'same-origin'
        // })
        fetch(`./cathedra${id}.json`)
            .then((response) => response.json())
            .then((responseJson) => {

                const cathedras = [];

                responseJson.forEach(function (item) {

                    cathedras.push(
                        <option key={item.id} value={item.id}>{item.name}</option>
                    )

                });

                self.setState({cathedras: cathedras});
                $('.cathedra_select').val(self.state.cathedra_id);

            })
            .catch((error) => {
                console.log('error loading cathedras');
            });
    }


    loadFaculty() {
        const self = this;

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // fetch(`${BASEURL}faculty`, {
        //         method: 'GET',
        //         headers: myHeaders,
        //         credentials: 'same-origin'
        // })
        fetch('./faculty.json')
            .then((response) => response.json())
            .then((responseJson) => {

                const faculties = [];

                responseJson.forEach(function (item) {

                    faculties.push(
                        <option key={item.id} value={item.id}>{item.facultyName}</option>
                    );

                });

                self.setState({faculties: faculties});
                $('.faculty_select').val(self.state.faculty_id);

                console.log('here', self.state.faculty_id);

                self.loadCathedra(self.state.faculty_id);

            })
            .catch((error) => {
                console.log('error loading faculties');
            });
    }


    // loadData() {
    //     const data = {};
    //
    //     const myHeaders = new Headers();
    //     myHeaders.append("Content-Type", "application/json");
    //
    //     // fetch('https://23b325de.ngrok.io/report/6', {
    //     //     method: 'GET',
    //     //     headers: myHeaders,
    //     //     credentials: 'same-origin'
    //     // })
    //     fetch('./faculties.json')
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //
    //             // this.loadScientificManager();
    //
    //             for(let x in responseJson) {
    //
    //                 let input = $(`#${x}`);
    //
    //                 if( ifNotEmptyArray(responseJson[x]) ) {
    //                     data[x] = responseJson[x];
    //                 }
    //
    //                 if( x.includes("amount") || x === "protocol" ) {
    //
    //                     let val = responseJson[x];
    //
    //                     if(val !== null) {
    //                         input.val(val);
    //                     }
    //
    //                 } else if(x === "scientific_research") {
    //
    //                     if(ifNotEmptyArray(responseJson[x])) {
    //
    //                         const theme_ids = [];
    //
    //                         responseJson[x].forEach(function (item) {
    //
    //                             theme_ids.push(item.theme_id);
    //
    //                         });
    //
    //                         this.setState({
    //                             theme_id: theme_ids
    //                         });
    //                     }
    //
    //                 } else if ( (x === "create_date") ) {
    //
    //                     if(responseJson[x] !== null) {
    //                         document.getElementById("create_date").value = responseJson[x];
    //                     }
    //
    //                 }
    //
    //             }
    //
    //             this.setState({
    //                 data
    //             });
    //
    //         })
    //         .catch((error) => {
    //             console.log('new report');
    //         });
    // }


    render() {
        return (
            <div className="NewIR Profile">
                <div className="row">
                    <Col xs={10} xsOffset={1} lg={8} lgOffset={2}>
                        <h2 className="title">Профіль</h2>
                        {/*<form onSubmit={this.loadData} className="IR-form">*/}
                        <form className="IR-form">
                            <div className="IR-item">
                                <input type="text" placeholder="Ім'я" id="firstName"/>
                            </div>
                            <div className="IR-item">
                                <input type="text" placeholder="Прізвище" id="lastName"/>
                            </div>
                            <div className="IR-item">
                                <input type="text" placeholder="По батькові" id="middleName"/>
                            </div>
                            <div className="IR-item">
                                <input type="email" placeholder="Email" id="email"/>
                            </div>
                            <div className="IR-item">
                                <p className="info"><b>Факультет</b></p>
                                <select className="faculty_select" style={this.state.dropdownStyle}
                                        onChange={this.updateFaculty} required>
                                    {this.state.faculties}
                                </select>
                            </div>
                            <div className="IR-item">
                                <p className="info"><b>Кафедра</b></p>
                                <select className="cathedra_select" style={this.state.dropdownStyle} required>
                                    {this.state.cathedras}
                                </select>
                            </div>
                            <div className="IR-item">
                                <p className="info"><b>Дата народження</b></p>
                                <input type="date" id="birthDate" placeholder="dd/mm/yyyy"/>
                            </div>
                            <div className="IR-item">
                                <p className="info"><b>Позиція</b></p>
                                <select className="position_select" style={this.state.dropdownStyle} required>
                                    {this.state.faculties}
                                </select>
                                <input type="number" placeholder="Рік закінчення ВНЗ" id="graduationYear"
                                       className="margin-top-10"/>
                            </div>
                            <div className="IR-item">
                                <p className="info"><b>Науковий ступінь</b></p>
                                <div className="margin-top-10 col-xs-12">
                                    <input type="radio" value="Доктор наук" id="degree1"/>
                                    <label htmlFor="degree1">Доктор наук</label>
                                </div>
                                <input type="number" placeholder="Рік захисту" id="protectionYear"
                                       className="margin-top-10"/>
                            </div>
                            <div className="IR-item">
                                <p className="info"><b>Вчене звання</b></p>
                                <div className="margin-top-10">
                                    <input type="radio" value="Доцент" id="rank1"/>
                                </div>
                                <input type="number" placeholder="Рік присвоєння" id="assignmentYear"
                                       className="margin-top-10"/>
                            </div>

                            <div className="IR-item center">
                                <button type="submit" className="login-btn">Зберегти</button>
                            </div>
                        </form>
                    </Col>
                </div>
                {/*<NotifyModal/>*/}
            </div>
        );
    }

}

export default NewIR;
