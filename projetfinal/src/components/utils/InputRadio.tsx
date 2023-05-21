import React, { useState } from "react";

function InputRadio(value: string, name: string, defaultValue: string) {
  const [filtreOption, setFiltreOption] = useState(defaultValue);
  return (
    <label>
      <input
        type="radio"
        value={value}
        name={name}
        checked={filtreOption === value}
        onChange={() => setFiltreOption(value)}
      />
      {value}
    </label>
  );
}

export default InputRadio;
