import Button from "@/components/Button";
import Header from "@/components/Header";
import { router } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { styles } from "./styles";
import { OBJECTIVES, TRANSACTION } from "@/api";
import { useGlobalContext } from "@/store";
import { useQuery } from "@tanstack/react-query";
import TransactionsContent from "@/components/TransactionsContent";

export default function Index() {
	const { token } = useGlobalContext();

	const getObjectivesData = async () => {
		console.log(token, "2");

		const res = await fetch(OBJECTIVES, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (!res.ok) {
			const responseData = await res.json();
			throw new Error(responseData.message ?? "Erro ao carregar objetivos");
		}

		return res.json();
	};

	const { data, isError, isPending, isSuccess } = useQuery({
		queryKey: ["objectives"],
		queryFn: getObjectivesData,
	});

	const getTransactionsData = async () => {
		console.log(token, "1");

		const res = await fetch(TRANSACTION, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (!res.ok) {
			const responseData = await res.json();
			throw new Error(responseData.message ?? "Erro ao carregar objetivos");
		}

		return res.json();
	};

	const {
		data: transactions,
		isSuccess: isTransactionsSuccess,
		isPending: isPendingTransactions,
		isError: isErrorTransactions,
	} = useQuery({
		queryKey: ["transactions"],
		queryFn: getTransactionsData,
	});

	return (
		<ScrollView style={styles.container}>
			<Header title="Objetivos" />

			<View style={styles.content}>
				{(isPending || isPendingTransactions) && <Text>Carregando...</Text>}

				{(isError || isErrorTransactions) && (
					<Text>Erro ao carregar objetivos.</Text>
				)}

				{isSuccess && data.length === 0 && <Text>Nenhum objetivo criado.</Text>}

				{isSuccess && data.length > 0 && (
					<TransactionsContent objectives={data} transactions={transactions} />
				)}
				
				<View style={{ marginTop: 52 }}>
					<Button
						secondary
						text="Novo Objetivo"
						onPress={() => router.navigate(`/objectives/new`)}
						icon=""
					/>
				</View>
			</View>
		</ScrollView>
	);
}
