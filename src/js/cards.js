var AssignmentsGrid = React.createClass({
	mixins: [ReactFireMixin],
	getInitialState: function() {
    	return {
    		'assignments': [],
    		'addNewCard': false
    	};
  	},
	componentWillMount: function () {
		var ref = new Firebase("https://suaveaccident.firebaseio.com/assignments");
  		this.bindAsArray(ref, "assignments");
	},
  	render: function() {
  		var assignmentArr = [];
  		this.state.assignments.forEach(function (assignment) {
  			assignmentArr.push(<div className="col w25"><Card link={assignment.url} title={assignment.title} description={assignment.description} /></div>);
  			console.log(assignment.title, assignment.url);
  		});
  		if (this.state.addNewCard === true) {
  			assignmentArr.push(<NewCard/>);
  		}
  		return (
  			<div className="grid">
				{assignmentArr}
		  	</div>
		);
	}
}),
Card = React.createClass({
  	render: function() {
		return (
		  	<a href={this.props.link}>
				<div className="card">
					<h1 className="card-title">{this.props.title}</h1>
					<p className="card-info">{this.props.description}</p>
		  		</div>
		  	</a>
		);
	}
}),
NewCard = React.createClass({
	mixins: [ReactFireMixin],
	getInitialState: function() {
    	return {
    		'assignments': [],
    		'assignmentTitle': '',
    		'url': '',
    		'description':''
    	};
  	},
	componentWillMount: function () {
		var ref = new Firebase("https://suaveaccident.firebaseio.com/assignments");
  		this.bindAsArray(ref, "assignments");
	},
	handleChange: function(event) {
		if (event.target.id === "assignmentTitle"){
    		this.setState({assignmentTitle: event.target.value});
		} else if (event.target.id === "urlInput") {
    		this.setState({url: event.target.value});
		} else if (event.target.id === "descriptionInput") {
    		this.setState({description: event.target.value});
		}
  	},
	handleSubmit: function(e) {
		e.preventDefault();
		this.firebaseRefs.assignments.push({
			title: this.state.assignmentTitle,
			url: this.state.url,
			description: this.state.description
		});
		this.setState({ assignmentTitle: "", url: "", description: "" });
	},
  	render: function() {
  		return (
  			<div className="col w25">
  				<div className="card">
				<form action="" onSubmit={this.handleSubmit}>
					<label for="assignmentInput">Assignment</label>
					<input id="assignmentTitle" type="text" value={this.state.assignmentTitle} onChange={this.handleChange} />
					<label for="urlInput">URL</label>
					<input id="urlInput" type="text" value={this.state.url} onChange={this.handleChange} />
					<label for="descriptionInput">Description</label>
					<textarea id="descriptionInput" type="textarea" value={this.state.description} onChange={this.handleChange} />
					<input type="submit" value="Submit" />
			  	</form>
			  	</div>
		  	</div>
		);
	}
});
React.render(
  	<AssignmentsGrid />,
  	document.getElementById('assignment-cards')
);