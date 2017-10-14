import React, {Component} from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import {Col} from 'react-bootstrap';
import {notifyModalShow, getRandomColor} from '../externalFunctions';
import {NavLink, withRouter} from 'react-router-dom';

import NotifyModal from './NofityModal';
import $ from 'jquery';

import './NewIR.css';

class NewIR extends Component {

    constructor() {
        super();
        this.state = {
            theme_id: 1,
            themes: [],
            data: {},
            dropdownStyle: {
                backgroundImage: "url('images/arrow.png')",
                backgroundPosition: "97% center",
                backgroundRepeat: "no-repeat"
            }
        };
        this.formSubmitted = this.formSubmitted.bind(this);
        this.loadData = this.loadData.bind(this);
        this.loadScientificManager = this.loadScientificManager.bind(this);
    }

    componentDidMount() {
        document.getElementById('create_date').valueAsDate = new Date();
        this.loadData();
    }

    ifNotEmptyArray(arr) {
        return (arr.length > 0);
    }


    loadData() {
        const data = {};

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        fetch('https://23b325de.ngrok.io/report/6', {
            method: 'GET',
            headers: myHeaders,
            credentials: 'same-origin'
        })
        // fetch('./data.json')
            .then((response) => response.json())
            .then((responseJson) => {

                this.loadScientificManager();

                // console.log(responseJson);

                for(let x in responseJson) {

                    let input = $(`#${x}`);

                    data[x] = responseJson[x];

                    // console.log(x);

                    if(x.includes("amount") ) {


                        let val = responseJson[x];

                        if(val !== null) {
                            input.val(val);
                        }

                    } else if(x === "scientific_research") {

                        if(this.ifNotEmptyArray(responseJson[x])) {
                            input.val(responseJson[x][0].value);

                            this.setState({
                                theme_id: responseJson[x][0].theme_id
                            });
                        }

                    } else if ( (x === "create_date") ) {

                        if(responseJson[x] !== null) {
                            document.getElementById("create_date").value = responseJson[x];
                        }

                    } else if(x !== "id"){

                        // console.log(x);
                        // console.log(responseJson[x]);
                        // console.log(responseJson[x][0]);
                        // console.log(x, 1);

                        if(responseJson[x].length > 0) {
                            // console.log(x, 111);
                            input.val(responseJson[x][0].value);
                        }

                    }

                    // $("textarea[name=" + x + "]").val(responseJson[x][0].value);
                    // console.log();
                }

                console.log(data);

                this.setState({
                    data
                });

                console.log(this.state.data);

            })
            .catch((error) => {
                console.log('new report');
            });
    }


    loadScientificManager() {
        const self = this;

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        fetch('https://23b325de.ngrok.io/theme', {
                method: 'GET',
                headers: myHeaders,
                credentials: 'same-origin'
        })
        // fetch('./scientificData.json')
            .then((response) => response.json())
            .then((responseJson) => {

                const themes = [];

                responseJson.forEach(function (item) {

                    themes.push(
                        <option key={item.id} value={item.id}>{item.name}</option>
                    )

                });

                self.setState({themes: themes});

                $('#theme_select').val(self.state.theme_id);

            })
            .catch((error) => {
                console.log('error loading topics');
            });
    }


