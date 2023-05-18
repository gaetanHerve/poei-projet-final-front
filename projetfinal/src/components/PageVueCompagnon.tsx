import React, { useEffect, useState } from "react";
import DescriptionComponent from "./DescriptionComponent";
import "./PageAccueil.css";
import "./PageVueCompagnon.css";

function PageVueCompagnon() {
	return (
		<div className="container-general">
			<DescriptionComponent></DescriptionComponent>
		</div>
	);
}

export default PageVueCompagnon;
