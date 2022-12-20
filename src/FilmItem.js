"use strict";

import React, { Component } from 'react'

class FilmItem extends Component {
    render() {
        return (
            <div>
                <li className='list-group-item'>
                    Title: {this.props.title + ", "}
                    Year: {this.props.year + ", "}
                    Grade: {this.props.grade}
                    <button className='btn-danger float-right'
                        onClick={() => { this.props.deleteFilm(this.props.id) }}>Delete </button>
                    <button className='float-right'
                        onClick={() => { this.props.changeFilm(this.props.id) }}>Change </button>
                </li>

            </div>
        )
    }
}

export default FilmItem