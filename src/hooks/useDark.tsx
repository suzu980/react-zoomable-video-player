import React, { useEffect, useState } from "react";

const useDark = () => {
  const [isDark, setIsDark] = useState(false);
  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.body.classList.toggle("dark");
  };
  return { isDark, toggleDarkMode };
};

export default useDark;
