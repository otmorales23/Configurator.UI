import React, { Component } from 'react';
import { useDropzone } from 'react-dropzone';
import './fileupload.css';

export class FileUpload extends Component {
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

    // Function to handle file change
    handleFileChange = (e) => {
        this.setState({ file: e.target.files[0] });
    };

    // Function to handle file upload
    handleFileUpload = (file) => {
        if (!file) {
            alert('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        fetch('upload/upload', {
            method: 'POST',
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data.message); // Display success message

                // Fetch the updated list of file names after a successful upload.
                return fetch('upload/files');
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                this.setState({ files: data });
            })
            .catch((error) => {
                console.error(error);
                alert('File upload failed');
            });
    };

    // Fetch files from the server on component mount
    componentDidMount() {
        fetch('upload/files')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                this.setState({ files: data, loading: false });
            })
            .catch((error) => {
                console.error(error);
                this.setState({ loading: false });
            });
    }

    renderFileList = () => {
        const { loading, files } = this.state;
        if (loading) {
            return <p><em>Loading...</em></p>;
        }
        return (
            <ul>
                {files.map((file) => (
                    <li key={file}>
                        {file} <button onClick={() => this.handleDownload(file)}>Download</button>
                    </li>
                ))}
            </ul>
        );
    };

    render() {
        const { loading } = this.state;
        return (
            <div className="App">
                <h1>File Upload/Drag and Drop</h1>
                <h4>To upload files via drag and drop, drag the file into the area between "choose file" and "upload".</h4>
                <div className="dropzone">
                    <input type="file" onChange={this.handleFileChange} />
                    <button onClick={() => this.handleFileUpload(this.state.file)}>Upload</button>
                </div>

                <h1>File List</h1>
                {loading ? <p><em>Loading...</em></p> : this.renderFileList()}
            </div>
        );
    }
}

export default FileUpload;
