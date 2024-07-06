import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { Blog } from "./Blog/Blog.tsx";
import "./pxb-blink.bundled.js";
import { Experiments } from "./Experiments/Experiments.tsx";
import { Nav } from "./Nav/Nav.tsx";

function App() {
  return (
    <>
      <Nav>
        <Link to="/">Home</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/experiments">Experiments</Link>
      </Nav>
      <Routes>
        <Route
          index
          element={
            <div>
              <p>
                This isn't a portfolio, and it isn't a demo site. I guess it's
                my sketchpad, that I've left open on the dining room table.
              </p>
              <p>
                It's a Vite site on GH pages, in case you couldn't tell from the
                URL. The most interesting thing on it at the moment is the color
                experiments.
              </p>
            </div>
          }
        />
        <Route path="blog/*" element={<Blog />} />
        <Route path="experiments/*" element={<Experiments />} />
      </Routes>
    </>
  );
}

export default App;
