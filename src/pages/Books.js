import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";

var searchBoxStyle = {
  background: "#eee",
  padding: "10px"
};

class Books extends Component {
  state = {
    authors: [],
    description: "",
    image: "",
    link: "",
    title: ""
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({
          authors: res.data,
          description: "",
          image: "",
          link: "",
          title: ""
        })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      API.getBook({
        title: this.state.title
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  handleBookSave = event => {
    event.preventDefault();
    if (this.state.title) {
      API.saveBook({
        authors: this.state.authors,
        description: this.state.description,
        image: this.state.image,
        link: this.state.link,
        title: this.state.title
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Google Books Search</h1>
              <p>Search for and Save Books</p>
            </Jumbotron>
            <form className="border" style={searchBoxStyle}>
              <label htmlFor="title">Book Search</label>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Search for the title of the book (required)"
              />
            </form>
            <FormBtn
              disabled={!this.state.title}
              onClick={this.handleFormSubmit}
            >
              Search
            </FormBtn>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
