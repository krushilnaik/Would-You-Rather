class Question {
	/**
	 * @param {number} id 
	 * @param {string} optionOne 
	 * @param {string} optionTwo 
	 */
	constructor(id, optionOne, optionTwo) {
		this.id = id;
		this.optionOne = optionOne;
		this.optionTwo = optionTwo;

		this.choseOne = 0;
		this.choseTwo = 0;
	}

	answerOne() { this.choseOne++; }
	answerTwo() { this.choseTwo++; }
}

export default Question;
