import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const noteSets = [
  {
    id: 1,
    label: "Set 1 (sa re ga ma pa dha ni)",
    notes: {
      "1": "sa",
      "2": "re",
      "3": "ga",
      "4": "ma",
      "5": "pa",
      "6": "dha",
      "7": "ni",
    },
  },
  {
    id: 2,
    label: "Set 2 (do re mi fa so la ti)",
    notes: {
      "1": "do",
      "2": "re",
      "3": "mi",
      "4": "fa",
      "5": "so",
      "6": "la",
      "7": "ti",
    },
  },
];

const App = () => {
  const [pattern, setPattern] = useState("");
  const [convertedNotes, setConvertedNotes] = useState([]);
  const [iterationsPrinted, setIterationsPrinted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNoteSet, setSelectedNoteSet] = useState(noteSets[0]);
  const [buttonTitle, setButtonTitle] = useState("Get Pattern");

  const convertPatternToNotes = (pattern) => {
    const notes = pattern.split("").map((digit) => selectedNoteSet.notes[digit]);
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
      const iterations = 8; // Update the number of iterations to 8
      const iterationsList = [pattern]; // Initialize the list with the first pattern

      let nextPattern = pattern;

      for (let i = 0; i < iterations - 1; i++) {
        nextPattern = generateNextIteration(nextPattern);
        iterationsList.push(nextPattern);
      }

      const convertedIterations = iterationsList.map((iter) =>
        convertPatternToNotes(iter)
      );

      setConvertedNotes(convertedIterations);
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
      setIterationsPrinted(false);
      setButtonTitle("Get Pattern");
    }
  };

  useEffect(() => {
    if (iterationsPrinted && convertedNotes.length > 0) {
      const convertedIterations = convertedNotes.map((iter) =>
        convertPatternToNotes(iter)
      );
      setConvertedNotes(convertedIterations);
    }
  }, [selectedNoteSet]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          Your Aalap
        </a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Quick Tutorial: <span className="sr-only"></span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <label>Enter the pattern:</label>
      <input
        type="text"
        value={pattern}
        onChange={handlePatternChange}
        pattern="[1-7]*"
        maxLength="7"
        title="Please enter a valid pattern using numbers from 1 to 7 only."
      />
      <br />
      <label>Select note set:</label>
      <select value={selectedNoteSet.id} onChange={handleNoteSetChange}>
        {noteSets.map((set) => (
          <option key={set.id} value={set.id}>
            {set.label}
          </option>
        ))}
      </select>
      <br />
      <button onClick={handleNextIterations} disabled={iterationsPrinted}>
        {iterationsPrinted ? buttonTitle : "Get Pattern"}
      </button>
      <br />
      <h2>Converted Notes:</h2>
      <ul>
        {convertedNotes.map((notes, index) => (
          <li key={index}>{notes}</li>
        ))}
      </ul>

      <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
        <h2>Iterations</h2>
        <ul>
          {convertedNotes.map((notes, index) => (
            <li key={index}>{notes}</li>
          ))}
        </ul>
        <button onClick={handleCloseModal}>Close</button>
      </Modal>
    </div>
  );
};

export default App;
