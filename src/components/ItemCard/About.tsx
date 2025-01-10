import {FC, Fragment} from 'react';

import {ProductSpec} from '../../types/ProductSpec';

type Props = {
	currentProductSpec: ProductSpec;
};

export const About: FC<Props> = (props) => {
	const {
		currentProductSpec: {description},
	} = props;
	return (
		<>
			<h2>About</h2>
			{description.map((declaration, idx) => {
				return (
					<Fragment key={idx}>
						<h3>{declaration.title}</h3>
						<div>
							{declaration.text.map((paragraph, idx) => {
								return <p key={idx}>{paragraph}</p>;
							})}
						</div>
					</Fragment>
				);
			})}
		</>
	);
};
