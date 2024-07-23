import styles from "./error.module.css"
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
	const error = useRouteError();
	console.error(error);
	let errorMessage : string;

	if (isRouteErrorResponse(error)) {
		errorMessage = `${error.status} ${error.statusText}`;
	} else if (error instanceof Error) {
		errorMessage = error.message;
	} else if (typeof error === 'string') {
		errorMessage = error;
	} else {
		errorMessage = 'Unknown error';
		console.log(error);
	}

	return (
		<div className={styles.bodyClass}>
			<div id={styles.error_page}>
				<h1 className={styles.oops}>Oops!</h1>
				<p className={styles.notif}>Sorry, an unexpected error has occurred.</p>
				<p>
					<i>{errorMessage}</i>	
				</p>
			</div>
		</div>
	);
}