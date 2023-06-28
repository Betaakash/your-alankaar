import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./App.css";
import jsPDF from "jspdf";

const noteSets = [
  {
    id: 1,
    label: "Sa re ga..",
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
    label: "Do re mi...",
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
  const [buttonTitle, setButtonTitle] = useState("Get Pattern");

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

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.text("Entered Pattern: " + pattern, 10, 10);
    doc.text("Aaroh / Ascending:", 10, 20);
    convertedAarohNotes.forEach((notes, index) => {
      doc.text(notes, 10, 30 + index * 10);
    });
    doc.text("Avroh / Descending:", 10, 40 + convertedAarohNotes.length * 10);
    convertedAvrohNotes.forEach((notes, index) => {
      doc.text(
        notes.split(" ").reverse().join(" "),
        10,
        50 + (convertedAarohNotes.length + index) * 10
      );
    });

    doc.save("Your Alankar.pdf");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          Your Alankar
        </a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Home<span className="sr-only"></span>
              </a>

              <a className="nav-link" href="/">
                About<span className="sr-only"></span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="hh1">
        <h1>Generates Alankaar Patterns for you to Practice.</h1>
      </div>

      <div className="container">
        <div className="row">
          <div className="col1">
            <h3>
              Refer to the image: <br />
              Eg: Sa Re Ga Re Sa becomes 12321
            </h3>
            <div className="main-part">
              <label className="font-link">Select Note Style:</label>
              <select
                className="select"
                value={selectedNoteSet.id}
                onChange={handleNoteSetChange}
              >
                {noteSets.map((set) => (
                  <option key={set.id} value={set.id}>
                    {set.label}
                  </option>
                ))}
              </select>

              <br />

              <label className="font-link">Enter Pattern:</label>
              <input
                type="text"
                value={pattern}
                onChange={handlePatternChange}
                pattern="[1-7]*"
                placeholder="Enter here..."
                // title="Please enter a valid pattern using numbers from 1 to 7 only."
              />
              <br />
              <button
                onClick={handleNextIterations}
                disabled={iterationsPrinted}
              >
                {iterationsPrinted ? buttonTitle : "Generate"}
              </button>
            </div>
            <br />
          </div>
          <div className="col2">
            <img src="assets\Refer.png" alt="yo" />
          </div>
       
        </div>
      </div>

      

      <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
        <h2 className="font-link">Entered Pattern: {pattern}</h2>
        <h3 className="font-link">Aaroh / Ascending:</h3>
        <ul>
          {convertedAarohNotes.map((notes, index) => (
            <li key={index}>{notes}</li>
          ))}
        </ul>
        <h3 className="font-link">Avroh / Descending:</h3>
        <ul>
          {convertedAvrohNotes.reverse().map((notes, index) => (
            <li key={index}>{notes.split(" ").reverse().join(" ")}</li>
          ))}
        </ul>
        <button onClick={handleDownloadPDF}>Download PDF</button>
        <button onClick={handleCloseModal}>Close</button>
      </Modal>
    </div>
  );
};

export default App;
