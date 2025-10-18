import React, { PureComponent } from "react";
import BtnSelectAlphabet from "./BtnSelectAlphabet";
import PropTypes from "prop-types";

export default class Header extends PureComponent {
  static propTypes = {
    nnChange: PropTypes.func,
  };

  selectNnClick = (event) => {
    this.props.nnChange(event);
  };

  render() {
    return (
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
        <h5 className="my-0 mr-md-auto font-weight-normal">Learn Japanese</h5>
        <nav className="my-2 my-md-0 mr-md-3">
          <BtnSelectAlphabet
            ngonNguColor={this.props.ngonNguColor}
            keyNn="1"
            nnChange={this.selectNnClick}
          />
          <BtnSelectAlphabet
            ngonNguColor={this.props.ngonNguColor}
            keyNn="2"
            nnChange={this.selectNnClick}
          />
          <BtnSelectAlphabet
            ngonNguColor={this.props.ngonNguColor}
            keyNn="3"
            nnChange={this.selectNnClick}
          />
        </nav>
      </div>
    );
  }
}
