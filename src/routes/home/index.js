import { h, Component } from 'preact';
import style from './style';

export default class Home extends Component {

	registerAdmin = (e) => {
		e.preventDefault();
		const adminForm = document.getElementById('adminRegisterForm');
		const formData = this.formToJSON(adminForm.elements);
		formData['confirm_success_url'] = 'http://localhost:8080';
		const jsonFormData = JSON.stringify(formData);

		fetch('http://localhost:3000/admin_auth', {
		  method: 'POST',
		  headers: {
		    Accept: 'application/json',
		    'Content-Type': 'application/json'
		  },
		  body: jsonFormData });
	}

	formToJSON = (elements) => [].reduce.call(elements, (data, element) => {
		if (this.isValidElement(element)) {
			data[element.name] = element.value;
		}
		return data;	  
	}, {});

	isValidElement = (element) => (element.name && element.value);

	render() {
		return (
			<div class={style.home}>
				<h1>Register your team manager account</h1>
				<form id="adminRegisterForm" onSubmit={this.registerAdmin}>
					<input type="text" placeholder="Name" name="name" /><br />
					<input type="text" placeholder="Team Name" name="team_name" /><br />
					<input type="text" placeholder="Email" name="email" /><br />
					<input type="password" placeholder="Password" name="password" /><br />
					<input type="password" placeholder="Confirm Password" name="password_confirmation" /><br />
					<input type="submit" value="Submit" />
				</form>
			</div>
		);
	}
}
