import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import ExampleComponents from "./pages/ExampleComponets";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthProvider } from "./contexts/AuthContext";

const App: React.FC = () => {
	return (
		<AuthProvider>
			<Router>
				<div className="flex flex-col">
					<Header />
					<main className="flex-1">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/about" element={<About />} />
							<Route
								path="/example-components"
								element={<ExampleComponents />}
							/>
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</main>
					<Footer />
				</div>
			</Router>
		</AuthProvider>
	);
};

export default App;
