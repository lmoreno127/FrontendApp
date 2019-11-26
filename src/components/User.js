import React from "react";
import LightSpeed from "react-reveal/LightSpeed";
class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false, user: {} };
  }

  render() {
    return (
      <LightSpeed left>
        <div className="user-card-container">
          <img
            src={
              this.props.user.picture
                ? this.props.user.picture
                : "https://starrgate.s3.amazonaws.com/users/39d1e8c8f41a7313e918867821347fcfe19bf657/profile_uC8xtIF.jpg"
            }
            onClick={this.handleShow}
            alt="user "
          />
          <div
            className="user-info
          "
          >
            <h2>{this.props.user.name}</h2>
            <h4>{this.props.user.professionalHeadline}</h4>
          </div>
        </div>
      </LightSpeed>
    );
  }
}

export default User;
