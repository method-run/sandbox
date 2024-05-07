export type MdxFrontmatter = {
  title: string;
  date: string;
  slug: string;
};

export const isMdxFrontmatter = (
  _possibleFrontmatter: unknown
): _possibleFrontmatter is MdxFrontmatter => {
  const possibleFrontmatter = _possibleFrontmatter as Partial<MdxFrontmatter>;

  return (
    typeof possibleFrontmatter.title === "string" &&
    typeof possibleFrontmatter.date === "string" &&
    typeof possibleFrontmatter.slug === "string"
  );
};
