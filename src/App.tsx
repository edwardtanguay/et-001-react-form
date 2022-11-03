import { useState } from 'react';
import './App.scss';

const isDebugging = true;

interface IFormData {
	jobTitle: string;
	description: string;
	location: string;
	remote: boolean;
	fullTime: boolean;
	salary: number;
}

const _formData: IFormData = {
	jobTitle: '',
	description: '',
	location: 'hamburg',
	remote: false,
	fullTime: false,
	salary: 0
};

function App() {
	const [formData, setFormData] = useState<IFormData>(_formData);

	const handleChangeFormField = (e: any, fieldName: string) => {
		const value = e.target.value;
		const checked = e.target.checked;
		switch (fieldName) {
			case 'jobTitle':
				if (value === '/rb') {
					formData.jobTitle = 'React Developer Job';
					formData.location = 'berlin';
					formData.remote = true;
				} else {
					formData.jobTitle = value;
				}
				break;
			case 'description':
				formData.description = value;
				break;
			case 'location':
				formData.location = value;
				break;
			case 'remote':
				formData.remote = checked;
				break;
			case 'fullTime':
				formData.fullTime = checked;
				break;
			case 'salary':
				const salaryAsNumber = Number(value);
				console.log(salaryAsNumber);
				if (!isNaN(salaryAsNumber)){
					formData.salary = salaryAsNumber; 
				}
				break;
		}
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
									spellCheck="false"
									onChange={(e) =>
										handleChangeFormField(e, 'description')
									}
								/>
							</div>
						</div>

						<div className="row">
							<label>Location</label>
							<div>
								<select
									value={formData.location}
									onChange={(e) =>
										handleChangeFormField(e, 'location')
									}
								>
									<option value="berlin">Berlin</option>
									<option value="hamburg">Hamburg</option>
									<option value="leipzig">Leipzig</option>
								</select>
							</div>
						</div>

						<div className="row">
							<label>Details</label>
							<div className="checkboxes">
								<div className="checkboxItem">
									<input
										type="checkbox"
										checked={formData.remote}
										onChange={(e) =>
											handleChangeFormField(e, 'remote')
										}
									/>
									remote
								</div>
								<div className="checkboxItem">
									<input
										type="checkbox"
										checked={formData.fullTime}
										onChange={(e) =>
											handleChangeFormField(e, 'fullTime')
										}
									/>
									full-time
								</div>
							</div>
						</div>

						<div className="row">
							<label>Monthly Salary in Euros</label>
							<div>
								<input
									value={formData.salary === 0 ? '' : formData.salary.toString()}
									type="text"
									onChange={(e) =>
										handleChangeFormField(e, 'salary')
									}
								/>
							</div>
						</div>

					</fieldset>
				</form>
				{isDebugging && (
					<div className="debuggingArea">
						<pre>{JSON.stringify(formData, null, 2)}</pre>
					</div>
				)}
			</section>
		</div>
	);
}

export default App;
