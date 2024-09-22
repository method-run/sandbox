import { Link } from "react-router-dom";
import { isMdxFrontmatter } from "../Mdx";
import { Nav } from "../Nav/Nav";
import {
  ComponentProps,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

const importPostByPath = import.meta.glob("./posts/*.mdx");

export function PostsNav(navProps: ComponentProps<typeof Nav>): ReactNode {
  const [postsByPath, setPostsByPath] = useState<Record<string, unknown>>({});

  const fetchPostsAsync = useCallback(async () => {
    for (const [path, importPost] of Object.entries(importPostByPath)) {
      const post = await importPost();

      setPostsByPath((prev) => ({
        ...prev,
        [path]: post,
      }));
    }
  }, []);

  useEffect(() => {
    fetchPostsAsync();
  }, [fetchPostsAsync]);

  return (
    <Nav {...navProps}>
      {Object.values(postsByPath).map((post) => {
        const frontmatter = (post as { frontmatter: unknown })?.frontmatter;

        if (!frontmatter || !isMdxFrontmatter(frontmatter)) {
          return null;
        }

        return (
          <Link key={frontmatter.slug} to={`/blog/${frontmatter.slug}`}>
            {frontmatter.title}
          </Link>
        );
      })}
    </Nav>
  );
}
