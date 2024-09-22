import { Route } from "react-router-dom";
import { isMdxFrontmatter, MdxFrontmatter } from "../Mdx";
import { ComponentProps, ReactNode } from "react";

const importPostByPath = import.meta.glob("./posts/*.mdx");

export async function getPostRoutesAsync(): Promise<
  Array<ComponentProps<typeof Route> & { slug: string }>
> {
  const postsByPath: Record<string, unknown> = {};

  for (const [path, importPost] of Object.entries(importPostByPath)) {
    const post = await importPost();
    postsByPath[path] = post;
  }

  const posts: Array<ComponentProps<typeof Route> & { slug: string }> =
    Object.values(postsByPath)
      .filter(
        (
          post
        ): post is {
          default: () => ReactNode;
          frontmatter: MdxFrontmatter;
        } => {
          const frontmatter = (post as { frontmatter: unknown })?.frontmatter;
          const Post = (post as { default: () => ReactNode })?.default;
          if (
            !frontmatter ||
            !isMdxFrontmatter(frontmatter) ||
            typeof Post !== "function"
          ) {
            return false;
          }

          return true;
        }
      )
      .map(({ default: Post, frontmatter }) => ({
        slug: frontmatter.slug,
        path: frontmatter.slug,
        element: (
          <div>
            <h1>{frontmatter.title}</h1>
            <em>{frontmatter.date}</em>
            <Post />
          </div>
        ),
      }));

  return posts;
}
