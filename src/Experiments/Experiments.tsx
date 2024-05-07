import { Link, Route, Routes } from "react-router-dom";
import { DialogDemo } from "./DialogDemo";
import { Nav } from "../Nav/Nav";

export const Experiments = () => {
  return (
    <>
      <h1>Experiments</h1>
      <Nav>
        <Link to="/experiments/pxb-blink">pxb-blink</Link>
        <Link to="/experiments/colors">Colors</Link>
        <Link to="/experiments/dialog-demo">DialogDemo</Link>
      </Nav>
      <Routes>
        <Route index element={<div>INDEX</div>} />
        <Route
          path="pxb-blink"
          element={
            <div>
              <pxb-blink>Foo</pxb-blink>
            </div>
          }
        />
        <Route
          path={"colors"}
          element={
            <div>
              <h2>Colors</h2>
              <p>colors demos</p>
            </div>
          }
        />
        <Route path={"dialog-demo"} element={<DialogDemo />} />
      </Routes>
    </>
  );
};
