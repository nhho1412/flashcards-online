import React, { PureComponent } from 'react';
import PropTypes from "prop-types";

export default class BtnSelectAlphabet extends PureComponent {
    static propTypes = {
        nnChange: PropTypes.func
      };
    
    constructor(props) {
        super(props);
        this.state = {
            ngonNgu: "Kanji",
            colorClass: "p-2 text-dark",
            id: "cateKanji"
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = event => {
        this.props.nnChange(event);
    }

    render() {
        if (this.props.ngonNguColor === this.props.keyNn) {
            this.setState(state => ({
                colorClass: 'p-2 text-dark cateSelect'
                })
            );
        } else {
            this.setState(state => ({
                colorClass: 'p-2 text-dark'
                })
            );
        }

        if (this.props.keyNn === "1") {
            this.setState(state => ({
                ngonNgu: "Kanji",
                id: "cateKanji"
                })
            );
        } else if (this.props.keyNn === "2") {
            this.setState(state => ({
                ngonNgu: "Hiragana",
                id: "cateHiragana"
                })
            );
        } else if (this.props.keyNn === "3") {
            this.setState(state => ({
                ngonNgu: "Katakana",
                id: "cateKatakana"
                })
            );
        }

        return (
                <span href="#" className={this.state.colorClass} id={this.state.id} onClick={this.handleChange}>{this.state.ngonNgu}</span>
        )
    }
}
