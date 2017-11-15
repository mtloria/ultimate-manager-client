import { h } from 'preact';
import style from './style';

const AdminLogin = () => {
	return (
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
	);
};

export default AdminLogin;