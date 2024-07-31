const Cross = () => {
	return (
		<div className="relative h-full w-full">
			<div className="relative w-full h-full">
				<div className="absolute w-4/5 h-2 m-auto bg-red-600 transform rotate-45 top-1/2 rounded-full"></div>
				<div className="absolute w-4/5 h-2 m-auto bg-red-600 transform -rotate-45 top-1/2 rounded-full"></div>
			</div>
		</div>
	);
};

export default Cross;
