import React, {Component} from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import {Col} from 'react-bootstrap';
import {ifStringEmpty, ifNotEmptyArray, notifyModalShow, getRandomColor} from '../externalFunctions';
import {NavLink, withRouter} from 'react-router-dom';

import NotifyModal from './NofityModal';
import $ from 'jquery';

import './NewIR.css';

import InputField from "./InputField";
import InputTableRow from "./InputTableRow";

class NewIR extends Component {

    constructor() {
        super();
        this.state = {
            theme_id: [],
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
        this.loadData();
    }


    loadData() {
        const data = {};

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // fetch('https://23b325de.ngrok.io/report/6', {
        //     method: 'GET',
        //     headers: myHeaders,
        //     credentials: 'same-origin'
        // })
        fetch('./data.json')
            .then((response) => response.json())
            .then((responseJson) => {

                this.loadScientificManager();

                for(let x in responseJson) {

                    let input = $(`#${x}`);

                    data[x] = responseJson[x];

                    if(x.includes("amount") ) {

                        let val = responseJson[x];

                        if(val !== null) {
                            input.val(val);
                        }

                    } else if(x === "scientific_research") {

                        if(ifNotEmptyArray(responseJson[x])) {
                            input.val(responseJson[x][0].value);
                            
                            const theme_ids = [];
                            
                            responseJson[x].forEach(function (item) {
                                theme_ids.push(item.theme_id);
                            });

                            this.setState({
                                theme_id: theme_ids
                            });
                        }

                    } else if ( (x === "create_date") ) {

                        if(responseJson[x] !== null) {
                            document.getElementById("create_date").value = responseJson[x];
                        }

                    } else if(x !== "id"){

                        if(responseJson[x].length > 0) {
                            input.val(responseJson[x][0].value);
                        }

                    }

                }

                this.setState({
                    data
                });

            })
            .catch((error) => {
                console.log('new report');
            });
    }


    loadScientificManager() {
        const self = this;

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // fetch('https://23b325de.ngrok.io/theme', {
        //         method: 'GET',
        //         headers: myHeaders,
        //         credentials: 'same-origin'
        // })
        fetch('./scientificData.json')
            .then((response) => response.json())
            .then((responseJson) => {

                const themes = [];

                responseJson.forEach(function (item) {

                    themes.push(
                        <option key={item.id} value={item.id}>{item.name}</option>
                    )

                });

                self.setState({themes: themes});

                $('.theme_select').each(function (index) {
                    $(this).val(self.state.theme_id[index]);
                    // console.log(self.state.theme_id[index]);
                });

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

                            {/*<div className="IR-item">*/}
                                {/*<div className="input-container">*/}
                                    {/*<p>участь у науково-дослідній тематиці кафедри(підрозділу): шифр, назва НДР (науковий керівник)</p>*/}
                                    {/*<select name="theme_select" id="theme_select" style={this.state.dropdownStyle} required>*/}
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

                            <InputField id="scientific_research" themes={this.state.themes}
                                        info="участь у науково-дослідній тематиці кафедри(підрозділу): шифр, назва НДР (науковий керівник)"/>

                            <InputField id="participation_in_grant"
                                        info="участь у виконанні індивідуальних або колективних грантів" addInfo="окрім грантів на поїздки"/>

                            <InputField id="scientific_internship" info="наукові стажування"/>

                            <InputField id="scientific_management"
                                        info="наукове керівництво аспірантами, здобувачами, наукове консультування при написанні докторських консультацій"/>

                            <InputField id="defenses_by_asp_and_doc"
                                        info="захист дисертацій аспірантами, докторантами"
                                        addInfo="прізвище, назва дисертації, спеціальність, дата захисту, рік закінчення аспірантури, докторантури"/>

                            <InputField id="students_scientific_management"
                                        info="керівництво студентською науковою роботою, керівництво студентськими гуртками, підготовка студентів для участі у
                                Всеукраїнських конкурсах студентських наукових робіт тощо"/>

                            <InputField id="joint_publication"
                                        info="спільні публікації зі студентами"/>


                            <h2 className="title">Публікації</h2>

                            <InputField id="joint_publication"
                                        info="спільні публікації зі студентами"/>

                            <InputTableRow title="Монографії" firstId="all_monographs_amount" secondId="monographs_amount"/>

                            <InputTableRow title="Підручники" firstId="all_textbooks_amount" secondId="textbooks_amount"/>

                            <InputTableRow title="Навчальні посібники" firstId="all_tutorials_amount" secondId="tutorials_amount"/>

                            <InputTableRow title="Статті" firstId="all_articles_amount" secondId="articles_amount"/>

                            <InputTableRow title="Інші наукові видання" firstId="all_other_editions_amount" secondId="other_editions_amount"/>

                            <InputTableRow title="Тези доповідей на конференціях" firstId="all_theses_amount" secondId="theses_amount"/>

                            <InputTableRow title="Патенти" firstId="all_patents_amount" secondId="patents_amount"/>


                            <h2 className="title">Праці, що вийшли з друку за звітний період</h2>
                            <p className="subtitle">
                                бібліографічний опис згідно з державним стандартом
                            </p>

                            <InputField id="monograph_rp" info="монографії"/>

                            <InputField id="textbook_rp" info="підручники"/>

                            <InputField id="tutorial_rp" info="навчальні посібники"/>

                            <InputField id="other_edition_rp" info="інші наукові видання"
                                        addInfo="словники, переклади наукових праць, наукові коментарі6 бібліографічні покажчики тощо"/>

                            <InputField id="article_impactor" info="статті у виданнях, які мають імпакт-фактор"/>

                            <InputField id="article_wss"
                                        info="статті в інших виданнях, які включені до міжнародних наукометричних баз даних Web of Science, Scopus"/>

                            <InputField id="article_international"
                                        info="статті в інших закордонних виданнях"/>

                            <InputField id="article_ukraine"
                                        info="статті у фахових виданнях України"/>

                            <InputField id="article_ukraine_other"
                                        info="статті в інших виданнях України"/>

                            <InputField id="theses_ukraine"
                                        info="тези доповідей на міжнародних конференціях"/>

                            <InputField id="theses_international"
                                        info="тези доповідей на вітчизняних конференціях"/>

                            <InputField id="international_conferences"
                                        info="перелік міжнародних конференцій за кордоном, на яких представлено результати досліджень"/>


                            <h2 className="title">Праці, прийняті до друку</h2>

                            <InputField id="monograph" info="монографії"/>

                            <InputField id="textbook" info="підручники"/>

                            <InputField id="tutorial" info="навчальні посібники"/>

                            <InputField id="other_edition" info="інші наукові видання"
                                        addInfo="словники, переклади наукових праць, наукові коментарі, бібліографічні покажчики тощо"/>

                            <InputField id="article" info="статті"/>


                            <h2 className="title">Патентно-ліцензійна діяльність</h2>

                            <InputField id="development_application"
                                        info="заявки на винахід (корисну модель) (на видачу патенту на винахід (корисну модель))"/>

                            <InputField id="development_patent"
                                        info="отримані патенти на винахід (корисну модель)"/>


                            <h2 className="title">Інше</h2>

                            <InputField id="reviews_and_feedback"
                                        info="рецензування та опанування дисертацій, відгуки на автореферати, експертні висновки"/>

                            <InputField id="membership"
                                        info="членство у спеціалізованих вчених, експертних радах, редколегіях наукових журналів тощо"/>

                            <InputField id="other_activity"
                                        info="інші види діяльності"/>

                            <InputTableRow title="Звіт заслухано" firstId="create_date" secondId="protocol"/>


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
