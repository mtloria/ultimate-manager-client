import { h, Component } from 'preact';
import style from './style';

export default class Home extends Component {
	
	registerDummyUser = () => {
		const testEmail = 'test1@yahoo.com';
		const testPassword = 'testpassword99';
		const testPasswordConfirm = 'testpassword99';
		let registrationPackage = {
			config_name: 'default',
			email: testEmail,
			password: testPassword,
			password_confirmation: testPasswordConfirm,
			confirm_success_url: 'http://localhost:8080'
		};

		fetch('http://localhost:3000/auth', {
		  method: 'POST',
		  headers: {
		    Accept: 'application/json',
		    'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(registrationPackage) })
			.then( (resp) => resp.json())
			.then( (data) => this.setState( { response: data.errors.full_messages[0] } ));
	}

	constructor(){
		super();
		this.state = {
			response: ''
		};
	}

	render() {
		return (
			<div class={style.home}>
				<h1>Register a new User</h1>
				<button onClick={this.registerDummyUser}>Register dummy user</button>
				<div>Response: {this.state.response}</div>
			</div>
		);
	}
}
