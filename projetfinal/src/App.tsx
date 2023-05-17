import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageTest from "./components/PageTest";
import NavBar from "./components/NavBar";
import TestNavbarFooter from "./components/TestNavbarFooter";
import Footer from "./components/Footer";
import PageAccueil from "./components/PageAccueil";
import PageVueCompagnon from "./components/PageVueCompagnon";

function App() {
	return (
		<div className="App">
			<NavBar></NavBar>
			<BrowserRouter>
				<Routes>
					<Route path="pagetest" element={<PageTest />} />

					<Route path="/" element={<PageAccueil />} />
					<Route path="testfooter" element={<TestNavbarFooter />} />
					<Route path="description" element={<PageVueCompagnon />} />
				</Routes>
			</BrowserRouter>
			<Footer></Footer>
		</div>
	);
}

export default App;
