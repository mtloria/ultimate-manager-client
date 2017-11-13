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

	componentDidMount = () => {
		const inputs = document.querySelectorAll('form input');
		const events = ['keyup', 'blur', 'focus'];
		const activeClassName = style.active;
		const highlightClassName = style.highlight;

		events.forEach((event) => {
			inputs.forEach((input) => {
				const label = input.previousElementSibling;
				input.addEventListener('keyup', () => {
					if (input.value === '') {
						label.classList.remove(activeClassName, highlightClassName);
					}
					else {
						label.classList.add(activeClassName, highlightClassName);
					}
				});
				input.addEventListener('blur', () => {
					if (input.value === '') {
						label.classList.remove(activeClassName, highlightClassName);
					}
					else {
						label.classList.remove(highlightClassName);
					}
				});
				input.addEventListener('focus', () => {
					if (input.value === '') {
						label.classList.remove(highlightClassName);
					}
					else if (input.value !== '') {
						label.classList.add(highlightClassName);
					}
				});
			});
		});
		
		const tabLinks = document.querySelectorAll('.tab a');
		tabLinks.forEach((tabLink) => {
			tabLink.addEventListener('click', (e) => {
				e.preventDefault();

				const tab = tabLink.parentElement;
				tab.classList.add(activeClassName);
				if (tab.id === 'loginTabLink'){
					tab.previousElementSibling.classList.remove(activeClassName);
					document.getElementById('registerTab').style.display = 'none';
					document.getElementById('loginTab').style.display = 'initial';
				}
				else {
					tab.nextElementSibling.classList.remove(activeClassName);
					document.getElementById('loginTab').style.display = 'none';
					document.getElementById('registerTab').style.display = 'initial';
				}
			});
		});	
	}

	render() {
		return (
			<div class={style.home}>
				<div class={style.registerForm}>
					<ul class={style.tabGroup}>
						<li class={[style.active, 'tab'].join(' ')}><a href="#register">Sign Up</a></li>
						<li class="tab" id="loginTabLink"><a href="#login">Log In</a></li>
					</ul>
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
					<div id="loginTab" style="display: none">
						<div id="login">
							<div>
								<h1 class={style.tabHeaderText}>Welcome Back!</h1>
							</div>
							<form action="/" method="post">
								<div class={style.fieldWrap}>
									<label>Email Address</label>
									<input type="email" required autocomplete="off" />
								</div>
								<div class={style.fieldWrap}>
									<label>Password</label>
									<input type="password" required autocomplete="off" />
								</div>
								<p class={style.forgotPassword}>
									<a href="#" class={style.forgotPasswordLink}>Forgot Password?</a>
								</p>
								<button class={[style.button, style.buttonBlock].join(' ')}>Log In</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
