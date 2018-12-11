
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

  setupCanvas = (viewport) => {
    const canvas = this.refs.canvas;
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d");
    return ctx;
  }

  renderSinglePage = (page) => {
    page.getTextContent({ normalizeWhitespace: true }).then((textContent) => {
      console.log('Inside text context part');
      textContent.styles.g_d0_f1.ascent = 0.5;
      console.log(textContent);    
    });
    var viewport = page.getViewport(1.0);
    const ctx = this.setupCanvas(viewport);
    var renderTask = page.render({
      canvasContext: ctx,
      viewport: viewport
    });
    console.log('render task: ', renderTask);
  }
 
  getPdfData = (url) => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.worker.js';
    pdfjsLib.getDocument('test.pdf').then((pdf) => {
      console.log('Inside pdf part');

      pdf.getMetadata().then((data) => {
        console.log('inside metadata part');
      });
      
      pdf.getPage(1).then((page) => {
        console.log('inside the page part');
        this.renderSinglePage(page);
      });
    });
  }

  componentDidMount () {
    this.getPdfData();
  }

  render() {

    return (
      <div>
        <p>E-book viewer</p>
        <canvas ref="canvas" width={640} height={425} />
      </div>
    );
  }
}

export default PdfViewer;