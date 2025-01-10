import {FC} from 'react';
import {ProductSpec} from '../../types/ProductSpec';

type Props = {currentProductSpec: ProductSpec};

export const TechSpecs: FC<Props> = (props) => {
	const {
		currentProductSpec: {
			screen,
			resolution,
			processor,
			ram,
			camera,
			zoom,
			cell,
			capacity,
		},
	} = props;
	return (
		<>
			<h3>Tech specs</h3>
			<table>
				<tbody>
					<tr>
						<td>Screen</td>
						<td>{screen}</td>
					</tr>

					<tr>
						<td>Resolution</td>
						<td>{resolution}</td>
					</tr>

					<tr>
						<td>Processor</td>
						<td>{processor}</td>
					</tr>

					<tr>
						<td>RAM</td>
						<td>{ram}</td>
					</tr>

					<tr>
						<td>Built in memory</td>
						<td>{capacity}</td>
					</tr>

					<tr>
						<td>Camera</td>
						<td>{camera}</td>
					</tr>

					<tr>
						<td>Zoom</td>
						<td>{zoom}</td>
					</tr>

					<tr>
						<td>Cell</td>
						<td>{cell?.join(', ')}</td>
					</tr>
				</tbody>
			</table>
		</>
	);
};
