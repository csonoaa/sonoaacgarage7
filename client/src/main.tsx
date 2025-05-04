import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

document.title = "sonoaac garage - Car Valuation";

createRoot(document.getElementById("root")!).render(<App />);
