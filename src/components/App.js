import React from "react";
import axios from "axios";
import Fox from "./Fox";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //Favorite foxes
      foxes: [],
      //current fox
      fox: { image: "", link: "" },
      isInPack: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event, id, index) {
    if (id !== null && id !== undefined) {
      if (id == "favorite") {
        this.AddNewFox();
      } else {
        if (id == "delete_favorite") {
          this.DeleteFox(index);
          this.checkPack();
        } else {
          this.UpdateRandom();
        }
      }
    }
    event.preventDefault();
  }

  checkPack() {
    var pack = this.state.foxes
      .map(function(e) {
        return e.image;
      })
      .indexOf(this.state.fox.image);
    this.setState({ isInPack: pack != -1 ? true : false });
  }

  DeleteFox(index) {
    this.state.foxes.splice(index, 1);
    this.setState({ foxes: this.state.foxes });
  }

  UpdateRandom() {
    axios.get("https://dog.ceo/api/breeds/image/random").then(response => {
      this.setState({
        fox: { image: response.data.message, link: response.data.message }
      });
      this.checkPack();
      //console.log(response.data.message);
    });
  }

  AddNewFox() {
    this.state.foxes.push(this.state.fox);
    this.setState({ foxes: this.state.foxes });
    this.checkPack();
  }

  componentDidMount() {
    //Each time App loads then show a random fox
    //https://www.randomfox.ca/floof/
    this.UpdateRandom();
  }

  render() {
    return (
      <div className="App container-fluid">
        <div className="content">
          <div className="row fox-row valign-wrapper">
            <div className="col s10 offset-s1 m6 offset-m3 l4 offset-l4">
              <div className="card lighten-2 fox-card">
                <div
                  className="card-image"
                  onClick={e => this.handleClick(e, "randfox")}
                >
                  <Fox
                    image={this.state.fox.image}
                    link={this.state.fox.link}
                  />
                  <span className="card-title super-title red">
                    Choose your favorite foxes
                  </span>
                </div>
                <div className="card-action right-align actions">
                  <a
                    className={
                      this.state.isInPack
                        ? "btn-floating waves-effect waves-light red disabled"
                        : "btn-floating waves-effect waves-light red"
                    }
                    onClick={e => this.handleClick(e, "favorite")}
                  >
                    <i className="material-icons">favorite</i>
                  </a>
                </div>
              </div>
              <div className="section">
                <div className="row">
                  {this.state.foxes != null &&
                    this.state.foxes != undefined &&
                    this.state.foxes.map((fox, index) => (
                      <div key={index} className="col s4 thumb">
                        <Fox
                          onClick={e =>
                            this.handleClick(e, "delete_favorite", index)
                          }
                          context="favorite"
                          image={fox.image}
                          link={fox.link}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
