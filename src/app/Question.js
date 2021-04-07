class Question {
	/**
	 * @param {number} id
	 * @param {string} optionOne
	 * @param {string} optionTwo
	 * @param {string} submitter
	 */
	constructor(id, optionOne, optionTwo, submitter) {
		this.id = id;
		this.optionOne = optionOne;
		this.optionTwo = optionTwo;

		this.submitter = submitter;

		this.choseOne = 0;
		this.choseTwo = 0;
	}

	answerOne() {
		this.choseOne++;
	}
	answerTwo() {
		this.choseTwo++;
	}
}

export default Question;
