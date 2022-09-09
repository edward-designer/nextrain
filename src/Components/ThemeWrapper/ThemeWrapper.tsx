import React, { ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import useStateStorage from "../../Hooks/useStateStorage";

const ThemeWrapper = ({ children }: { children: ReactNode }) => {
  const { theme, setTheme } = useStateStorage();
  const changeTheme = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  const MUItheme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme,
        },
      }),
    [theme]
  );

  return (
    <div
      data-theme={theme}
      className="min-h-screen pt-10 bg-background-main text-text-primary"
      data-testid="wrapper"
      data-testid="wrapper"
    >
      <ThemeProvider theme={MUItheme}>
        <div
          onChange={changeTheme}
          className="absolute top-0 right-1 flex items-center justify-end p-2 gap-1 text-lg z-50"
        >
          <span>☀️</span>
          <label className="inline-block h-6 relative w-10" htmlFor="checkbox">
            <input
              className="peer translate-x-[100%] focus:z-50 focus:outline-none"
              type="checkbox"
              id="checkbox"
              defaultChecked={theme === "dark"}
              aria-label="toggle light and dark theme"
            />
            <div
              role="presentation"
              className="absolute rounded-full bg-slate-300 top-0 right-0 bottom-0 left-0 cursor-pointer transition-all duration:500
          before:absolute before:content-[''] before:h-5 before:w-5 before:bg-white before:rounded-full before:bottom-[2px] before:left-1 before:transition-all before:duration-500 
          peer-checked:bg-slate-700 peer-checked:before:translate-x-4 peer-focus-visible:ring peer-focus-visible:ring-focus-color"
            ></div>
          </label>
          <span>🌙</span>
        </div>
        {children}
      </ThemeProvider>
    </div>
  );
};

export default React.memo(React.memo(ThemeWrapper));
