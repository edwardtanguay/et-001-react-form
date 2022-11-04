import { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const isDebugging = true;
const apiUrl = 'http://localhost:5556';

interface IJob {
	id: number;
	jobTitle: string;
	description: string;
	location: string;
	remote: boolean;
	fullTime: boolean;
	salary: number;
	postingDate: string;
	rank: number;
}

const _formData: IJob = {
	id: 0,
	jobTitle: '',
	description: '',
	location: '',
	remote: false,
	fullTime: false,
	salary: 0,
	postingDate: '',
	rank: 5,
};

function App() {
	const [formData, setFormData] = useState<IJob>(_formData);
	const [jobs, setJobs] = useState<IJob[]>([]);

	const loadJobs = async () => {
		const response = await axios.get(`${apiUrl}/jobs`);
		const _jobs = response.data;
		setJobs(_jobs);
	};

	useEffect(() => {
		loadJobs();
	}, []);

	const handleFormSave = (e: any) => {
		e.preventDefault();
		if (formData.jobTitle.trim() !== '') {
			(async () => {
				const response = await axios.post(`${apiUrl}/jobs`, formData);
				//clear, TODO: resolve this issue that jobTitle contains the first letter of past value, e.g. use deepCopy for formData
				_formData.jobTitle = '';
				setFormData(_formData);
				loadJobs();
			})();
		}
	};

	const handleChangeFormField = (obj: any, fieldName: string) => {
		if (fieldName === 'postingDate') {
			const chosenDate = obj;
			const chosenDateIso = chosenDate.toISOString().split('T')[0];
			formData.postingDate = chosenDateIso;
		} else {
			const e = obj;
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
					if (!isNaN(salaryAsNumber)) {
						formData.salary = salaryAsNumber;
					}
					break;
				case 'rank':
					formData.rank = (value/10);
					break;
			}
		}
		setFormData({ ...formData });
	};

	return (
		<div className="App">
			<h1>Job Site</h1>
			<section className="main">
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
									<option value="">please select</option>
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
										id="remote"
										checked={formData.remote}
										onChange={(e) =>
											handleChangeFormField(e, 'remote')
										}
									/>
									<label
										className="checkboxLabel"
										htmlFor="remote"
									>
										remote
									</label>
								</div>
								<div className="checkboxItem">
									<input
										id="fullTime"
										type="checkbox"
										checked={formData.fullTime}
										onChange={(e) =>
											handleChangeFormField(e, 'fullTime')
										}
									/>
									<label
										className="checkboxLabel"
										htmlFor="fullTime"
									>
										full-time
									</label>
								</div>
							</div>
						</div>

						<div className="row rowWholeNumber">
							<label>Monthly Salary in Euros</label>
							<div>
								<input
									value={
										formData.salary === 0
											? ''
											: formData.salary.toString()
									}
									type="text"
									onChange={(e) =>
										handleChangeFormField(e, 'salary')
									}
								/>
							</div>
						</div>

						<div className="row rowDate">
							<label>Job Posting Date</label>
							<div>
								<DatePicker
									value={formData.postingDate}
									selected={new Date()}
									onChange={(date: Date) =>
										handleChangeFormField(
											date,
											'postingDate'
										)
									}
								/>
							</div>
						</div>

						<div className="row rowRank">
							<label>Ranking from 0 to 10</label>
							<div>
								<input
									type="range"
									min="0"
									max="100"
									value={formData.rank * 10}
									onChange={(e) =>
										handleChangeFormField(e, 'rank')
									}
								/>
							</div>
						</div>

						<div className="buttonRow">
							<button onClick={(e) => handleFormSave(e)}>
								Save
							</button>
						</div>
					</fieldset>
				</form>
				<aside className="right">
					{isDebugging && (
						<>
							<div className="debuggingArea">
								<h3>Debugging Panel:</h3>
								<pre>{JSON.stringify(formData, null, 2)}</pre>
							</div>
						</>
					)}
					<div className="jobs">
						<h3>Jobs</h3>
						<ul>
							{jobs.map((job: IJob) => {
								return <li key={job.id}>{job.jobTitle}</li>;
							})}
						</ul>
					</div>
				</aside>
			</section>
		</div>
	);
}

export default App;
