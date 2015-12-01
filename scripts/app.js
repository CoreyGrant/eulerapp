import ReactDOM from 'react-dom';
import React from 'react';
import Questions from './questions.js';
import _ from 'lodash';
import data from './data.js';
import $ from 'jquery';

var EulerHeader = React.createClass({
	render(){
		return (
			<thead>
				<tr>
					{this.props.headers.map(x => <th key={x}>{x}</th>)}
				</tr>
			</thead>
		)
	}
});
var EulerProblem = React.createClass({
	render(){
		return (
			<tr>
				<td>{this.props.num}</td>
				<td>{this.state.title}</td>
				<td>{this.state.answer || ""}</td>
				<td>{this.state.time === undefined ? "" : this.state.time}</td>
				<td>
					<button onClick={this.populateAnswer}>
						{this.state.answer ? "Rerun" : "Run"}
					</button>
				</td>
			</tr>
		)
	},
	populateAnswer(){
		var timeStart = new Date().getTime();
		var answer = this.props.run(this.props.data);
		var timeEnd = new Date().getTime();
		var difference = timeEnd - timeStart;
		this.setState({
			answer: answer,
			time: difference
		});
	},
	getInitialState(){
		return {};
	},
	componentDidMount(){
		$.get('api/problem?id=' + this.props.num)
			.success(data => this.setState({
				title: data.title
			}));
	}
});
var EulerBody = React.createClass({
	render(){
		var questions = this.props.questions
			.map(x => <EulerProblem key={x.key} num={x.key} run={x.run} data={data[x.key]}/>);
		return (
			<tbody>
				{questions}
			</tbody>
		)
	}
});
// Should be below questions, comment doesn't work in JSX?
// <tr>
// 	<td></td>
// 	<td></td>
// 	<td></td>
// 	<td></td>
// 	<td><button onClick={() => questions.forEach(x => x.populateAnswer())}>Run all</button></td>
// </tr>
var EulerTable = React.createClass({
	render(){
		return (
			<table>
				<EulerHeader headers={["Question", "Title","Answer", "Time taken", ""]}/>
				<EulerBody questions={Questions}/>
			</table>
		);
	}
});

ReactDOM.render(
	React.createElement(EulerTable, {}),
	document.getElementById('main-body'));
