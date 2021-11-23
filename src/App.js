import { useEffect, useRef, useState } from "react";
import "./App.css";

const fruitOptions = [
  {
    label: "Apple",
    value: "apple",
  },
  {
    label: "Orange",
    value: "orange",
  },
  {
    label: "Kiwi",
    value: "kiwi",
  },
  {
    label: "Grapefruit",
    value: "grapefruit",
  },
];

function App() {
  const [text, setText] = useState("");
  const [tags, setTags] = useState([]);
  const [resetText, setResetText] = useState(false);
  const inputRef = useRef()

  const handleAddText = (e) => {
    const { value } = e.target;
    if (e.charCode === 32) {
      setResetText(true)
      setTags([...tags, {label: value, type: 'text'}]);
    }
    if (e.keyCode === 8 && tags.length) {
      const tagToEdit = tags[tags.length - 1]
      if (tagToEdit.type === 'tag') {
        const filteredTags = tags.filter((tag, i) => i !== tags.length - 1);
        setTags(filteredTags);
      } else {
        setText(tagToEdit.label)
      }
    }
    setText(value);
  };

  const handleAddFruit = (e) => {
    const { value } = e.target;
    setTags([...tags, { label: value, type: "tag" }]);
  };

  const deleteChip = (idx) => {
    const filteredTags = tags.filter((tag, i) => i !== idx);
    setTags(filteredTags);
  };

  useEffect(() => {
    if (resetText) {
      setText('')
      setResetText(false)
    }
  }, [resetText])

  return (
    <div className="App">
      <div id="editableDiv" onClick={() => inputRef.current.focus()}>
        {tags.map((tag, idx) => {
          let element;
          if (tag.type === "tag") {
            element = (
              <div className="chip">
                {tag.label}
                <button onClick={() => deleteChip(idx)}>x</button>
              </div>
            );
          } else {
            element = <p>&nbsp;{tag.label}&nbsp;</p>;
          }
          return element;
        })}
        <div className="previewAnchor">
          <span className='preview'>{text}</span>
        </div>
        <input
          ref={inputRef}
          id="text"
          type="text"
          name="text"
          value={text}
          onChange={handleAddText}
          onKeyPress={handleAddText}
          onKeyDown={handleAddText}
        />
      </div>
      <select onChange={handleAddFruit}>
        <option>--</option>
        {fruitOptions.map((fruit, i) => (
          <option key={i} value={fruit.value}>
            {fruit.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default App;
