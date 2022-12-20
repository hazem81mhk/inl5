"use strict";

import React, { Component } from 'react'
import FilmItem from './FilmItem'
import filmInfo from './FilmInfo'
class App extends Component {
    constructor() {
        super();
        this.state = {
            filmInfo: filmInfo,
            films: filmInfo,
            counter: filmInfo.length,
            title: "",
            year: "",
            grade: "",
            disableChange: true,
            disableAdd: false,
            index: 0,
        };
        this.addFilm = this.addFilm.bind(this);
        this.deleteFilm = this.deleteFilm.bind(this);
        this.changeFilm = this.changeFilm.bind(this);
        this.changeFilmInfo = this.changeFilmInfo.bind(this);

        this.titleRef = React.createRef();
        this.yearRef = React.createRef();
        this.gradeRef = React.createRef();
    }



    addFilm(event) {
        event.preventDefault();
        if (this.titleRef.current.value !== "" && this.yearRef.current.value !== ""
            && this.gradeRef.current.value !== "") {
            const film =
            {
                key: this.state.counter,
                title: this.titleRef.current.value,
                year: this.yearRef.current.value,
                grade: this.gradeRef.current.value,
                id: this.state.counter
            };

            this.state.films.push(film);
            this.setState(function (prevState) {
                return { counter: prevState.counter + 1 }
            });
            this.newFilms = this.state.films.map(films => {
                return <FilmItem key={films.key} title={films.title} id={films.id}
                    year={films.year} grade={films.grade} deleteFilm={this.deleteFilm}
                    changeFilm={this.changeFilm}
                />
            })
            this.titleRef.current.value = ""
            this.yearRef.current.value = ""
            this.gradeRef.current.value = ""
        }
        else {
            alert("You must write the film title, year and grade!");
        }
    }

    deleteFilm(id) {
        this.setState(function (prevFilms) {
            return { films: prevFilms.films.filter((item) => item.id !== id) }
        })
        this.setState.disableChange = true;
    }

    changeFilm(id) {
        this.titleRef.current.value = this.state.films[id].title
        this.yearRef.current.value = this.state.films[id].year
        this.gradeRef.current.value = this.state.films[id].grade
        this.setState(function () {
            return { disableChange: false, disableAdd: true, index: id }
        })
    }

    changeFilmInfo(event) {
        event.preventDefault();

        if (this.titleRef.current.value !== "" && this.yearRef.current.value !== ""
            && this.gradeRef.current.value !== "") {
            this.state.films[this.state.index].title = this.titleRef.current.value;
            this.state.films[this.state.index].year = this.yearRef.current.value;
            this.state.films[this.state.index].grade = this.gradeRef.current.value;

            this.setState(function () {
                return {
                    disableChange: true,
                    disableAdd: false
                }
            })
            this.titleRef.current.value = ""
            this.yearRef.current.value = ""
            this.gradeRef.current.value = ""
        }
        else {
            alert("Film title, year or grade should not empty!");
        }
    }

    render() {
        //  console.log("state", this.state);
        return (
            <div className="container">
                <div className="navbar bg-dark rounded text-white">
                    <h2>Film Database</h2>
                </div>
                <div >
                    <form action=''>
                        <li className="list-group-item">
                            <label htmlFor="title">Title:</label>
                            <input type="text" name="title" maxLength={20} placeholder="Film title"
                                ref={this.titleRef} required></input>

                            <label htmlFor="year">Year:</label>
                            <input type="number" name="year" placeholder="1900" min={1900} max={2022}
                                ref={this.yearRef} required></input>

                            <label htmlFor="grade">Grade:</label>
                            <input type="number" name="grade" placeholder="0" min={0} max={5}
                                ref={this.gradeRef} required></input>

                            <button className='float-right' onClick={this.addFilm}
                                disabled={this.state.disableAdd} >Add film</button>
                            <button className='float-right' onClick={this.changeFilmInfo}
                                disabled={this.state.disableChange}>Change</button>
                        </li>
                    </form>
                </div>
                <ul className='list-group'>
                    {this.state.films.map(filmItem => <FilmItem
                        key={filmItem.key}
                        title={filmItem.title}
                        id={filmItem.id}
                        year={filmItem.year}
                        grade={filmItem.grade}
                        deleteFilm={this.deleteFilm}
                        changeFilm={this.changeFilm}
                    />)}
                </ul>
            </div>
        )
    }
}
export default App