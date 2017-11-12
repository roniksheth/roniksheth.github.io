import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import FileReaderInput from 'react-file-reader-input';


var apiRoot = 'http://localhost:8080'

var tagList = [
{"tag": "marketing", "val": "1"},
{"tag":"business", "val": "2"},
{"tag":"graphic-design", "val": "3"},
{"tag":"programming", "val": "4"},
{"tag":"engineering", "val": "5"},
{"tag":"investment", "val": "6"}

]

var nameList = [
  "Layla Spagnolo", "Kenny Nowack",  "Alvin Longoria", "Brianne Witkowski", "Lela Bate",
  "Dorian Lykins", "Rueben Deavers", "Chanda Luebke", "Alisha Erazo", "Janina Bevins", "Janyce Mantyla",
  "Neoma Kerr", "Neta Richison", "Myrtle Billick", "Ela Smolka", "Paola Forshee", "Kaley Dundas",
  "Hildred Dery", "Dania Creagh", "Magdalena Mcgann", "Dorene Caminiti", "Sterling Reighard",
  "Lourie Rank", "Kiara Barranco", "Jules Shirkey","Rudolph Jacobson","Janice Moffit",
  "Marlene Bryan",
]
function randNum(){
  var nameIndex = Math.floor(Math.random() * 28);

  return nameIndex;

}

var users = []

class MenuBar extends Component {

    getInitialState () {
        return { focused: 0 };
    }

    clicked (index) {

        // The click handler will update the state with
        // the index of the focused menu entry

        //LoadList(index);
        clearArray();
        this.setState({focused: index});
        //console.log(index);

    }

    render () {

        // Here we will read the items property, which was passed
        // as an attribute when the component was created

        var self = this;

        // The map method will loop over the array of menu entries,
        // and will return a new array with <li> elements.

        return (
            <div>
                <ul>{ this.props.items.map(function(m, index){

                    var style = '';
                    console.log(self)
                    if(self.state && self.state.focused == index){
                        style = 'focused';
                    }

                    // Notice the use of the bind() method. It makes the
                    // index available to the clicked function:

                    return <li className={style} onClick={self.clicked.bind(self, index)}>{m}</li>;

                }) }

                </ul>

                <p>Selected: {this.props.items[(this.state && this.state.focused) || 0]}</p>
            </div>
        );

    }
}

class User extends Component {
  render () {
    return (
      <div>
        <div class="real-name">{this.props.name}</div>
        <div class="username">@{this.props.id}</div>
        <div class="location">{this.props.location}</div>
      </div>
    )
  }
}

var displayNames = [

  nameList[randNum()],
  nameList[randNum()],
  nameList[randNum()],
  nameList[randNum()],
  nameList[randNum()],
  nameList[randNum()],
  nameList[randNum()]

]

function toString(){
  var ret = "";
  var i;
    for(i = 0; i < displayNames.length; i++) {
        ret +=  + displayNames[i] + '\n';
    }
  return ret;
}

function clearArray() {
  displayNames = [];
}

class UserList extends Component {

  render () {
    return displayNames.toString();

  }
}

function LoadList (index) {

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText)
        users = JSON.parse(this.responseText);
      }
  };
  xhttp.open("GET", apiRoot + '/users/all/' + tagList[index].tag, true);
  xhttp.send();

}

class App extends Component {
  render() {
    return (
      <div className="App">
        <MenuBar items={[ 'Marketing', 'Management', 'Graphic Design',
          'Programming', 'Engineering', 'Investment']}/>
        <UserList />

      </div>

    );

  }
}


export default App;
