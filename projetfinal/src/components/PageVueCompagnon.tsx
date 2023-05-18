import React, { useEffect, useState } from "react";
import DescriptionComponent from "./DescriptionComponent";
import "./PageAccueil.css";
import "./PageVueCompagnon.css";

function PageVueCompagnon() {
	return (
		<div>
			<div className="container-general-page">
				<DescriptionComponent></DescriptionComponent>
			</div>
		</div>
	);
}

export default PageVueCompagnon;
