import { createContext } from "react";
const CurrentTemperatureUnitContext = createContext();
const temps = {
  F: "F",
  C: "C",
};
export { CurrentTemperatureUnitContext, temps };
