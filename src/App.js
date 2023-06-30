import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import About from "./about";
import Modal from "react-modal";
import "./App.css";
import jsPDF from "jspdf";
import referimg from "./Images/Refer.png";

const noteSets = [
  {
    id: 1,
    label: "Sa Re Ga..",
    notes: {
      1: "Sa",
      2: "Re",
      3: "Ga",
      4: "Ma",
      5: "Pa",
      6: "Dha",
      7: "Ni",
    },
  },
  {
    id: 2,
    label: "Do Re Mi...",
    notes: {
      1: "Do",
      2: "Re",
      3: "Mi",
      4: "Fa",
      5: "So",
      6: "La",
      7: "Ti",
    },
  },
];

const App = () => {
  const [pattern, setPattern] = useState("");
  const [convertedAarohNotes, setConvertedAarohNotes] = useState([]);
  const [convertedAvrohNotes, setConvertedAvrohNotes] = useState([]);
  const [iterationsPrinted, setIterationsPrinted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNoteSet, setSelectedNoteSet] = useState(noteSets[0]);
  const [buttonTitle, setButtonTitle] = useState("Regenerate");

  const convertPatternToNotes = (pattern) => {
    const notes = pattern
      .split("")
      .map((digit) => selectedNoteSet.notes[digit]);
    return notes.join(" ");
  };

  const handlePatternChange = (e) => {
    const inputPattern = e.target.value;
    const isValidPattern = /^[1-7]*$/.test(inputPattern);

    if (isValidPattern) {
      setPattern(inputPattern);
      setIterationsPrinted(false);
    }
  };

  const generateNextIteration = (currentPattern) => {
    let nextPattern = "";

    for (let i = 0; i < currentPattern.length; i++) {
      let nextDigit = parseInt(currentPattern[i]) + 1;

      if (nextDigit > 7) {
        nextDigit = 1;
      }

      nextPattern += nextDigit.toString();
    }

    return nextPattern;
  };

  const handleNextIterations = () => {
    if (pattern.length === 0) {
      // If the pattern is empty, show the pop-up message
      window.alert("Please enter an initial pattern first...");
      return; // Exit the function to prevent further execution
    }
    if (pattern.length > 0) {
      const iterations = 8;
      const iterationsList = [pattern];

      let nextPattern = pattern;

      for (let i = 0; i < iterations - 1; i++) {
        nextPattern = generateNextIteration(nextPattern);
        iterationsList.push(nextPattern);
      }

      const convertedAarohIterations = iterationsList.map((iter) =>
        convertPatternToNotes(iter)
      );
      const convertedAvrohIterations = [...convertedAarohIterations].reverse();

      setConvertedAarohNotes(convertedAarohIterations);
      setConvertedAvrohNotes(convertedAvrohIterations);
      setIterationsPrinted(true);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNoteSetChange = (e) => {
    const selectedSetId = parseInt(e.target.value);
    const selectedSet = noteSets.find((set) => set.id === selectedSetId);
    setSelectedNoteSet(selectedSet);

    if (iterationsPrinted) {
      const convertedAarohIterations = [...convertedAarohNotes];
      const convertedAvrohIterations = [...convertedAarohNotes].reverse();
      setConvertedAarohNotes(convertedAarohIterations);
      setConvertedAvrohNotes(convertedAvrohIterations);
      setIterationsPrinted(false);
      setButtonTitle("Generate");
    }
  };

  useEffect(() => {
    if (iterationsPrinted && convertedAarohNotes.length > 0) {
      const convertedAarohIterations = convertedAarohNotes.map((iter) =>
        convertPatternToNotes(iter)
      );
      const convertedAvrohIterations = [...convertedAarohIterations].reverse();

      setConvertedAarohNotes(convertedAarohIterations);
      setConvertedAvrohNotes(convertedAvrohIterations);
    }
  }, [selectedNoteSet]);

  const AlertBox = ({ message, onClose }) => {
    return (
      <div className="alert-box">
        <div className="alert-content">
          <h3 className="alert-message">{message}</h3>
          <button className="alert-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const margin = 15;
    const pageWidth = doc.internal.pageSize.width;
    const lineHeight = 6;
    const headingSpacing = 7;
    const boldFontStyle = "underline";
    let y = margin;

    doc.text("Entered Pattern: " + pattern, margin, y);
    y += lineHeight + headingSpacing;

    doc.setFont(boldFontStyle);
    doc.text("Aaroh / Ascending:", margin, y);
    doc.setFont("Inter");
    y += lineHeight + headingSpacing;

    convertedAarohNotes.forEach((notes) => {
      const lines = doc.splitTextToSize(notes, pageWidth - 2 * margin);
      lines.forEach((line) => {
        doc.text(line, margin, y);
        y += lineHeight;
        if (y >= doc.internal.pageSize.height - margin) {
          doc.addPage();
          y = margin;
        }
      });
      doc.line(margin, y, pageWidth - margin, y); // Add a divider line
      y += lineHeight;
    });

    y += lineHeight + headingSpacing;

    doc.setFont(boldFontStyle);
    doc.text("Avroh / Descending:", margin, y);
    doc.setFont("Inter");
    y += lineHeight + headingSpacing;

    convertedAvrohNotes.forEach((notes) => {
      const reversedNotes = notes.split(" ").reverse().join(" ");
      const lines = doc.splitTextToSize(reversedNotes, pageWidth - 2 * margin);
      lines.forEach((line) => {
        doc.text(line, margin, y);
        y += lineHeight;
        if (y >= doc.internal.pageSize.height - margin) {
          doc.addPage();
          y = margin;
        }
      });
      doc.line(margin, y, pageWidth - margin, y);
      y += lineHeight;
    });

    doc.save("Your Alankar.pdf");
  };

  return (
    <>
      <BrowserRouter>
        
        <Routes>
          <Route path="/about" element={<About />} />
        </Routes>
        <div className="hero">
          Generates Alankaar Patterns for you to Practice.
        </div>
        <div className="master">
          <div className="div1">
            <div className="main-part">
              <label className="font-link">Select Note Style:</label>
              <select value={selectedNoteSet.id} onChange={handleNoteSetChange}>
                {noteSets.map((set) => (
                  <option key={set.id} value={set.id}>
                    {set.label}
                  </option>
                ))}
              </select>

              <br />

              <label className="font-link">Enter Pattern:</label>
              <input
                className="select"
                type="text"
                value={pattern}
                onChange={handlePatternChange}
                pattern="[1-7]*"
                placeholder="Enter here..."
                // title="Please enter a valid pattern using numbers from 1 to 7 only."
              />
              <br />
              <button onClick={handleNextIterations}>
                {iterationsPrinted ? buttonTitle : "Generate"}
              </button>
            </div>
          </div>

          <div className="div2">
            <img src={referimg} alt="yo" />
          </div>
          
        </div>

        <nav className="navbar fixed-top">
          <ul className="nav-list">
            <li className="logo">Alankaar</li>
            <div className="rightNav">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </div>
          </ul>
        </nav>{" "}
        <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
          <button onClick={handleDownloadPDF}>Download PDF</button>
          <h5>You can take a Screenshot or Download PDF</h5>
          <h2 className="font-linkk">Entered Pattern: {pattern}</h2>
          <h3 className="font-linkk">Aaroh / Ascending:</h3>
          <ul>
            {convertedAarohNotes.map((notes, index) => (
              <li key={index}>{notes}</li>
            ))}
          </ul>
          <h3 className="font-linkk">Avroh / Descending:</h3>
          <ul>
            {convertedAvrohNotes.reverse().map((notes, index) => (
              <li key={index}>{notes.split(" ").reverse().join(" ")}</li>
            ))}
          </ul>
          <button onClick={handleCloseModal}>Close</button>
        </Modal>{" "}
      </BrowserRouter>
    </>
  );
};

export default App;
