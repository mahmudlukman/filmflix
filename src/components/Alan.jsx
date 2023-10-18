import alanBtn from "@alan-ai/alan-sdk-web";
import { useContext, useEffect } from "react";
import { ColorModeContext } from "../utils/ToggleColorMode";
import { fetchToken } from "../utils";

const useAlan = () => {
  const { setMode } = useContext(ColorModeContext);
  useEffect(() => {
    alanBtn({
      key: "00522e7acce5ce6f66506a49b48e0ddc2e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: ({ command, mode }) => {
        if (command === "changeMode") {
          if (mode === "light") {
            setMode("light");
          } else {
            setMode("dark");
          }
        } else if (command === 'login'){
          fetchToken()
        } else if (command === 'logout'){
          localStorage.clear()
          window.location.href = '/'
        }
      },
    });
  }, []);
};

export default useAlan;
