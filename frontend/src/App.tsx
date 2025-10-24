import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Blog } from "./pages/Blog";
import { Blogs } from "./pages/Blogs";
import { Body } from "./pages/Body";
import { Publish } from "./pages/Publish";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />

          <Route
            path="/blogs"
            element={
              <Body>
                <Blogs />
              </Body>
            }
          />
          <Route
            path="/publish"
            element={<Publish />} // Render Publish directly without Body wrapper
          />
          <Route
            path="/blog/:id"
            element={
              <Body>
                <Blog />
              </Body>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
