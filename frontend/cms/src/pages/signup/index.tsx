import { useRef } from "react";
import styles from "./signup.module.css";
const Signup = () => {
    const username = useRef("");
    const password = useRef("");
	const repassword = useRef("");
    const email = useRef("");
    const name = useRef("");

	function comparePassword() {
		if (password.current === '' || repassword.current === '') {
			return;
		}

		if (password.current !== repassword.current) {
			console.log("Passwords do not match");
		}
	}
    function submit(e: any) {
        e.preventDefault();

        fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username.current,
                password: password.current,
                email: email.current,
                name: name.current
            }),
        }).then((res) => res.json())
            .then((data) => {
				console.log(data);
            });
	}
	// TODO: add small error message
	return (
	<div className={styles.container_signup}>
		<div className={styles.bg_col} >
			
		</div>
		<div className={styles.form_col}>
			<form onSubmit={(e) => submit(e)}>
				<h1 style={{marginTop: "50px", marginBottom: "50px", fontSize: "46px"}}>Sign Up</h1>
				<div>
					<label className={styles.form_label}>Full Name</label>
					<input type="text" className={styles.form_input} placeholder="Full Name" onChange={(e) => name.current = e.target.value}/>
					<div className={styles.focus_line}></div>
				</div>
				<div>
					<label className={styles.form_label}>Email</label>
					<input type="email" className={styles.form_input} placeholder="Email" onChange={(e) => email.current = e.target.value}/>
					<div className={styles.focus_line}></div>
				</div>
				<div>
					<label className={styles.form_label}>Username</label>
					<input type="text" className={styles.form_input} placeholder="Username" onChange={(e) => username.current = e.target.value}/>
					<div className={styles.focus_line}></div>
				</div>
				<div>
					<label className={styles.form_label}>Password</label>
					<input type="password" className={styles.form_input} onBlur={comparePassword} placeholder="**********" onChange={(e) => password.current = e.target.value}/>
					<div className={styles.focus_line}></div>
				</div>
				<div>
					<label className={styles.form_label}>Repeat Password</label>
					<input type="password" className={styles.form_input} onBlur={comparePassword} placeholder="**********" onChange={(e) => repassword.current = e.target.value}/>
					<div className={styles.focus_line}></div>
				</div>
				<div>
					<input className={styles.form_button} type="submit" value="Sign Up"/>
					<a href="/login">Sign in  →</a>
				</div>
			</form>
		</div>
	</div>
	)
}

export default Signup;