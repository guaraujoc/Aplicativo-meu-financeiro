import { User } from "@/interfaces/user";
import { createContext, useContext, useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import * as SecureStore from "expo-secure-store";
import { USERS } from "@/api";
import { router } from "expo-router";

interface AuthContextData {
	token: string | null;
	saveToken: (tokenValue: string) => void;
	user: User | null;
	saveUser: (user: User) => void;
	logout: () => void;
}

const GlobalContext = createContext<AuthContextData | null>(null);

export const GlobalContextProvider = ({ children }: PropsWithChildren) => {
	const [token, setToken] = useState<string | null>(null);
	const [user, setUser] = useState<User | null>(null);

	const loadToken = async () => {
		try {
			return await SecureStore.getItemAsync("token");
		} catch (e) {
			return null;
		}
	};

	const saveToken = async (tokenValue: string) => {
		setToken(tokenValue);

		try {
			await SecureStore.setItemAsync("token", tokenValue);
		} catch (e) {
			return;
		}
	};

	const deleteToken = async () => {
		setToken(null);

		try {
			await SecureStore.deleteItemAsync("token");
		} catch (e) {
			return;
		}
	};

	const getUserData = async (token: string) => {
		const res = await fetch(USERS, {
			method: "GET",
			headers: {
				authorization: `Bearer ${token}`,
			},
		});
		if (!res.ok) {
			return;
		}

		const userData = await res.json();
		if (!userData) {
			return;
		}

		setToken(token);
		setUser(userData);

		return router.navigate("/home");
	};

	const saveUser = async (user: User) => {
		setUser(user);
	};

	const autoLogin = async () => {
		const token = await loadToken();
		if (!token) {
			return;
		}

		return await getUserData(token);
	};

	const logout = async () => {
		await deleteToken();

		setUser(null);
		setToken(null);

		return router.navigate("/sign-in");
	};

	useEffect(() => {
		autoLogin();
	}, []);

	return (
		<GlobalContext.Provider
			value={{ token, saveToken, user, saveUser, logout }}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export const useGlobalContext = (): AuthContextData => {
	const context = useContext(GlobalContext);
	if (!context) {
		throw new Error("useAuth deve ser usado dentro de um AuthProvider");
	}

	return context;
};
