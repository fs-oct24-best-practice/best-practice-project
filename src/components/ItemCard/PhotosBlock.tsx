import {FC, useState} from 'react';
import {PhotoSelector, PhotoPreview} from '.';
import {ProductSpec} from '../../types/ProductSpec';

type Props = {currentProductSpec: ProductSpec};

export const PhotosBlock: FC<Props> = (props) => {
	const {currentProductSpec} = props;
	console.log('currentProductSpec PhotosBlock: ', currentProductSpec);

	const images = currentProductSpec.images;
	console.log('images: ', images);
	const [selectedImage, setSelectedImage] = useState(currentProductSpec.images[0]);

	return (
		<>
			<PhotoSelector
				images={currentProductSpec.images}
				setSelectedImage={setSelectedImage}
			/>
			<PhotoPreview selectedImage={selectedImage} />
		</>
	);
};
