import React from 'react';
import './scss/NewQuestion.scss';

function NewQuestion() {
	return (
		<div className="new-question card">
			<h2 className="card-header bg-white">Create New Question</h2>

			<form>
				<h6>Complete the question:</h6>
				<h4>Would you rather...</h4>

				<input className='form-control' type="text" name="option_one" id="option_one" placeholder='Enter Option One Text Here:' />
				<div className="divider">
					<hr />
					<span className='or'>OR</span>
					<hr />
				</div>
				<input className='form-control'  type="text" name="option_two" id="option_two" placeholder='Enter Option Two Text Here:' />
				<button className='form-control' type="submit">Submit</button>
			</form>
		</div>
	);
}

export default NewQuestion;
