import "./App.css";
import "./pxb-blink.bundled.js";
import EstimatingWork from "./EstimatingWork.mdx";
import { Link, Route, Routes } from "react-router-dom";
import { useRef } from "react";

function App() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <pxb-blink>Foo</pxb-blink>
              <br />
              <Link to="/estimating-work">Estimating Work</Link>
              <br />
              <Link to="/dialog">Dialog</Link>
            </div>
          }
        />
        <Route
          path="estimating-work"
          element={
            <div>
              <div>
                <Link to="/">Home</Link>
              </div>
              <DialogDemo />
              <EstimatingWork />
            </div>
          }
        />
        <Route
          path="dialog"
          element={
            <div>
              <div>
                <Link to="/">Home</Link>
              </div>
              <DialogDemo />
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;

const DialogDemo = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <div>
        <button onClick={() => dialogRef.current?.showModal()}>
          Open dialog
        </button>
      </div>
      <style>
        {`
  dialog {
    background-color: white;
    color: black;
    border: 1px solid black;
    border-radius: 5px;
  }
  ::backdrop {
    background-color: purple;
    opacity: 0.5;
  }
  `}
      </style>
      <dialog ref={dialogRef}>
        <form method="dialog">
          <button type="submit">Close</button>
          <br />
          Here's some dialog content
        </form>
      </dialog>
    </>
  );
};
