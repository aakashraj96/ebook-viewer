import React, { Component} from "react";
import PdfViewer from './Components/PdfViewer';
import "./App.css";

class App extends Component{
  render(){
    return(
      <div className="App">
        <PdfViewer />
      </div>
    );
  }
}

export default App;