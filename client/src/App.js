import React from "react";
import React from "react";
import { CSSReset, ThemeProvider } from "@chakra-ui/react";
import customTheme from "./theme/";
import NavBar from "./Components/NavBar/NavBar";
import LandingPage from "./Components/LandingPage/LandingPage";
import { Fonts } from "./theme/Fonts";

function App() {
  return (
    <>
      <React.StrictMode>
        <ThemeProvider theme={customTheme}>
          <Fonts />
          <CSSReset />
          <StateContext.Provider value={{ state, dispatch }}>
            <NavBar />
            <TransitionRouter>
              <LandingPage path="/" />
              <AddTopic path="/add_topic" />
              <Profile path="/profile" />
              <SingleTopicPage path="single_topic/:id" />
              <PageNotFound default />
            </TransitionRouter>
            <Footer />
          </StateContext.Provider>
        </ThemeProvider>
      </React.StrictMode>
    </>
  );
}

<<<<<<< HEAD
export default App;
=======
export { StateContext, App };
>>>>>>> e3d34fdabd5ab3d75f5589755ec3c8b983e4eb63
