import React, { Children, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
const styles = stylex.create({
  button: {
    height: "5vh",
    width: "5vw",
    backgroundColor: "black",
    color: "white",
  },
  fileInput:{ display: "none"}
});
const FileDragAndDrop = ({ children }) => {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [fileURLs, setFileURLs] = useState([]);

  // Prevent default behavior for drag events
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  // Handle dropping files
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const droppedFiles = [...e.dataTransfer.files];
    setFiles(droppedFiles);

    // Handle the files (e.g., upload or process them)
    handleFiles(droppedFiles);
  };

  // Handle file input change
  const handleFileInputChange = (e) => {
    const selectedFiles = [...e.target.files];
    setFiles(selectedFiles);

    // Handle the files (e.g., upload or process them)
    handleFiles(selectedFiles);
  };

  // Handle the files (e.g., upload or process them)

  // Handle the files (e.g., upload or process them)
  const handleFiles = (files) => {
    const newFileURLs = files.map((file) => {
      console.log(`File name: ${file.name}, File size: ${file.size} bytes`);
      // Create a URL for the file
      const fileURL = URL.createObjectURL(file);
      console.log(`File URL: ${fileURL}`);
      // Return the URL to be stored in the state
      return fileURL;
    });

    setFileURLs(newFileURLs);
    // Here you can add logic to upload or process the file
  };

  return (
    <div
      className={`file-drag-drop ${dragging ? "dragging" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="fileInput"
        className="file-input"
        onChange={handleFileInputChange}
        multiple
        {...stylex.props(styles.fileInput)}
      />
      <label htmlFor="fileInput" className="file-label">
        {children}
      </label>
      {files.length > 0 && (
        <div className="file-list">
          <h4>Selected Files:</h4>
          <ul>
            {files.map((file, index) => (
              <li key={index}>
                {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileDragAndDrop;
