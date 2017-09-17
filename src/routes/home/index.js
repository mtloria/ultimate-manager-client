import { h, Component } from 'preact';
import style from './style';

export default class Home extends Component {
	
	registerUser = () => {
		let registrationPackage = {
			email: this.state.email,
			password: this.state.password,
			password_confirmation: this.state.passwordConfirm,
			name: this.state.name,
			team_name: this.state.teamName,
			confirm_success_url: 'http://localhost:8080'
		};

		fetch('http://localhost:3000/auth', {
		  method: 'POST',
		  headers: {
		    Accept: 'application/json',
		    'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(registrationPackage) });
	}

	setName = (e) => {
		this.setState( { name: e.target.value } );
	}

	setTeamName = (e) => {
		this.setState( { teamName: e.target.value } );
	}

	setEmail = (e) => {
		// TODO move into component that checks for valid email format
		this.setState( { email: e.target.value } );
	}

	setPassword = (e) => {
		// TODO move into component that checks for valid password requirements
		this.setState( { password: e.target.value } );
	}

	setPasswordConfirm = (e) => {
		// TODO move into component from the above 'TODO'. Also, check that passwords match
		this.setState( { passwordConfirm: e.target.value } );
	}

	constructor(){
		super();
		this.state = {
			name: '',
			teamName: '',
			email: '',
			password: '',
			passwordConfirm: ''
		};
	}

	render() {
		return (
			<div class={style.home}>
				<h1>Register a new User</h1>
				<input type="text" placeholder="Name" onBlur={this.setName} />
				<input type="text" placeholder="Team Name" onBlur={this.setTeamName} />
				<input type="text" placeholder="Email" onBlur={this.setEmail}>Email</input>
				<input type="text" placeholder="Password" onBlur={this.setPassword}>Password</input>
				<input type="text" placeholder="Confirm Password" onBlur={this.setPasswordConfirm}>Confirm Password</input>
				<button onClick={this.registerUser}>Register</button>
			</div>
		);
	}
}
