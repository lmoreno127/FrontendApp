import React from "react";
import LightSpeed from "react-reveal/LightSpeed";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";
class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false, user: {} };
  }
  handleClose = () => {
    this.setState({ showModal: false, user: {} });
  };
  handleShow = () => {
    let username = this.props.user.publicId;
    fetch(`https://torre.bio/api/bios/${username}`, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then(res => {
        return res.json().then(data => {
          this.setState({ user: data, showModal: true });
          console.log(this.state.user);
        });
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <LightSpeed left>
        <Row>
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={
                  this.props.user.picture
                    ? this.props.user.picture
                    : "https://starrgate.s3.amazonaws.com/users/39d1e8c8f41a7313e918867821347fcfe19bf657/profile_uC8xtIF.jpg"
                }
                onClick={this.handleShow}
              />
              <Card.Body>
                <Card.Title>{this.props.user.name}</Card.Title>
                <Card.Text>{this.props.user.professionalHeadline}</Card.Text>
                <Button variant="success" onClick={this.handleShow}>
                  See User
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Modal show={this.state.showModal} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{this.props.user.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Woohoo, you're reading this text in a modal!
            </Modal.Body>
          </Modal>
        </Row>
      </LightSpeed>
    );
  }
}

export default User;
