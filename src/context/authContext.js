import { createContext, useState, useEffect } from "react";
import netlifyIdentity from "netlify-identity-widget";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [authReady, setAuthReady] = useState(false);

	useEffect(() => {
		netlifyIdentity.on("login", (user) => {
			// console.log("user", user);
			setUser(user);
			setAuthReady(true);
			netlifyIdentity.close(); // close modal
			// console.log("login event");
		});

		netlifyIdentity.on("logout", () => {
			setUser(null);
			setAuthReady(false);
			// console.log("logout event");
		});

		netlifyIdentity.on("init", (user) => {
			setUser(user);
			// setAuthReady(true);
		});

		// initial netlify identity connection   ///
		netlifyIdentity.init();

		return () => {
			netlifyIdentity.off("login");
		};
	}, []);

	const login = () => {
		netlifyIdentity.open();
	};

	const logout = () => {
		netlifyIdentity.logout();
	};

	const context = { user, login, logout, authReady };

	return (
		<AuthContext.Provider value={context}>{children}</AuthContext.Provider>
	);
};

export default AuthContext;
