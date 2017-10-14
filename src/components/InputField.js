import React, {Component} from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import {notifyModalShow, getRandomColor} from '../externalFunctions';

import NotifyModal from './NofityModal';
import $ from 'jquery';

import './NewIR.css';

class NewIR extends Component {

    constructor() {
        super();
        this.state = {
            heading: "Connect to Telegram",
            link: "connect-bot/send",
            action: "connect"
        };
        this.formSubmitted = this.formSubmitted.bind(this);
    }

    render() {

        let input;
        const placeholder = "Заповніть дане поле...";

        if(this.props.type === "textarea") {
            input = <textarea name={this.props.name} id={this.props.id} placeholder={placeholder} required={this.props.required}/>;
        } else {
            input = <input type={this.props.valueType} name={this.props.name} id={this.props.id} placeholder={placeholder}
                           required={this.props.required}/>

        }

        return (
            <div className="NewIR">
                <div className="row">
                    <Col xs={10} xsOffset={1} lg={8} lgOffset={2}>
                        {/*<p>*/}
                        {/*Open <a className="bot-connect" href="https://telegram.me/botfather" target="_blank">@Botfather</a>*/}
                        {/*in Telegram app, then enter <span*/}
                        {/*className="command">/newbot</span> and choose a name for your bot.*/}
                        {/*</p>*/}
                        <form onSubmit={this.formSubmitted} className="IR-form">
                            <h2 className="title">Науковий доробок</h2>

                            <p>участь у науково-дослідній тематиці кафедри(підрозділу): шифр, назва НДР (науковий керівник)</p>
                            <input type="text" name="Scientific Manager" id="scientificManager" placeholder="Заповніть дане поле..."
                                   required/>

                            <p>зміст виконаної роботи</p>
                            <p className="add-info">до 1000 знаків</p>
                            <textarea name="content" id="content" placeholder="Заповніть дане поле..."/>

                            <p>участь у виконанні індивідуальних або колективних грантів</p>
                            <p className="add-info">окрім грантів на поїздки</p>
                            <textarea name="participationInfo" id="participationInfo" placeholder="Заповніть дане поле..."/>

                            <p>наукові стажування</p>
                            <textarea name="scientificInternshipInfo" id="scientificInternshipInfo" placeholder="Заповніть дане поле..."/>

                            <p>наукове керівництво аспірантами, здобувачами, наукове консультування при написанні докторських консультацій</p>
                            <textarea name="managingAndConsultingInfo" id="managingAndConsultingInfo" placeholder="Заповніть дане поле..."/>

                            <p>захист дисертацій аспірантами, докторантами</p>
                            <p className="add-info">прізвище, назва дисертації, спеціальність, дата захисту, рік закінчення аспірантури, докторантури</p>
                            <textarea name="aspirantsAndDoctorantsThesisesInfo" id="aspirantsAndDoctorantsThesisesInfo" placeholder="Заповніть дане поле..."/>

                            <p>
                                керівництво студентською науковою роботою, керівництво студентськими гуртками, підготовка студентів для участі у
                                Всеукраїнських конкурсах студентських наукових робіт тощо
                            </p>
                            <textarea name="studentsManagement" id="studentsManagement" placeholder="Заповніть дане поле..."/>

                            <p>
                                спільні публікації зі студентами
                            </p>
                            <textarea name="publicationsWithStudents" id="publicationsWithStudents" placeholder="Заповніть дане поле..."/>


                            <h2 className="title">Публікації</h2>

                        </form>
                    </Col>
                </div>
                <NotifyModal/>
            </div>
        );
    }

}

export default NewIR;
