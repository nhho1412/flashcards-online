import React, { Component } from "react";
import "./assets/pricing.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import randomVoca from "./randomVoca";
import ShowInfo from "./ShowInfo";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vocaRandom: randomVoca("Kanji"),
      hanviet: null,
      nghia: "Press the button 'Result' or answer correctly",
      doc: null,
      result: "",
      resultBl: "hienthi",
      ngonNgu: "Kanji",
      ngonNguColor: "1",
    };
    this.handleClick = this.handleClick.bind(this);
    this.reloadClick = this.reloadClick.bind(this);
    this.ktkqClick = this.ktkqClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.selectNnClick = this.selectNnClick.bind(this);
  }

  handleClick() {
    var hanvietA;
    var nghiaA;
    var docA;
    this.state.vocaRandom.map(
      (vocaRandom) => (
        // eslint-disable-next-line
        (hanvietA = vocaRandom.hanviet),
        (nghiaA = vocaRandom.nghia),
        (docA = vocaRandom.doc)
      )
    );
    this.setState((state) => ({
      hanviet: hanvietA,
      nghia: nghiaA,
      doc: docA,
      resultBl: "hienthi",
    }));
  }

  handleChange(event) {
    var resultA = event.target.value;
    this.setState((state) => ({
      result: resultA,
    }));
  }

  reloadClick() {
    var ngonNgu = this.state.ngonNgu;
    this.setState((state) => ({
      vocaRandom: randomVoca(ngonNgu),
      hanviet: null,
      doc: null,
      nghia: "Press the button 'Result' or answer correctly",
      result: "",
      resultBl: "hienthi",
    }));
  }

  ktkqClick() {
    var hanvietA;
    var nghiaA;
    var docA;

    this.state.vocaRandom.map(
      (vocaRandom) => (
        // eslint-disable-next-line
        (hanvietA = vocaRandom.hanviet),
        (nghiaA = vocaRandom.nghia),
        (docA = vocaRandom.doc)
      )
    );
    // eslint-disable-next-line
    const doc_array = docA.split(", ");
    var ck = true;
    // eslint-disable-next-line
    doc_array.filter((doc) => {
      var docB = doc;
      if (
        (docB !== "" &&
          doc.toLowerCase() === this.state.result.toLowerCase()) ||
        hanvietA.toLowerCase().trim() === this.state.result.toLowerCase().trim()
      ) {
        this.setState((state) => ({
          hanviet: hanvietA,
          nghia: nghiaA,
          doc: docA,
          resultBl: "dung",
        }));
        ck = false;
      }
    });

    if (ck) {
      this.setState((state) => ({
        hanviet: "",
        nghia: "",
        doc: "",
        resultBl: "sai",
      }));
    }
  }

  selectNnClick(event) {
    var selectNgonngu = event.target.id;
    var ngonNgu = "";
    var ngonNguColor = "1";
    if (selectNgonngu === "cateKanji") {
      ngonNgu = "Kanji";
      ngonNguColor = "1";
      this.setState((state) => ({
        vocaRandom: randomVoca(ngonNgu),
      }));
    } else if (selectNgonngu === "cateHiragana") {
      ngonNgu = "Hiragana";
      ngonNguColor = "2";
      this.setState((state) => ({
        vocaRandom: randomVoca(ngonNgu),
      }));
    } else if (selectNgonngu === "cateKatakana") {
      ngonNgu = "Katakana";
      ngonNguColor = "3";
      this.setState((state) => ({
        vocaRandom: randomVoca(ngonNgu),
      }));
    }

    this.setState((state) => ({
      ngonNgu: ngonNgu,
      ngonNguColor: ngonNguColor,
      hanviet: null,
      doc: null,
      nghia: "Press the button 'Result' or answer correctly",
      result: "",
      resultBl: "hienthi",
    }));
  }

  render() {
    var Chucai;
    this.state.vocaRandom.map((vocaRandom) => (Chucai = vocaRandom.chucai));
    return (
      <div>
        <Header
          ngonNguColor={this.state.ngonNguColor}
          nnChange={this.selectNnClick}
        />
        <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center caption-japanese">
          <h1 className="display-4">JAPANESE</h1>
          <h3>{this.state.ngonNgu}</h3>
          <p className="lead"></p>
        </div>

        <div className="container">
          <div className="card-deck mb-3 text-center">
            <div className="card mb-4 shadow-sm">
              <div className="card-header">
                <h4 className="my-0 font-weight-normal">Alphabet</h4>
              </div>
              <div className="card-body">
                <h1 className="card-title pricing-card-title vocaText">
                  {Chucai}
                </h1>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control inputKq"
                    placeholder="..."
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value={this.state.result}
                    onChange={this.handleChange}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-lg btn-block btn-primary btnKtkq"
                  onClick={this.ktkqClick}
                >
                  Check
                </button>
                <button
                  type="button"
                  className="btn btn-lg btn-block btn-warning btnBt"
                  onClick={this.handleClick}
                >
                  Result
                </button>
                <button
                  type="button"
                  className="btn btn-lg btn-block btn-info btnBt"
                  onClick={this.reloadClick}
                >
                  Next
                </button>
              </div>
            </div>
            <div className="card mb-4 shadow-sm">
              <div className="card-header">
                <h4 className="my-0 font-weight-normal">Information</h4>
              </div>
              <div className="card-body">
                <ShowInfo
                  hanviet={this.state.hanviet}
                  nghia={this.state.nghia}
                  doc={this.state.doc}
                  resultBl={this.state.resultBl}
                />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}
