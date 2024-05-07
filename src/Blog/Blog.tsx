import { Link, Route, Routes } from "react-router-dom";
import EstimatingWork, {
  frontmatter as EstimatingWorkFrontmatter,
} from "./posts/EstimatingWork.mdx";
import { DialogDemo } from "../Experiments/DialogDemo";
import { isMdxFrontmatter } from "../Mdx";
import { Nav } from "../Nav/Nav";

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
        <Route index element={<div>INDEX</div>} />
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
