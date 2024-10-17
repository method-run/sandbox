import { Link, Route, Routes } from "react-router-dom";
import { Nav } from "../../Nav/Nav";

export const Landscapes = () => {
  return (
    <>
      <Nav>
        <Link to="/akureyri">Akureyri</Link>
        <Link to="/geiranger">Geiranger</Link>
      </Nav>
      <Routes>
        <Route
          index
          element={
            <div>
              <p>
                I was playing with using CSS gradients to recreate some
                landscapes I saw on vacation. I hacked together some minimalist
                typography CSS to go with them.
              </p>
            </div>
          }
        />
      </Routes>
    </>
  );
};
