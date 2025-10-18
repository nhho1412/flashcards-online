import React from "react";
import PropTypes from "prop-types";

export default class ShowInfo extends React.Component {
    static propTypes = {
        hanviet: PropTypes.string,
        nghia: PropTypes.string,
        doc: PropTypes.string,
        resultBl: PropTypes.string
    };
    render() {
        return (
        <div className="card-body">
            {
                (this.props.resultBl==="hienthi") ? "" : ((this.props.resultBl==="dung") ? <div className="alert alert-success" role="alert">CORRECT!</div> : <div className="alert alert-warning" role="alert">INCORRECT!</div>)
            }
          <h1 className="card-title pricing-card-title">
            {this.props.hanviet}
          </h1>
          <ul className="list-unstyled mt-3 mb-4">
            <li>{this.props.nghia}</li>
            <br/>
            <li>{this.props.doc}</li>
          </ul>
        </div>        
        );
      }
    
}