import styles from "./Button.module.css";

export default function Button({ color, text, function_action }) {
  return (
    <button style={{ background: color }} onClick={function_action}>
      {text}
    </button>
  );
}
