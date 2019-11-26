import React from "react";
import Container from "react-bootstrap/Container";
import User from "./components/User";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";
class Main extends React.Component {
  constructor() {
    super();
    this.state = { users: [], search: "", currentPage: 1 };
    this.usersPerPage = 6;
  }
  componentDidMount() {
    fetch(`https://torre.bio/api/people?q=andres`)
      .then(res => res.json())
      .then(datajson => {
        this.setState({ users: datajson });
      })
      .catch(function(err) {
        console.log(err);
      });
  }
  handleChange = event => {
    this.setState({ search: event.target.value, currentPage: 1 });
    console.log(this.state.search);
  };
  handleSubmit = event => {
    event.preventDefault();
    fetch(`https://torre.bio/api/people?q=${this.state.search}`)
      .then(res => res.json())
      .then(datajson => {
        this.setState({ users: datajson });
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  handleClick = event => {
    this.setState({
      currentPage: Number(event.target.id)
    });
  };
  render() {
    const indexOfLastUser = this.state.currentPage * this.usersPerPage;
    const indexOfFirstUser = indexOfLastUser - this.usersPerPage;
    const currentUsers = this.state.users.slice(
      indexOfFirstUser,
      indexOfLastUser
    );
    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(this.state.users.length / this.usersPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <Pagination.Item
          key={number}
          id={number}
          active={number === this.state.currentPage}
          onClick={this.handleClick}
        >
          {number}
        </Pagination.Item>
      );
    });
    return (
      <div>
        <img id="logo" src="https://torre.co/img/torre-icon.4072131f.png" />
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col>
              <Form.Control
                placeholder="Search User"
                onChange={this.handleChange}
              />
            </Col>
            <Col>
              <Button variant="info" type="submit" onClick={this.search}>
                Search
              </Button>
            </Col>
          </Row>
        </Form>
        <Container>
          {currentUsers.map((user, i) => (
            <User key={i} user={user} />
          ))}
        </Container>
        <ul id="page-numbers">{renderPageNumbers}</ul>
      </div>
    );
  }
}

export default Main;
