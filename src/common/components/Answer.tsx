import styles from "./Answer.module.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  showAnswers: boolean;
  correct: boolean;
}
export const Answer = ({ showAnswers, correct, children, ...props }: Props) => (
  <button className={`${styles.button} ${showAnswers && correct ? styles.green : ""} ${showAnswers && !correct ? styles.red : ""}`} {...props}>
    {children}
  </button>
);
