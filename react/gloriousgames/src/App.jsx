import { useState, createContext, useEffect } from "react";

const GGContext = createContext({});

function App({ children }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser({ name: "example" });
  }, []);

  return (
    <GGContext.Provider value={{ user: user }}>{children}</GGContext.Provider>
  );
}

export default App;