    formSubmitted(e) {
        e.preventDefault();

        const self = this;

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const data = self.state.data;

        for(let x in data) {

            let input = $(`#${x}`);

            // console.log(x);

            if(x.includes("amount") ) {

                data[x] = input.val();

            } else if(x === "scientific_research") {

                if(data[x].length > 0) {

                    data[x][0].value = input.val();
                    data[x][0].theme_id = $('#theme_select').val();

                } else {

                    data[x] = [{
                        "value": input.val(),
                        "theme_id": $('#theme_select').val()
                    }]

                }

            } else if (x === "create_date") {

                data[x] = $("#create_date").val();

            } else if(x !== "id"){

                // console.log(data);

                // data[x][0] = input.val();

                if(data[x].length > 0) {

                    data[x][0].value = input.val();

                } else {

                    data[x] = [{
                        "value": input.val()
                    }]

                }

            }

            // $("textarea[name=" + x + "]").val(responseJson[x][0].value);
            // console.log();
        }

        console.log('submitting');

        console.log(self.state.data);

        fetch('https://23b325de.ngrok.io/report', {
                method: 'POST',
                headers: myHeaders,
                credentials: 'same-origin',
                body: JSON.stringify(self.state.data)
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
            <div className="NewIR">
                <div className="row">
                    <Col xs={10} xsOffset={1} lg={8} lgOffset={2}>
                        <form onSubmit={this.formSubmitted} className="IR-form">

                            <h2 className="title">Науковий доробок</h2>

                            <p>участь у науково-дослідній тематиці кафедри(підрозділу): шифр, назва НДР (науковий керівник)</p>
                            <select name="theme_select" id="theme_select" style={this.state.dropdownStyle} required>
                                {this.state.themes}
                            </select>

                            <p>зміст виконаної роботи</p>
                            <p className="add-info">до 1000 знаків</p>
                            <textarea name="scientific_research" id="scientific_research" maxLength="1000" placeholder="Заповніть дане поле..."/>

                            <p>участь у виконанні індивідуальних або колективних грантів</p>
                            <p className="add-info">окрім грантів на поїздки</p>
                            <textarea name="participation_in_grant" id="participation_in_grant" placeholder="Заповніть дане поле..."/>

                            <p>наукові стажування</p>
                            <textarea name="scientific_internship" id="scientific_internship" placeholder="Заповніть дане поле..."/>

                            <p>наукове керівництво аспірантами, здобувачами, наукове консультування при написанні докторських консультацій</p>
                            <textarea name="scientific_management" id="scientific_management" placeholder="Заповніть дане поле..."/>

                            <p>захист дисертацій аспірантами, докторантами</p>
                            <p className="add-info">прізвище, назва дисертації, спеціальність, дата захисту, рік закінчення аспірантури, докторантури</p>
                            <textarea name="defenses_by_asp_and_doc" id="defenses_by_asp_and_doc" placeholder="Заповніть дане поле..."/>

                            <p>
                                керівництво студентською науковою роботою, керівництво студентськими гуртками, підготовка студентів для участі у
                                Всеукраїнських конкурсах студентських наукових робіт тощо
                            </p>
                            <textarea name="students_scientific_management" id="students_scientific_management" placeholder="Заповніть дане поле..."/>

                            <p>
                                спільні публікації зі студентами
                            </p>
                            <textarea name="joint_publication" id="joint_publication" placeholder="Заповніть дане поле..."/>


                            <h2 className="title">Публікації</h2>

                            <div className="row table-row">
                                <Col xs={4} md={6} className="row-title">
                                    <span>Монографії</span>
                                </Col>
                                <Col xs={4} md={3} className="row-column">
                                    <span>Всього</span>
                                    <input type="text" name="all_monographs_amount" id="all_monographs_amount" placeholder="Введіть число..."/>
                                </Col>
                                <Col xs={4} md={3} className="row-column">
                                    <span>За звітний період</span>
                                    <input type="text" name="monographs_amount" id="monographs_amount" placeholder="Введіть число..."/>
                                </Col>
                            </div>

                            <div className="row table-row">
                                <Col xs={4} md={6} className="row-title">
                                    <span>Підручники</span>
                                </Col>
                                <Col xs={4} md={3} className="row-column">
                                    <span>Всього</span>
                                    <input type="text" name="all_textbooks_amount" id="all_textbooks_amount" placeholder="Введіть число..."/>
                                </Col>
                                <Col xs={4} md={3} className="row-column">
                                    <span>За звітний період</span>
                                    <input type="text" name="textbooks_amount" id="textbooks_amount" placeholder="Введіть число..."/>
                                </Col>
                            </div>

                            <div className="row table-row">
                                <Col xs={4} md={6} className="row-title">
                                    <span>Навчальні посібники</span>
                                </Col>
                                <Col xs={4} md={3} className="row-column">
                                    <span>Всього</span>
                                    <input type="text" name="all_tutorials_amount" id="all_tutorials_amount" placeholder="Введіть число..."/>
                                </Col>
                                <Col xs={4} md={3} className="row-column">
                                    <span>За звітний період</span>
                                    <input type="text" name="tutorials_amount" id="tutorials_amount" placeholder="Введіть число..."/>
                                </Col>
                            </div>

                            <div className="row table-row">
                                <Col xs={4} md={6} className="row-title">
                                    <span>Статті</span>
                                </Col>
                                <Col xs={4} md={3} className="row-column">
                                    <span>Всього</span>
                                    <input type="text" name="all_articles_amount" id="all_articles_amount" placeholder="Введіть число..."/>
                                </Col>
                                <Col xs={4} md={3} className="row-column">
                                    <span>За звітний період</span>
                                    <input type="text" name="articles_amount" id="articles_amount" placeholder="Введіть число..."/>
                                </Col>
                            </div>

                            <div className="row table-row">
                                <Col xs={4} md={6} className="row-title">
                                    <span>Інші наукові видання</span>
                                </Col>
                                <Col xs={4} md={3} className="row-column">
                                    <span>Всього</span>
                                    <input type="text" name="all_other_editions_amount" id="all_other_editions_amount" placeholder="Введіть число..."/>
                                </Col>
                                <Col xs={4} md={3} className="row-column">
                                    <span>За звітний період</span>
                                    <input type="text" name="other_editions_amount" id="other_editions_amount" placeholder="Введіть число..."/>
                                </Col>
                            </div>

                            <div className="row table-row">
                                <Col xs={4} md={6} className="row-title">
                                    <span>Тези доповідей на конференціях</span>
                                </Col>
                                <Col xs={4} md={3} className="row-column">
                                    <span>Всього</span>
                                    <input type="text" name="all_theses_amount" id="all_theses_amount" placeholder="Введіть число..."/>
                                </Col>
                                <Col xs={4} md={3} className="row-column">
                                    <span>За звітний період</span>
                                    <input type="text" name="theses_amount" id="theses_amount" placeholder="Введіть число..."/>
                                </Col>
                            </div>

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


                            <h2 className="title">Праці, що вийшли з друку за звітний період</h2>
                            <p className="subtitle">
                                бібліографічний опис згідно з державним стандартом
                            </p>

                            <p>монографії</p>
                            <textarea name="monograph_rp" id="monograph_rp" placeholder="Заповніть дане поле..."/>

                            <p>підручники</p>
                            <textarea name="textbook_rp" id="textbook_rp" placeholder="Заповніть дане поле..."/>

                            <p>навчальні посібники</p>
                            <textarea name="tutorial_rp" id="tutorial_rp" placeholder="Заповніть дане поле..."/>

                            <p>інші наукові видання</p>
                            <p className="add-info">словники, переклади наукових праць, наукові коментарі6 бібліографічні покажчики тощо</p>
                            <textarea name="other_edition_rp" id="other_edition_rp" placeholder="Заповніть дане поле..."/>

                            <p>статті у виданнях, які мають імпакт-фактор</p>
                            <textarea name="article_impactor" id="article_impactor" placeholder="Заповніть дане поле..."/>

                            <p>
                                статті в інших виданнях, які включені до міжнародних наукометричних баз даних Web of Science, Scopus
                            </p>
                            <textarea name="article_wss" id="article_wss" placeholder="Заповніть дане поле..."/>

                            <p>
                                статті в інших закордонних виданнях
                            </p>
                            <textarea name="article_international" id="article_international" placeholder="Заповніть дане поле..."/>

                            <p>
                                статті у фахових виданнях України
                            </p>
                            <textarea name="article_ukraine" id="article_ukraine" placeholder="Заповніть дане поле..."/>

                            <p>
                                статті в інших виданнях України
                            </p>
                            <textarea name="article_ukraine_other" id="article_ukraine_other" placeholder="Заповніть дане поле..."/>

                            <p>
                                тези доповідей на міжнародних конференціях
                            </p>
                            <textarea name="theses_ukraine" id="theses_ukraine" placeholder="Заповніть дане поле..."/>

                            <p>
                                тези доповідей на вітчизняних конференціях
                            </p>
                            <textarea name="theses_international" id="theses_international" placeholder="Заповніть дане поле..."/>

                            <p>
                                перелік міжнародних конференцій за кордоном, на яких представлено результати досліджень
                            </p>
                            <textarea name="international_conferences" id="international_conferences" placeholder="Заповніть дане поле..."/>


                            <h2 className="title">Праці, прийняті до друку</h2>

                            <p>монографії</p>
                            <textarea name="monograph" id="monograph" placeholder="Заповніть дане поле..."/>

                            <p>підручники</p>
                            <textarea name="textbook" id="textbook" placeholder="Заповніть дане поле..."/>

                            <p>навчальні посібники</p>
                            <textarea name="tutorial" id="tutorial" placeholder="Заповніть дане поле..."/>

                            <p>інші наукові видання</p>
                            <p className="add-info">словники, переклади наукових праць, наукові коментарі6 бібліографічні покажчики тощо</p>
                            <textarea name="other_edition" id="other_edition" placeholder="Заповніть дане поле..."/>

                            <p>статті</p>
                            <textarea name="article" id="article" placeholder="Заповніть дане поле..."/>


                            <h2 className="title">Патентно-ліцензійна діяльність</h2>

                            <p>заявки на винахід (корисну модель) (на видачу патенту на винахід (корисну модель))</p>
                            <textarea name="development_application" id="development_application" placeholder="Заповніть дане поле..."/>

                            <p>отримані патенти на винахід (корисну модель)</p>
                            <textarea name="development_patent" id="development_patent" placeholder="Заповніть дане поле..."/>


                            <h2 className="title">Інше</h2>

                            <p>рецензування та опанування дисертацій, відгуки на автореферати, експертні висновки</p>
                            <textarea name="reviews_and_feedback" id="reviews_and_feedback" placeholder="Заповніть дане поле..."/>

                            <p>членство у спеціалізованих вчених, експертних радах, редколегіях наукових журналів тощо</p>
                            <textarea name="membership" id="membership" placeholder="Заповніть дане поле..."/>

                            <p>інші види діяльності</p>
                            <textarea name="other_activity" id="other_activity" placeholder="Заповніть дане поле..."/>


                            <div className="row table-row">
                                <Col xs={4} className="row-title">
                                    <span>Звіт заслухано</span>
                                </Col>
                                <Col xs={4} className="row-column">
                                    <span>Дата засідання</span>
                                    <input type="date" name="create_date" id="create_date"/>
                                </Col>
                                <Col xs={4} className="row-column">
                                    <span>Номер протоколу</span>
                                    <input type="text" name="protocol" id="protocol" placeholder="Введіть номер..."/>
                                </Col>
                            </div>


                            <button type="submit" className="login-btn">Submit</button>
                            {/*<div className="text-center">*/}
                                {/*<NavLink to="/" className="restore-btn">&lt; Go Back</NavLink>*/}
                            {/*</div>*/}
                        </form>
                    </Col>
                </div>
                <NotifyModal/>
            </div>
        );
    }

}

export default withRouter(NewIR);
