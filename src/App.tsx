import { useState } from 'react';
import './App.scss';

const isDebugging = true;

interface IFormData {
	jobTitle: string;
	description: string;
}

const _formData: IFormData = {
	jobTitle: '',
	description: '',
};

function App() {
	const [formData, setFormData] = useState<IFormData>(_formData);

	const handleChangeFormField = (e: any, fieldName: string) => {
		const value = e.target.value;
		formData[fieldName as keyof IFormData] = value;
		setFormData({ ...formData });
	};

	return (
		<div className="App">
			<h1>Job Site</h1>
			<section>
				<form>
					<fieldset>
						<legend>New Job</legend>
						<div className="row">
							<label>Job Title</label>
							<div>
								<input
									value={formData.jobTitle}
									type="text"
									onChange={(e) =>
										handleChangeFormField(e, 'jobTitle')
									}
								/>
							</div>
						</div>

						<div className="row">
							<label>Description</label>
							<div>
								<textarea
									value={formData.description}
									onChange={(e) =>
										handleChangeFormField(e, 'description')
									}
								/>
							</div>
						</div>
					</fieldset>
				</form>
				{isDebugging && (
				<div className="debuggingArea">
					<pre>
						{JSON.stringify(formData, null, 2)}
					</pre>
				</div>
				)}
			</section>
		</div>
	);
}

export default App;
