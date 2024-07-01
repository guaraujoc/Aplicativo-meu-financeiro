import Button from "@/components/Button";
import Header from "@/components/Header";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { styles } from "./styles";
import { OBJECTIVES } from "@/api";
import { useGlobalContext } from "@/store";
import { useQuery } from "@tanstack/react-query";
import ObjectiveCard from "@/components/ObjectiveCard";
import { Objective } from "@/interfaces/objective";

export default function Index() {
	const { token } = useGlobalContext();

	const getObjectivesData = async () => {
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

	const { data, isError, isPending, error, isSuccess } = useQuery({
		queryKey: ["objetives"],
		queryFn: getObjectivesData,
	});

	if (isError) {
		console.log(token);
		console.log(error);
	}

	return (
		<View style={styles.container}>
			<Header title="Objetivos" />

			<View style={styles.content}>
				{isPending && <Text>Carregando...</Text>}

				{isError && <Text>Erro ao carregar objetivos.</Text>}

				{isSuccess && data.length === 0 && <Text>Nenhum objetivo criado.</Text>}

				{isSuccess && data.length > 0 && (
					<View>
						{data.map((objective: Objective) => (
							<ObjectiveCard key={objective.id} objectiveData={objective} />
						))}
					</View>
				)}

				<Button
					text="Novo Objetivo"
					onPress={() => router.navigate(`/objectives/new`)}
					icon=""
				/>
			</View>
		</View>
	);
}
