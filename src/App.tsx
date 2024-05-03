import "./App.css";
import "./pxb-blink.bundled.js";
import EstimatingWork, {
  frontmatter as _EstimatingWorkFrontmatter,
} from "./EstimatingWork.mdx";
import { Link, Route, Routes } from "react-router-dom";
import { useRef } from "react";

const EstimatingWorkFrontmatter = _EstimatingWorkFrontmatter as {
  [key: string]: string | undefined;
};

function App() {
  console.log({ EstimatingWorkFrontmatter });

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <pxb-blink>Foo</pxb-blink>
              <br />
              <Link to={`/${EstimatingWorkFrontmatter.slug}`}>
                Estimating Work
              </Link>
              <br />
              <Link to="/dialog">Dialog</Link>
            </div>
          }
        />
        <Route
          path={EstimatingWorkFrontmatter.slug}
          element={
            <div>
              <div>
                <Link to="/">Home</Link>
              </div>
              <DialogDemo />
              <h1>{EstimatingWorkFrontmatter.title}</h1>
              <em>{EstimatingWorkFrontmatter.date}</em>
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
