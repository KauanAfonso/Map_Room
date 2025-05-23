import { useState } from "react";
import "./ToggleSwitch.css";  // CSS tradicional

export function ToggleSwitch({ label, onToggle }) {
  const [checked, setChecked] = useState(false);

  function handleChange() {
    setChecked(!checked);
    if(onToggle) onToggle(!checked);
  }

  return (
    <label className="switch">
      <input type="checkbox" checked={checked} onChange={handleChange} />
      <span className="slider"></span>
      <span className="labelText">{label}</span>
    </label>
  );
}
