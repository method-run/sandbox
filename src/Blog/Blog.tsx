import { Link, Route, Routes } from "react-router-dom";
import { DialogDemo } from "../Experiments/DialogDemo";
import { isMdxFrontmatter } from "../Mdx";
import { Nav } from "../Nav/Nav";
import EstimatingWork, {
  frontmatter as EstimatingWorkFrontmatter,
} from "./posts/EstimatingWork.mdx";

export const Blog = () => {
  if (!isMdxFrontmatter(EstimatingWorkFrontmatter)) {
    return null;
  }

  return (
    <>
      <h1>Blog</h1>
      <Nav>
        <Link to={`/blog/${EstimatingWorkFrontmatter.slug}`}>
          {EstimatingWorkFrontmatter.title}
        </Link>
      </Nav>
      <Routes>
        <Route
          index
          element={
            <div>
              <p>
                Oh, man. I don't know what to tell you. These are gonna be some
                random thoughts.
              </p>
              <p>
                I believe deeply in transparency and vulnerability. I like
                saying "Fuck it, ship it." But what comes out is ... you know, a
                mess.
              </p>
              <p>Enjoy this sporadically published blog.</p>
            </div>
          }
        />
        <Route
          path={EstimatingWorkFrontmatter.slug}
          element={
            <div>
              <DialogDemo />
              <h1>{EstimatingWorkFrontmatter.title}</h1>
              <em>{EstimatingWorkFrontmatter.date}</em>
              <EstimatingWork />
            </div>
          }
        />
      </Routes>
    </>
  );
};
