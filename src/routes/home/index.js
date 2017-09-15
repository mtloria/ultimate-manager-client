import { h, Component } from 'preact';
import style from './style';

export default class Home extends Component {

	state = {
		response: ''
	};

	registerDummyUser = () => {
		const testEmail = 'aNewTest2@test.com';
		const testPassword = 'testpassword99';
		const testPasswordConfirm = 'testpassword99';
		let registrationPackage = {
			config_name: 'default',
			email: testEmail,
			password: testPassword,
			password_confirmation: testPasswordConfirm,
			confirm_success_url: 'http://localhost:3000',
		};


		fetch('http://localhost:3000/auth', {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(registrationPackage)});
	}

	render() {
		return (
			<div class={style.home}>
				<h1>Home</h1>
				<p>This is the Home component.</p>
				<button onClick={ this.registerDummyUser }>Register dummy user</button>
			</div>
		);
	}
}
