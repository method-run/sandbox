import { Link, Route, Routes } from "react-router-dom";
import { DialogDemo } from "./DialogDemo";
import { Nav } from "../Nav/Nav";
import { Colors } from "./Colors";
import { Landscapes } from "./Landscapes/Landscapes";

export const Experiments = () => {
  return (
    <>
      <h1>Experiments</h1>
      <Nav>
        <Link to="/experiments/pxb-blink">pxb-blink</Link>
        <Link to="/experiments/colors">Colors</Link>
        <Link to="/experiments/landscapes">Landscapes</Link>
        <Link to="/experiments/dialog-demo">DialogDemo</Link>
      </Nav>
      <Routes>
        <Route
          index
          element={
            <div>
              <p>
                This is really just a code sandbox, but on the actual web, so I
                can do things like (checks notes) practice embedding the world's
                dumbest Lit component in an honest to god website instead of
                Lit's own demo site template.
              </p>
            </div>
          }
        />
        <Route
          path="pxb-blink"
          element={
            <div>
              <pxb-blink>Foo</pxb-blink>
            </div>
          }
        />
        <Route path="landscapes/*" element={<Landscapes />} />
        <Route path="colors" element={<Colors />} />
        <Route path="dialog-demo" element={<DialogDemo />} />
      </Routes>
    </>
  );
};
