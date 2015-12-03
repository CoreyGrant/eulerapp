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
const tick = "\u2714";
const cross = "\u2716";
var EulerProblem = React.createClass({
	render(){
		var correct = "";
		if(this.state.correct !== undefined){
			correct = this.state.correct
				? tick
				: cross;
		}
		return (
			<tr>
				<td>{this.props.num}</td>
				<td>
					<a href={"https://projecteuler.net/problem=" + this.props.num}>
						{this.state.title}
					</a>
				</td>
				<td>{this.state.answer}</td>
				<td>{correct}</td>
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
		$.get('api/check', {
			id: this.props.num,
			answer: answer
		}).success(data => this.setState({
			correct: data
		}));
	},
	getInitialState(){
		return {};
	},
	componentDidMount(){
		$.get('api/problem', {
			id: this.props.num
		}).success(data => this.setState({
			title: data.title
		}));
	}
});
var EulerBody = React.createClass({
	componentWillMount(){
		this.refs = {};
	},
	render(){
		var questions = this.props.questions
			.map(x => <EulerProblem ref={ref => this.refs[x.key] = ref} key={x.key} num={x.key} run={x.run} data={data[x.key]}/>);
		return (
			<tbody>
				{questions}
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td><button onClick={this.populateAll}>Run all</button></td>
				</tr>
			</tbody>
		)
	},
	populateAll(){
		Object.keys(this.refs).forEach(x => this.refs[x].populateAnswer());
	}
});
var EulerTable = React.createClass({
	render(){
		return (
			<table>
				<EulerHeader headers={["Question", "Title", "Answer", "Correct?", "Time taken", ""]}/>
				<EulerBody questions={Questions}/>
			</table>
		);
	}
});

ReactDOM.render(
	React.createElement(EulerTable, {}),
	document.getElementById('main-body'));
