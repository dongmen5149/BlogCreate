import Landing from "@pages/Landing";
import React from "react";
import { Route, Routes } from "react-router";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing />}></Route>
        </Routes>
    )
}

export default App;