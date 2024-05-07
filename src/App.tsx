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
        <Route index element={<div>INDEX</div>} />
        <Route path="blog/*" element={<Blog />} />
        <Route path="experiments/*" element={<Experiments />} />
      </Routes>
    </>
  );
}

export default App;
