import { h, Component } from 'preact';
import style from './style';

export default class AdminRegistration extends Component {

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
			<div id="registerTab">
				<div>
					<h1 class={style.tabHeaderText}>Register your team manager account</h1>
				</div>
				<form id="adminRegisterForm" onSubmit={this.registerAdmin}>
					<div class={style.topRow}>
						<div class={style.fieldWrap}>
							<label>Name</label>
							<input type="text" required autocomplete="off" name="name" />
						</div>
						<div class={style.fieldWrap}>
							<label>Team Name</label>
							<input type="text" required autocomplete="off" name="team_name" />
						</div>
					</div>
					<div class={style.fieldWrap}>
						<label>Email Address</label>
						<input type="email" required autocomplete="off" name="email" />
					</div>
					<div class={style.fieldWrap}>
						<label>Password</label>
						<input type="password" required autocomplete="off" name="password" />
					</div>
					<div class={style.fieldWrap}>
						<label>Confirm Password</label>
						<input type="password" required autocomplete="off" name="password_confirmation" />
					</div>
					<button type="submit" class={[style.button, style.buttonBlock].join(' ')}>Get Started</button>
				</form>
			</div>
		);
	}
}
