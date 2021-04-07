class User {
	/**
	 * @param {string} name - user's name
	 * @param {string} avatar - locationi of user's avatar
	 */
	constructor(name, avatar = 'assets/images/react-redux.jpeg') {
		this.name = name;
		this.avatar = avatar;

		/**
		 * @type { {questionID: number, answer: number}[] }
		 */
		this.questionsAnswered = [];

		/**
		 * @type {number[]}
		 */
		this.questionsAsked = [];
	}

	/**
	 * @param {number} questionID - id of the question the user answered
	 * @param {number} answer - user choice
	 */
	answerQuestion(questionID, answer) {
		this.questionsAnswered.push({ questionID, answer });
	}
}

export default User;
