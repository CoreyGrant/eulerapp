import ReactDOM from 'react-dom';
import React from 'react';
import Questions from './questions.js';
import _ from 'lodash'
import data from './data.js'

var EulerTable = React.createClass({
	getInitialState(){
		return {
			answers : {},
			times: {}
		}
	},
	populateAnswer(x){
		setTimeout(() => {
			var answers = this.state.answers;
			if(answers[x.key]){
				return;
			}
			var times = this.state.times;
			var timeStart = new Date().getTime();
			var answer = x.answer(data[x.key]);
			var timeEnd = new Date().getTime();
			answers[x.key] = answer;
			var difference = timeEnd - timeStart;
			times[x.key] = difference;
			this.setState({
				answers: answers,
				times: times
			});
		}, 0);
	},
	render(){
		return (
			<table>
				<thead>
					<tr>
						{this.props.headers.map(x => <th key={x}>{x}</th>)}
					</tr>
				</thead>
				<tbody>
					{this.props.questions.map(x => {
						return (
							<tr key={x.key}>
								<td>{x.key}</td>
								<td>{this.state.answers[x.key] || ""}</td>
								<td>{this.state.times[x.key] === undefined 
										? "" 
										: this.state.times[x.key]}</td>
								<td><button onClick={() => this.populateAnswer(x)}>Run</button></td>
							</tr>
						)
					})}
					<tr>
						<td></td>
						<td></td>
						<td></td>
						<td><button onClick={() => this.props.questions.forEach(x => this.populateAnswer(x))}>Run all</button></td>
					</tr>
				</tbody>
			</table>
		);
	}
});

ReactDOM.render(
	React.createElement(EulerTable, {
		headers: ["Number","Answer", "Time taken", ""],
		questions: Questions
	}),
	document.getElementById('main-body'));
