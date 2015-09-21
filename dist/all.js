'use strict';

var AssignmentsGrid = React.createClass({
	displayName: 'AssignmentsGrid',

	mixins: [ReactFireMixin],
	getInitialState: function getInitialState() {
		return {
			'assignments': [],
			'addNewCard': false
		};
	},
	componentWillMount: function componentWillMount() {
		var ref = new Firebase("https://suaveaccident.firebaseio.com/assignments");
		this.bindAsArray(ref, "assignments");
	},
	render: function render() {
		var assignmentArr = [];
		this.state.assignments.forEach(function (assignment) {
			assignmentArr.push(React.createElement(
				'div',
				{ className: 'col w25' },
				React.createElement(Card, { link: assignment.url, title: assignment.title, description: assignment.description })
			));
			console.log(assignment.title, assignment.url);
		});
		if (this.state.addNewCard === true) {
			assignmentArr.push(React.createElement(NewCard, null));
		}
		return React.createElement(
			'div',
			{ className: 'grid' },
			assignmentArr
		);
	}
}),
    Card = React.createClass({
	displayName: 'Card',

	render: function render() {
		return React.createElement(
			'a',
			{ href: this.props.link },
			React.createElement(
				'div',
				{ className: 'card' },
				React.createElement(
					'h1',
					{ className: 'card-title' },
					this.props.title
				),
				React.createElement(
					'p',
					{ className: 'card-info' },
					this.props.description
				)
			)
		);
	}
}),
    NewCard = React.createClass({
	displayName: 'NewCard',

	mixins: [ReactFireMixin],
	getInitialState: function getInitialState() {
		return {
			'assignments': [],
			'assignmentTitle': '',
			'url': '',
			'description': ''
		};
	},
	componentWillMount: function componentWillMount() {
		var ref = new Firebase("https://suaveaccident.firebaseio.com/assignments");
		this.bindAsArray(ref, "assignments");
	},
	handleChange: function handleChange(event) {
		if (event.target.id === "assignmentTitle") {
			this.setState({ assignmentTitle: event.target.value });
		} else if (event.target.id === "urlInput") {
			this.setState({ url: event.target.value });
		} else if (event.target.id === "descriptionInput") {
			this.setState({ description: event.target.value });
		}
	},
	handleSubmit: function handleSubmit(e) {
		e.preventDefault();
		this.firebaseRefs.assignments.push({
			title: this.state.assignmentTitle,
			url: this.state.url,
			description: this.state.description
		});
		this.setState({ assignmentTitle: "", url: "", description: "" });
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'col w25' },
			React.createElement(
				'div',
				{ className: 'card' },
				React.createElement(
					'form',
					{ action: '', onSubmit: this.handleSubmit },
					React.createElement(
						'label',
						{ 'for': 'assignmentInput' },
						'Assignment'
					),
					React.createElement('input', { id: 'assignmentTitle', type: 'text', value: this.state.assignmentTitle, onChange: this.handleChange }),
					React.createElement(
						'label',
						{ 'for': 'urlInput' },
						'URL'
					),
					React.createElement('input', { id: 'urlInput', type: 'text', value: this.state.url, onChange: this.handleChange }),
					React.createElement(
						'label',
						{ 'for': 'descriptionInput' },
						'Description'
					),
					React.createElement('textarea', { id: 'descriptionInput', type: 'textarea', value: this.state.description, onChange: this.handleChange }),
					React.createElement('input', { type: 'submit', value: 'Submit' })
				)
			)
		);
	}
});

React.render(React.createElement(AssignmentsGrid, null), document.getElementById('assignment-cards'));
//
// React.render(
//   	<Card cardType={"square"} cardWidth={"w25"} link={"google.com"}/>,
//   	document.getElementById('assignment-cards')
// );
//# sourceMappingURL=all.js.map