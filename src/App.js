import React, { Component } from "react";
import "./assets/pricing.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Tabs, Tab, Form, Button } from "react-bootstrap";
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flashcards: [
        { question: "Click the Edit Data button to get started", answer: "Nhấn button Edit data để bắt đầu" }
      ],
      currentIndex: 0,
      showAnswer: false,
      keyword: "",
      results: [],
      loading: false,
      error: null
    };

    this.questionRef = React.createRef();
    this.answerRef = React.createRef();
  }
  addFlashcard = (question, answer) => {
    this.setState(prevState => ({
      flashcards: [
        ...prevState.flashcards,
        { question, answer }
      ]
    }));
  };

  shuffleFlashcards = () => {
    const shuffled = [...this.state.flashcards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    this.setState({ flashcards: shuffled });
  };
  
  handleNext = () => {
    // Chuyển sang thẻ kế tiếp
    this.setState(prevState => {
      const nextIndex =
        prevState.currentIndex + 1 < prevState.flashcards.length
          ? prevState.currentIndex + 1
          : 0; // quay lại đầu nếu hết mảng
      return {
        currentIndex: nextIndex,
        showAnswer: false // reset lại để chỉ hiện câu hỏi
      };
    });
  };

  handlePrevios = () => {
    // Chuyển sang thẻ trước đó
    this.setState(prevState => {
      const previosIndex =
        prevState.currentIndex - 1 >= 0
          ? prevState.currentIndex - 1
          : prevState.flashcards.length - 1;
      return {
        currentIndex: previosIndex,
        showAnswer: false // reset lại để chỉ hiện câu hỏi
      };
    });
  };

  handleClick = () => {
    this.setState(prevState => ({
      showAnswer: !prevState.showAnswer
    }));
  };

  openModal = () => {
    const { flashcards } = this.state;
    const questionText = flashcards.map(fc => fc.question).join("\n");
    const answerText = flashcards.map(fc => fc.answer).join("\n");

    // Gán vào textarea thông qua ref
    this.questionRef.current.value = questionText;
    this.answerRef.current.value = answerText;

    const questions = this.state.flashcards.map(fc => fc.question).join('\n');
    const answers = this.state.flashcards.map(fc => fc.answer).join('\n');
    const questionCount = questions.split('\n').filter(line => line.trim() !== '').length;
    const answerCount = answers.split('\n').filter(line => line.trim() !== '').length;

    // Cập nhật state để hiển thị
    this.setState({
      questionCount,
      answerCount
    });
  };

  saveChanges = () => {
    const questions = this.questionRef.current.value.split("\n");
    const answers = this.answerRef.current.value.split("\n");

    const flashcards = questions.map((q, i) => ({
      question: q.trim(),
      answer: answers[i] ? answers[i].trim() : "",
    }));

    this.setState({ flashcards });
  };

  handleExportCSV = () => {
    const { flashcards } = this.state;

    if (!flashcards || flashcards.length === 0) {
      alert("No data to export!");
      return;
    }

    // Dòng tiêu đề (header)
    const header = ["Question", "Answer"];
    const rows = flashcards.map(card => [card.question, card.answer]);

    // Tạo nội dung CSV — escape ký tự đặc biệt và nối thành chuỗi
    const csvContent = [header, ...rows]
      .map(e => e.map(value => `"${(value || '').replace(/"/g, '""')}"`).join(","))
      .join("\n");

    // Thêm BOM (Byte Order Mark) để Excel hiểu đúng UTF-8
    const BOM = "\uFEFF";
    const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" });

    // Tạo URL tải xuống
    const url = URL.createObjectURL(blob);

    // Tạo link ẩn để tải file
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "flashcards_utf8.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  handleImportCSV = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Kiểm tra định dạng file
    if (!file.name.endsWith(".csv")) {
      alert("Please select a valid CSV file!");
      return;
    }

    const reader = new FileReader();

    // Đọc file với encoding UTF-8
    reader.readAsText(file, "UTF-8");

    reader.onload = (e) => {
      const text = e.target.result;

      // Cắt bỏ BOM (nếu có)
      const csvText = text.replace(/^\uFEFF/, "");

      // Tách dòng
      const lines = csvText.trim().split(/\r?\n/);

      // Dòng đầu tiên là header
      const [, ...dataLines] = lines;

      // Parse từng dòng thành object { question, answer }
      const flashcards = dataLines.map(line => {
        // Tách theo dấu phẩy, xử lý trường hợp có dấu phẩy trong chuỗi
        const [questionRaw, answerRaw] = line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/);
        const question = questionRaw.replace(/^"|"$/g, '').replace(/""/g, '"');
        const answer = answerRaw?.replace(/^"|"$/g, '').replace(/""/g, '"');
        return { question, answer };
      });

      // Lưu vào state
      this.setState({ flashcards });

      alert("Import successful!");
    };

    reader.onerror = () => {
      alert("Failed to read the file. Please try again!");
    };
  };

  handleReverseFlashcards = () => {
    const { flashcards } = this.state;

    if (!flashcards || flashcards.length === 0) {
      alert("No data to reverse!");
      return;
    }

    // Tạo mảng mới với question ↔ answer
    const reversed = flashcards.map(card => ({
      question: card.answer || "",
      answer: card.question || "",
    }));

    this.setState({ flashcards: reversed });
  };

  searchJapaneseWordJisho = async () => {
    const { keyword } = this.state;
    if (!keyword.trim()) return;

    this.setState({ loading: true, error: null, results: [] });

    const translateToVietnamese = async (text) => {
      try {
        const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|vi`);
        if (!res.ok) {
          console.error("Translation failed:", res.status, res.statusText);
          return text;
        }

        const data = await res.json();
        return data.responseData?.translatedText || text;
      } catch (e) {
        console.error("Translate error:", e);
        return text;
      }
    };

    try {
      const res = await fetch(
        `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(
          `https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(keyword)}`
        )}`
      );
      const data = await res.json();

      if (!data || !data.data || data.data.length === 0) {
        this.setState({ results: [], error: "Không tìm thấy kết quả." });
      } else {
        // Tạo mảng promise cho từng item
        const promises = data.data.map(async (item) => {
          const jp = item.japanese[0];
          const word = jp.word || jp.reading;
          const reading = jp.reading;

          const firstSense = item.senses[0];
          const meaningEn = firstSense?.english_definitions?.[0] || "No meaning found";
          const pos = firstSense?.parts_of_speech?.[0] || "";

          const meaningVi = await translateToVietnamese(meaningEn);

          return { word, reading, meaningVi, pos };
        });

        // ✅ Chờ tất cả promise hoàn tất
        const formatted = await Promise.all(promises);

        this.setState({ results: formatted });
      }
    } catch (err) {
      console.error("Error fetching Jisho:", err);
      this.setState({ error: "Lỗi khi gọi API." });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { flashcards, currentIndex, showAnswer } = this.state;
    const currentCard = flashcards[currentIndex];

    return (
      <div>
        <Header
        />
        <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center caption-japanese">
          <h1 className="display-4">Small Cards, Big Progress</h1>
          <br></br>
          <p className="lead"></p>
          <div className="d-flex flex-wrap justify-content-center gap-2">
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editDataModal" onClick={this.openModal}>
              <i className="fa-solid fa-pen-to-square"></i> Edit data
            </button>
            <button type="button" className="btn btn-primary ms-2" onClick={this.shuffleFlashcards}>
              <i className="fa-solid fa-shuffle"></i> Shuffle
            </button>
            <button type="button" className="btn btn-primary ms-2" onClick={this.handleReverseFlashcards}>
              <i className="fa-solid fa-right-left"></i> Reverse
            </button>
            <button type="button" className="btn btn-primary ms-2" onClick={this.handleExportCSV}>
              <i className="fa-solid fa-file-export"></i> Export csv
            </button>
            <button type="button" className="btn btn-primary ms-2" onClick={() => this.fileInput.click()}>
              <i className="fa-solid fa-file-import"></i> Import csv
            </button>
            <input
              type="file"
              accept=".csv"
              ref={(input) => (this.fileInput = input)}
              onChange={this.handleImportCSV}
              style={{ display: "none" }}
            />
          </div>
          <br></br>
        </div>

        <br></br>

        <div className="container">
          <div className="card-deck mb-3 text-center">
            <div className="card mb-8 shadow-sm">
              <div className="card-header border-bottom-0 bg-fff">
                <div className="card-header d-flex justify-content-between bg-fff">
                  <button type="button" className="btn btn-outline-primary w-40" onClick={this.handlePrevios}>
                    <i className="fa-solid fa-arrow-left"></i> Previous
                  </button>
                  <button type="button" className="btn btn-outline-primary w-40" onClick={this.handleNext}>
                    Next <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
              <div className="card-body d-flex justify-content-center align-items-center minHeight-400" 
                style={{ cursor: 'pointer', userSelect: 'none', backgroundColor: this.state.showAnswer ? ' #e7f1f5' : '#fff',}}
                onClick={this.handleClick}>
                <h1 className="card-title pricing-card-title vocaText">
                  {showAnswer ? currentCard.answer : currentCard.question}
                </h1>
              </div>
            </div>
          </div>
        </div>

        <Footer />
        
        <div className="modal fade" id="editDataModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit data</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12 col-md-12">
                      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#searchInternetModal">
                        <i className="fa-solid fa-globe"></i> Search Internet
                      </button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 col-md-6">
                      <label htmlFor="recipient-name" className="col-form-label">Question:{" "}
                        <span className="text-primary">
                          ({this.state.questionCount || 0})
                        </span>
                      </label>
                      <textarea className="form-control" aria-label="With textarea" 
                        ref={this.questionRef}
                        onInput={(e) => {
                          const count = e.target.value.split("\n").filter(line => line.trim() !== "").length;
                          this.setState({ questionCount: count });
                        }}
                      ></textarea>
                    </div>
                    <div className="col-6 col-md-6">
                      <label htmlFor="recipient-name" className="col-form-label">Answer:{" "}
                        <span className="text-success">
                          ({this.state.answerCount || 0})
                        </span>
                      </label>
                      <textarea className="form-control" aria-label="With textarea"
                        ref={this.answerRef}
                        onInput={(e) => {
                          const count = e.target.value.split("\n").filter(line => line.trim() !== "").length;
                          this.setState({ answerCount: count });
                        }}></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={this.saveChanges} data-bs-dismiss="modal">Save changes & close</button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="searchInternetModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Search Internet</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="container-fluid">
                  <Tabs defaultActiveKey="japanese" id="search-tabs" className="mb-3">
                    <Tab eventKey="japanese" title="Japanese">
                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();
                          this.searchJapaneseWordJisho();
                        }}
                      >
                        <Form.Group className="mb-3" controlId="keywordInput">
                          <Form.Label>Enter Japanese word (Kanji / Hiragana / Romaji)</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="e.g. 花 or はな or hana"
                            value={this.state.keyword}
                            onChange={(e) => this.setState({ keyword: e.target.value })}
                          />
                        </Form.Group>
                        <Button
                          variant="primary"
                          onClick={this.searchJapaneseWordJisho}
                          disabled={this.state.loading}
                        >
                          {this.state.loading ? "Searching..." : "Search"}
                        </Button>
                      </Form>

                      <div className="mt-3">
                        {this.state.loading && <p>Loading...</p>}

                        {!this.state.loading && this.state.results.length > 0 && (
                          <ul className="list-group">
                            {this.state.results.map((item, index) => (
                              <li key={index} className="list-group-item">
                                <div className="d-flex justify-content-between align-items-center flex-wrap">
                                  <div>
                                    <strong>{item.word}</strong>
                                    {item.reading && `（${item.reading}）`} | {item.meaningVi} |
                                    {item.pos && (
                                      <span className="text-muted small"> {item.pos}</span>
                                    )}
                                  </div>

                                  <div className="d-inline-flex gap-2 mt-2 mt-md-0">
                                    <Button
                                      size="sm"
                                      variant="outline-primary"
                                      onClick={(e) => {this.addFlashcard(item.word, item.reading); e.currentTarget.disabled = true;}}
                                    >
                                      + Flashcard Kanji
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline-success"
                                      onClick={(e) => {this.addFlashcard(item.reading, item.meaningVi); e.currentTarget.disabled = true;}}
                                    >
                                      + Flashcard furigana
                                    </Button>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}

                        {!this.state.loading && this.state.results.length === 0 && (
                          <p className="text-muted mt-2">No results found.</p>
                        )}
                      </div>
                    </Tab>
                    <Tab eventKey="english" title="English">
                      <p>Search results or content related to English will go here.</p>
                    </Tab>
                    <Tab eventKey="other" title="Other">
                      <p>Search results or content related to other sources will go here.</p>
                    </Tab>
                </Tabs>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#editDataModal" onClick={this.openModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
