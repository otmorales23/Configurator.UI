import React, { Component } from 'react';
import './fileupload.css';

export class Download extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            uploadedFileName: null,
            files: [],
            selectedFile: null,
            loading: true,
        };
    }
}
// Function to handle file download
handleDownload = (fileName) => {
    fetch('upload/download/' + fileName, {
        method: 'GET',
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
        })
        .catch((error) => {
            console.error(error);
            alert('File download failed.');
        });
};