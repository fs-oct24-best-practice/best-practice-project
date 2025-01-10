export const PhotoPreview = ({selectedImage}) => {
	return (
		<>
			<img
				src={selectedImage}
				key={selectedImage}
				width='464px'
				height='464px'
				alt='preview'
			/>
		</>
	);
};
