declare module '*.mdx' {
    const frontmatter: unknown;
    export { frontmatter };
    export default function MDXContent(props: MDXProps): Element;
  }

  declare namespace JSX {
    interface IntrinsicElements {
      // Add your custom elements here
      'pxb-blink': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      // Example above assumes 'my-custom-element' is the name of your custom element.
    }
  }