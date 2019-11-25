import React, { Component } from "react";

class Fox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="relative">
        <div name="randfox" className="fox waves-effect waves-light">
          <img
            className={
              this.props.context !== null && this.props.context !== undefined
                ? this.props.context
                : ""
            }
            src={this.props.image}
            alt={this.props.link}
          />
          {this.props.context !== null &&
          this.props.context !== undefined &&
          this.props.context == "favorite" ? (
            <i
              onClick={this.props.onClick}
              className="material-icons superdi-icon red-text"
            >
              do_not_disturb_on
            </i>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default Fox;
