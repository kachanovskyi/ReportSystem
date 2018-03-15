import React, {Component} from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import {Col} from 'react-bootstrap';
import {ifStringEmpty, ifNotEmptyArray, BASEURL} from '../externalFunctions';

// import NotifyModal from './NofityModal';
import $ from 'jquery';

import './Profile.css';
import './NewIR.css';
import './InputField.css';

class Profile extends Component {

    constructor() {
        super();
        this.state = {
            email: "",
            password: null,
            name: "",
            lastName: "",
            fathersName: "",
            birthDate: "",
            graduationDate: "",
            awardingDate: "",
            defenseYear: "",

            position: 1,
            degree: 1,
            scienceDegree: 1,
            academicStatus: 1,
            faculty: 1,
            cathedra: 1,

            faculties: [],
            cathedras: [],
            academicStatuses: [],
            scienceDegrees: [],
            positions: [],

            dropdownStyle: {
                backgroundImage: "url('images/arrow.png')",
                backgroundPosition: "97% center",
                backgroundRepeat: "no-repeat"
            }
        };

        this.formSubmitted = this.formSubmitted.bind(this);
        this.loadUser = this.loadUser.bind(this);
        this.updateFaculty = this.updateFaculty.bind(this);
        this.loadFaculty = this.loadFaculty.bind(this);
        this.loadCathedra = this.loadCathedra.bind(this);
        this.loadProperty = this.loadProperty.bind(this);
    }

    componentDidMount() {
        this.loadUser();
    }

    updateFaculty() {
        this.setState({
            faculty: $('.faculty_select').val(),
            cathedra: 1
        });

        this.loadCathedra($('.faculty_select').val());
    }

    loadProperty() {
        const self = this;

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        fetch(`${BASEURL}properties`, {
                method: 'GET',
                headers: myHeaders,
                credentials: 'same-origin'
        })
        // fetch('./properties.json')
            .then((response) => response.json())
            .then((responseJson) => {

                const academicStatuses = [],
                    scienceDegrees = [],
                    positions = [];

                responseJson["academicStatuses"].forEach(function (item) {
                    academicStatuses.push({
                        id: item.id,
                        value: item.value
                    });
                });

                responseJson["scienceDegrees"].forEach(function (item) {
                    scienceDegrees.push({
                        id: item.id,
                        value: item.value
                    });
                });

                responseJson["positions"].forEach(function (item) {
                    positions.push(
                        <option key={item.id} value={item.id}>{item.value}</option>
                    )
                });

                self.setState({
                    academicStatuses: academicStatuses,
                    scienceDegrees: scienceDegrees,
                    positions: positions
                });

                $('.position_select').val(self.state.position);
                // $(`input[name=scienceDegree][value=${this.state.scienceDegree}]`).prop("checked",true);

                $('#graduationDate').val(this.state.graduationDate);
                $('#awardingDate').val(this.state.awardingDate);
                $('#defenseYear').val(this.state.defenseYear);
                $(`#scienceDegree${this.state.scienceDegree}`).prop("checked",true);
                $(`#academicStatus${this.state.academicStatus}`).prop("checked",true);

                // $('input[name=academicStatus]:checked', '#userForm').val();
                // $('input[name=scienceDegree]:checked', '#userForm').val();

            })
            .catch((error) => {
                console.log('error loading properties\n', error);
            });
    }

    loadCathedra(id) {
        const self = this;

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        fetch(`${BASEURL}faculty/${id}/cathedra`, {
                method: 'GET',
                headers: myHeaders,
                credentials: 'same-origin'
        })
        // fetch(`./cathedra${id}.json`)
            .then((response) => response.json())
            .then((responseJson) => {

                const cathedras = [];

                responseJson.forEach(function (item) {

                    cathedras.push(
                        <option key={item.id} value={item.id}>{item.name}</option>
                    )

                });

                self.setState({cathedras: cathedras});
                $('.cathedra_select').val(self.state.cathedra);

            })
            .catch((error) => {
                console.log('error loading cathedras\n', error);
            });
    }


    loadFaculty() {
        const self = this;

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        fetch(`${BASEURL}faculty`, {
                method: 'GET',
                headers: myHeaders,
                credentials: 'same-origin'
        })
        // fetch('./faculty.json')
            .then((response) => response.json())
            .then((responseJson) => {

                const faculties = [];

                responseJson.forEach(function (item) {

                    faculties.push(
                        <option key={item.id} value={item.id}>{item.facultyName}</option>
                    );

                });

                self.setState({faculties: faculties});
                $('.faculty_select').val(self.state.faculty);

                self.loadCathedra(self.state.faculty);

            })
            .catch((error) => {
                console.log('error loading faculties');
            });
    }


