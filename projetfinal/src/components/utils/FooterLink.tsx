import React from "react";

function FooterLink({ handleOnClick, lien, img }) {
	return (
		<div className="footer-links">
			<a href={lien} className="footer-link" onClick={handleOnClick}>
				{img}
			</a>
		</div>
	);
}

export default FooterLink;
