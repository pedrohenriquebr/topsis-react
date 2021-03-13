import { useState } from "react";
import topsis_predict from "./topsis";
import "./App.css";

function App() {
    const criteria = [
      { name: "Price", type: 1, weight: 0.1 },
      { name: "Hardware", type: 2, weight: 0.2 },
      { name: "Screen", type: 2, weight: 0.3 },
      { name: "Camera", type: 2, weight: 0.05 },
      { name: "Performance", type: 2, weight: 0.4 },
    ];
  
    const dataset = [
      [749, 5.1, 5.5, 4.2, 4.7],
      [5599, 9, 8.4, 8.8, 9.3],
      [699, 4.8, 5.1, 4.2, 4.2],
      [1368, 7.7, 8.6, 8.3, 4.6],
    ];
  const [state, _ ] = useState([...topsis_predict(dataset, criteria)]);

  return (
    <div>
      <ul>
        {state.map((d, i) => (
          <li key={i}>
            <span>Price: R$ {dataset[d][0]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
