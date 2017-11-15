import { h, Component } from 'preact';
import { AdminRegistration, AdminLogin } from '../../components';
import style from './style';

export default class Home extends Component {

	addEventListenersToForm = (activeClassName, highlightClassName) => {
		const inputs = document.querySelectorAll('form input');
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
	}

	initializeFormTabs = (activeClassName) => {
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

	componentDidMount = () => {
		const activeClassName = style.active;
		const highlightClassName = style.highlight;
		this.addEventListenersToForm(activeClassName, highlightClassName);
		this.initializeFormTabs(activeClassName);
	}

	render() {
		return (
			<div class={style.home}>
				<div class={style.registerForm}>
					<ul class={style.tabGroup}>
						<li class={[style.active, 'tab'].join(' ')}><a href="#register">Sign Up</a></li>
						<li class="tab" id="loginTabLink"><a href="#login">Log In</a></li>
					</ul>
					<AdminRegistration />
					<AdminLogin />
				</div>
			</div>
		);
	}
}
