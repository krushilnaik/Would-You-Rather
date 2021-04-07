import React, { useState } from 'react';
import './scss/NewQuestion.scss';

import { addQuestion } from '../app/store';

function NewQuestion() {
	const [optionOne, setOptionOne] = useState('');
	const [optionTwo, setOptionTwo] = useState('');

	/**
	 * @param {React.MouseEvent<HTMLButtonElement>} event
	 */
	const handleFormSubmit = event => {
		event.preventDefault();

		// add question to redux store
		addQuestion(optionOne, optionTwo);
	};

	return (
		<div className='new-question card'>
			<h3 className='card-header bg-white'>Create New Question</h3>

			<form>
				<h6>Complete the question:</h6>
				<h5>Would you rather...</h5>

				<input
					type='text'
					className='form-control'
					value={optionOne}
					onChange={event => {
						setOptionOne(event.currentTarget.value);
					}}
					placeholder='Enter Option One Text Here:'
				/>

				<div className='divider'>
					<hr />
					<span className='or'>OR</span>
					<hr />
				</div>

				<input
					type='text'
					className='form-control'
					value={optionTwo}
					onChange={event => {
						setOptionTwo(event.currentTarget.value);
					}}
					placeholder='Enter Option Two Text Here:'
				/>

				<button onClick={handleFormSubmit} className='form-control' type='submit'>
					Submit
				</button>
			</form>
		</div>
	);
}

export default NewQuestion;
