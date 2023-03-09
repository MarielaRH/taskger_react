import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DashboardPage } from "./pages/DashboardPage/DashboardPage";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import { Container } from "./layout/Container/Container";
import { MyTasksPage } from "./pages/MyTasksPage/MyTasksPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import ErrorBoundary from "./common/ErrorBoundary/ErrorBoundary";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Container>
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/taskger" element={<DashboardPage />}></Route>
            <Route path="/mytasks" element={<MyTasksPage />}></Route>
            <Route path="/profile" element={<ProfilePage />}></Route>
            <Route path="*" element={<NotFoundPage />}></Route>
          </Routes>
        </Container>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
