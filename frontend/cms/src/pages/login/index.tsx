import { useRef } from "react";
import styles from './login.module.css';
const backend_url = process.env.REACT_APP_BACKEND_URL || "http://localhost:3654";
//subject to change layout
export default function Login() {
	const username = useRef("");
	const password = useRef("");

	function submit(e: any) {
		e.preventDefault();
		fetch(backend_url + "/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: username.current,
				password: password.current,
			}),
		}).then((res: { json: () => any; }) => res.json())
		.then((data: any) => {
			console.log(data);
		})
	}

	return (
		<div className={styles.bodyClass}> 
			<form className={styles.login} onSubmit={submit}>
				<input type="text" placeholder="Username"/>
				<input type="password" placeholder="Password"/>
				<button>Login</button>
			</form>
		</div>
	)
}