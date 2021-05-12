import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Loading = () => {
	return (
		<center style={{ placeItems: "center", height: "100vh" }}>
			<div>
				<ClipLoader color="grey" size={150} />
			</div>
		</center>
	);
};

export default Loading;
