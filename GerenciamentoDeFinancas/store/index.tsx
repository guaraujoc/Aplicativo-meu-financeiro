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
	logout: () => void;
}

const GlobalContext = createContext<AuthContextData | null>(null);

export const GlobalContextProvider = ({ children }: PropsWithChildren) => {
	const [token, setToken] = useState<string | null>(null);
	const [user, setUser] = useState<User | null>(null);

	const loadToken = async () => {
		return await SecureStore.getItemAsync("token");
	};

	const saveToken = async (tokenValue: string) => {
		setToken(tokenValue);
		return await SecureStore.setItemAsync("token", tokenValue);
	};

	const deleteToken = async () => {
		setToken(null);
		return await SecureStore.deleteItemAsync("token");
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

	const saveUser = async (userData: User) => {
		setUser(userData);
	};

	useEffect(() => {
		autoLogin();
	}, []);

	return (
		<GlobalContext.Provider value={{ token, user, saveToken, logout }}>
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
