import React, {Component} from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import {Col} from 'react-bootstrap';
import {ifStringEmpty, ifNotEmptyArray, BASEURL} from '../externalFunctions';

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
            data: {}
        };
        this.formSubmitted = this.formSubmitted.bind(this);
        this.loadData = this.loadData.bind(this);
        // this.reportDownload = this.reportDownload.bind(this);
        this.loadScientificManager = this.loadScientificManager.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    // reportDownload() {
    //     const myHeaders = new Headers();
    //     myHeaders.append("Content-Type", "application/json");
    //
    //     // fetch(`${BASEURL}report/download`, {
    //     //         method: 'GET',
    //     //         headers: myHeaders,
    //     //         credentials: 'same-origin'
    //     // })
    //     fetch(`./cathedra${id}.json`)
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //             console.log(responseJson);
    //         })
    //         .catch((error) => {
    //             console.log('error loading file\n', error);
    //         });
    // }


    loadData() {
        const data = {};

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        fetch(`${BASEURL}report/`, {
            method: 'GET',
            headers: myHeaders,
            credentials: 'same-origin'
        })
        // fetch('./data1.json')
            .then((response) => response.json())
            .then((responseJson) => {

                this.loadScientificManager();

                for(let x in responseJson) {

                    let input = $(`#${x}`);
                    // console.log(x);
                    // console.log(responseJson[x]);

                    // if( ifNotEmptyArray(responseJson[x]) ) {
                        data[x] = responseJson[x];
                    // }

                    if( x.includes("amount") || x === "protocol" ) {

                        let val = responseJson[x];

                        if(val !== null) {
                            input.val(val);
                        }

                    } else if(x === "scientific_research") {

                        if(ifNotEmptyArray(responseJson[x])) {

                            const theme_ids = [];

                            responseJson[x].forEach(function (item) {

                                theme_ids.push(item.theme_id);

                            });

                            this.setState({
                                theme_id: theme_ids
                            });
                        } else {

                            data[x] = [{
                                "value": input.val(),
                                "theme_id": +$('#theme_select').val()
                            }]

                        }

                    } else if( (x === "create_date") ) {

                        if(responseJson[x] !== null) {
                            document.getElementById("create_date").value = responseJson[x];
                        }

                    } else if(x === "id") {
                        data[x] = responseJson[x];
                    }

                }

                this.setState({
                    data
                });

            })
            .catch((error) => {
                console.log(error);
                console.log('new report');
            });
    }


    loadScientificManager() {
        const self = this;

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        fetch(`${BASEURL}theme`, {
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

                $('.theme_select').each(function (index) {
                    if(self.state.theme_id[index]) {
                        $(this).val(self.state.theme_id[index]);
                    } else {
                        $(this).val(1);
                    }
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

            if(x.includes("amount") || x === "protocol" || x === "create_date" ) {

                data[x] = input.val();

            } else if(x === "scientific_research") {

                if(!ifNotEmptyArray(data[x])) {
                    data[x] = [{
                        "value": input.val(),
                        "theme_id": +$('#theme_select').val()
                    }]
                }

                if(ifNotEmptyArray(data[x])) {

                    let lastIndex = null;

                    // $(input.find( $('.data-input') ).get().reverse()).each((index, item) => {
                    input.find( $('.data-input')).each((index, item) => {

                        const content = $(item).find('textarea').val(),
                            theme_id = +$(item).find('.theme_select').val();

                        if( (data[x][index]) ) {

                            data[x][index].value = content;
                            data[x][index].theme_id = theme_id;

                        } else  {
                            data[x][index] = {
                                value: content,
                                theme_id: theme_id
                            }
                        }

                        lastIndex = index;

                    });

                    if(lastIndex !== null) {
                        data[x].splice(lastIndex + 1);
                    }

                }
                // else {
                //
                //     data[x] = [{
                //         "value": input.val(),
                //         "theme_id": +$('#theme_select').val()
                //     }]
                //
                // }

            } else if(x !== "id") {

                if(data[x] && ifNotEmptyArray(data[x])) {

                    let lastIndex = null;

                    // $(input.find( $('.data-input') ).get().reverse()).each((index, item) => {
                    input.find( $('.data-input')).each((index, item) => {

                        const content = $(item).find('textarea').val(),
                            pages = $(item).find( $('.pages') ).val();

                        if( (data[x][index]) ) {
                            data[x][index].value = content;

                            if(pages) {
                                data[x][index].pages = pages;
                            }
                        } else {
                            data[x][index] = {
                                value: content
                            };

                            if(pages) {
                                data[x][index].pages = pages;
                            }
                        }

                        lastIndex = index;

                    });

                    if(lastIndex !== null) {
                        data[x].splice(lastIndex + 1);
                    }

                } else {

                    data[x] = [{
                        "value": input.find('textarea').val(),
                    }]

                }

            }

        }

        console.log(this.state.data);
        fetch(`${BASEURL}/report`, {
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

                            <div className="title-container">
                                <h2 className="title">Науковий доробок</h2>
                                {/*<a className="download-btn" href="https://lnu.botscrew.com/report/download" target="_blank">Завантажити звіт</a>*/}
                                <a className="download-btn" href="http://localhost:8080/report/download" target="_blank">Згенерувати pdf-файл</a>
                            </div>

                            <InputField id="scientific_research" themes={this.state.themes} data={this.state.data.scientific_research}
                                        info="участь у науково-дослідній тематиці кафедри(підрозділу): шифр, назва НДР (науковий керівник)"/>

                            <InputField id="participation_in_grant" data={this.state.data.participation_in_grant}
                                        info="участь у виконанні індивідуальних або колективних грантів" addInfo="окрім грантів на поїздки"/>

                            <InputField id="scientific_internship" info="наукові стажування" data={this.state.data.scientific_internship}/>

                            <InputField id="scientific_management" data={this.state.data.scientific_management}
                                        info="наукове керівництво аспірантами, здобувачами, наукове консультування при написанні докторських консультацій"/>

                            <InputField id="defenses_by_asp_and_doc" data={this.state.data.defenses_by_asp_and_doc}
                                        info="захист дисертацій аспірантами, докторантами"
                                        addInfo="прізвище, назва дисертації, спеціальність, дата захисту, рік закінчення аспірантури, докторантури"/>

                            <InputField id="students_scientific_management" data={this.state.data.students_scientific_management}
                                        info="керівництво студентською науковою роботою, керівництво студентськими гуртками, підготовка студентів для участі у
                                Всеукраїнських конкурсах студентських наукових робіт тощо"/>

                            <InputField id="joint_publication" data={this.state.data.joint_publication}
                                        info="спільні публікації зі студентами"/>


                            <h2 className="title">Публікації</h2>

                            <InputTableRow title="Монографії" firstId="all_monographs_amount" secondId="monographs_amount" topPadding={true}/>

                            <InputTableRow title="Підручники" firstId="all_textbooks_amount" secondId="textbooks_amount"/>

                            <InputTableRow title="Навчальні посібники" firstId="all_tutorials_amount" secondId="tutorials_amount"/>

                            <InputTableRow title="Статті" firstId="all_articles_amount" secondId="articles_amount"/>

                            <InputTableRow title="Інші наукові видання" firstId="all_other_editions_amount" secondId="other_editions_amount"/>

                            <InputTableRow title="Тези доповідей на конференціях" firstId="all_theses_amount" secondId="theses_amount"/>

                            <InputTableRow title="Патенти" firstId="all_patents_amount" secondId="patents_amount"/>


                            <h2 className="title">Праці, що вийшли з друку за звітний період</h2>

                            <InputField id="monograph_rp" info="монографії" inputType="extended" data={this.state.data.monograph_rp}/>

                            <InputField id="textbook_rp" info="підручники" inputType="extended" data={this.state.data.textbook_rp}/>

                            <InputField id="tutorial_rp" info="навчальні посібники" inputType="extended" data={this.state.data.tutorial_rp}/>

                            <InputField id="other_edition_rp" info="інші наукові видання" inputType="extended" data={this.state.data.other_edition_rp}
                                        addInfo="словники, переклади наукових праць, наукові коментарі, бібліографічні покажчики тощо"/>

                            <InputField id="article_impactor" info="статті у виданнях, які мають імпакт-фактор" data={this.state.data.article_impactor}/>

                            <InputField id="article_wss" data={this.state.data.article_wss}
                                        info="статті в інших виданнях, які включені до міжнародних наукометричних баз даних Web of Science, Scopus"/>

                            <InputField id="article_international" data={this.state.data.article_international}
                                        info="статті в інших закордонних виданнях"/>

                            <InputField id="article_ukraine" data={this.state.data.article_ukraine}
                                        info="статті у фахових виданнях України"/>

                            <InputField id="article_ukraine_other" data={this.state.data.article_ukraine_other}
                                        info="статті в інших виданнях України"/>

                            <InputField id="theses_international" data={this.state.data.theses_ukraine}
                                        info="тези доповідей на міжнародних конференціях"/>

                            <InputField id="theses_ukraine" data={this.state.data.theses_international}
                                        info="тези доповідей на вітчизняних конференціях"/>

                            <InputField id="international_conferences" data={this.state.data.international_conferences}
                                        info="перелік міжнародних конференцій за кордоном, на яких представлено результати досліджень"/>


                            <h2 className="title">Праці, прийняті до друку</h2>

                            <InputField id="monograph" info="монографії" data={this.state.data.monograph}/>

                            <InputField id="textbook" info="підручники" data={this.state.data.textbook}/>

                            <InputField id="tutorial" info="навчальні посібники" data={this.state.data.tutorial}/>

                            <InputField id="other_edition" info="інші наукові видання" data={this.state.data.other_edition}
                                        addInfo="словники, переклади наукових праць, наукові коментарі, бібліографічні покажчики тощо"/>

                            <InputField id="article" info="статті" data={this.state.data.article}/>


                            <h2 className="title">Патентно-ліцензійна діяльність</h2>

                            <InputField id="development_application" data={this.state.data.development_application}
                                        info="заявки на винахід (корисну модель) (на видачу патенту на винахід (корисну модель))"/>

                            <InputField id="development_patent" data={this.state.data.development_patent}
                                        info="отримані патенти на винахід (корисну модель)"/>


                            <h2 className="title">Інше</h2>

                            <InputField id="reviews_and_feedback" data={this.state.data.reviews_and_feedback}
                                        info="рецензування та опанування дисертацій, відгуки на автореферати, експертні висновки"/>

                            <InputField id="membership" data={this.state.data.membership}
                                        info="членство у спеціалізованих вчених, експертних радах, редколегіях наукових журналів тощо"/>

                            <InputField id="other_activity" data={this.state.data.other_activity}
                                        info="інші види діяльності"/>

                            <InputTableRow id="create_date" title="Звіт заслухано" firstId="create_date" secondId="protocol" topPadding={true}
                                           firstColTitle="Дата засідання" secondColTitle="Номер протоколу"/>


                            <button type="submit" className="login-btn">Зберегти</button>
                        </form>
                    </Col>
                </div>
                <NotifyModal/>
            </div>
        );
    }

}

export default NewIR;
