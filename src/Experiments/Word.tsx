import { Letter, LetterProps } from "./Letter";

export const Word = ({
  value,
  ...props
}: {
  value: string;
} & Omit<LetterProps, "value">) =>
  [...value].map((letter, i) => (
    <Letter key={`${letter}-${i}`} {...props} value={letter} />
  ));
