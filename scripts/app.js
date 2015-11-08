import ReactDOM from 'react-dom';
import React from 'react';
import Questions from './questions.js';
import _ from 'lodash'
import data from './data.js'
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
})
var EulerBody = React.createClass({
	render(){
		return (
			<tbody>
				{this.state.questions.map(x => {
					var answer = x.answer;
					var time = x.time === undefined ? "" : x.time
					return (
						<tr key={x.key}>
							<td>{x.key}</td>
							<td>{answer || ""}</td>
							<td>{time}</td>
							<td>
								<button onClick={() => this.populateAnswer(x)}>
									{answer ? "Rerun" : "Run"}
								</button>
							</td>
						</tr>
					)
				})}
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td><button onClick={() => this.state.questions.forEach(this.populateAnswer)}>Run all</button></td>
				</tr>
			</tbody>
		)
	},
	getInitialState(){
		return {
			questions: this.props.questions
		}
	},
	populateAnswer(x){
		var key = x.key;
		var questions = this.state.questions;
		var question = questions.find(y => y.key === key);
		var timeStart = new Date().getTime();
		var answer = x.run(data[x.key]);
		var timeEnd = new Date().getTime();
		var difference = timeEnd - timeStart;
		question.time = difference;
		question.answer = answer;
		this.setState({
			questions: questions
		});
	},
})
var EulerTable = React.createClass({
	render(){
		return (
			<table>
				<EulerHeader headers={["Number","Answer", "Time taken", ""]}/>
				<EulerBody questions={Questions}/>
			</table>
		);
	}
});

ReactDOM.render(
	React.createElement(EulerTable, {}),
	document.getElementById('main-body'));
