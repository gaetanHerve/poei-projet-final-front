import React, { useEffect, useState } from "react";
import { Animal } from "./Animal";
import animal from "./AnimalData";
import DescriptionComponent from "./DescriptionComponent";
import "./PageAccueil.css";
import "./PageVueCompagnon.css";

function PageVueCompagnon() {
	// const { id } = useParams();
	// const [animal, setAnimal] = useState<Animal>();

	//     fetch(http://localhost:8080/site/rfcompagnon/${id})
	//       .then((res) => res.json())
	//       .then((data) => setAnimal(data));
	//   }, []);

	return (
		<div className="position-item">
			<div className="position-container-blank">
				<div className="container-general-page">
					<div className="details-container-bottom">
						<div className="details-container">
							<div className="object-title-separator">
								<h2 className="details-title-description">Description</h2>
								<hr className="separator" />
							</div>
							<div className="text-details-improvement">
								{animal.description}
							</div>
						</div>
					</div>
					<DescriptionComponent></DescriptionComponent>
				</div>
			</div>
			<div className="position-details"></div>
		</div>
	);
}

export default PageVueCompagnon;
function useParams(): { id: any } {
	throw new Error("Function not implemented.");
}