    loadUser() {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        fetch(`${BASEURL}/user`, {
            method: 'GET',
            headers: myHeaders,
            credentials: 'same-origin'
        })
        // fetch('./user.json')
            .then((response) => response.json())
            .then((responseJson) => {

                for(let x in responseJson) {

                    this.setState({
                        [x]: responseJson[x]
                    });

                    if(x === "birthDate") {
                        $('#birthDate').val(responseJson[x]);
                    }

                }

                this.loadFaculty();
                this.loadProperty();


            })
            .catch((error) => {
                console.log('new report\n', error);
            });
    }


    formSubmitted(e) {
        e.preventDefault();

        const self = this;

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const data = {
            email: $("#email").val(),
            password: null,
            name: $("#name").val(),
            lastName: $("#lastName").val(),
            fathersName: $("#fathersName").val(),
            birthDate: $("#birthDate").val(),
            graduationDate: $("#graduationDate").val(),
            awardingDate: $("#awardingDate").val(),
            defenseYear: $("#defenseYear").val(),
            position: $(".position_select").val(),
            scienceDegree: $('input[name=scienceDegree]:checked', '#userForm').val(),
            academicStatus: $('input[name=academicStatus]:checked', '#userForm').val(),
            faculty: $('.faculty_select').val(),
            cathedra: $('.cathedra_select').val()
        };

        // console.log(data);
        fetch(`${BASEURL}user`, {
                method: 'POST',
                headers: myHeaders,
                credentials: 'same-origin',
                body: JSON.stringify(data)
            }
        )
            // .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });

        return false;
    };


    render() {
        return (
            <div className="NewIR Profile">
                <div className="row">
                    <Col xs={10} xsOffset={1} lg={8} lgOffset={2}>
                        <h2 className="title">Профіль</h2>
                        <form onSubmit={this.formSubmitted} className="IR-form" id="userForm">
                        {/*<form className="IR-form">*/}
                            <div className="IR-item">
                                <input type="text" placeholder="Ім'я" id="name" value={this.state.name}/>
                            </div>
                            <div className="IR-item">
                                <input type="text" placeholder="Прізвище" id="lastName" value={this.state.lastName}/>
                            </div>
                            <div className="IR-item">
                                <input type="text" placeholder="По батькові" id="fathersName" value={this.state.fathersName}/>
                            </div>
                            <div className="IR-item">
                                <input type="email" placeholder="Email" id="email" value={this.state.email}/>
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
                                <input type="date" id="birthDate" placeholder="mm/dd/yyyy"/>
                            </div>
                            <div className="IR-item">
                                <p className="info"><b>Позиція</b></p>
                                <select className="position_select" style={this.state.dropdownStyle} required>
                                    {this.state.positions}
                                </select>
                                <input type="number" placeholder="Рік закінчення ВНЗ" id="graduationDate"
                                       className="margin-top-10"/>
                            </div>
                            <div className="IR-item">
                                <p className="info"><b>Науковий ступінь</b></p>
                                <div className="margin-top-10 text-left">
                                    {this.state.academicStatuses.map((status, index) => (
                                        <div key={status.id}>
                                            <input type="radio" name="academicStatus" value={status.id} id={`academicStatus${status.id}`}/>
                                            <label htmlFor={`academicStatus${status.id}`}>{status.value}</label>
                                        </div>
                                     ))}
                                </div>
                                <input type="number" placeholder="Рік захисту" id="defenseYear"
                                       className="margin-top-10"/>
                            </div>
                            <div className="IR-item">
                                <p className="info"><b>Вчене звання</b></p>

                                <div className="margin-top-10 text-left">
                                    {this.state.scienceDegrees.map((degree, index) => (
                                        <div key={degree.id}>
                                            <input type="radio" name="scienceDegree" value={degree.id} id={`scienceDegree${degree.id}`}/>
                                            <label htmlFor={`scienceDegree${degree.id}`}>{degree.value}</label>
                                        </div>
                                    ))}
                                </div>
                                <input type="number" placeholder="Рік присвоєння" id="awardingDate"
                                       className="margin-top-10"/>
                            </div>

                            <div className="IR-item center">
                                <button type="submit" className="login-btn">Зберегти</button>
                            </div>
                        </form>
                    </Col>
                </div>
            </div>
        );
    }

}

export default Profile;
