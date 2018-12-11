
import React, { Component} from "react";
import "./PdfViewer.css";
import { Document } from 'react-pdf/dist/entry.webpack';
import {Page} from 'react-pdf';
const pdfjsLib = require('pdfjs-dist');


class PdfViewer extends Component{
  
  constructor () {
    super();
    this.state = {
      numPages: null,
      pageNumber: 1,
    }
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  componentDidMount () {
    console.log('Converting ...');
    // pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.worker.js';
    pdfjsLib.getDocument('helloworld.pdf').then((pdf) => {
      console.log('Inside pdf part');

      pdf.getMetadata().then((data) => {
        console.log('inside metadata part');
        // console.log(data);
      });
      pdf.getPage(1).then((page) => {
        console.log('inside the page part');
        page.getTextContent({ normalizeWhitespace: true }).then((textContent) => {
          console.log('Inside text context part');
          console.log(textContent);
        });
      });
    });
  }

  render() {

    return (
      <div>
        <p>hello world</p>
      </div>
    );
  }
}

export default PdfViewer;