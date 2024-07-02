import Header from "@/components/Header";
import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { styles } from "./styles";
import Button from "@/components/Button";
import { OBJECTIVES } from "@/api";
import { useGlobalContext } from "@/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function Index() {
	const { token } = useGlobalContext();
	const { id } = useLocalSearchParams();
	const queryClient = useQueryClient();

	const getObjectiveData = async () => {
		const res = await fetch(`${OBJECTIVES}/${id}`, {
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
		queryFn: getObjectiveData,
	});

	const deleteObjective = async () => {
		const res = await fetch(`${OBJECTIVES}/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		if (!res.ok) {
			throw new Error("Erro ao deletar objetivo");
		}

		return;
	};

	const { mutateAsync, isPending: isDeletePending } = useMutation({
		mutationFn: deleteObjective,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["objectives"] });
			return router.navigate("/objectives");
		},
	});

	const onSubmit = async () => {
		await mutateAsync();
	};

	return (
		<View style={styles.container}>
			<Header title="Detalhes" />

			<View style={styles.content}>
				{isPending && <Text>Carregando...</Text>}

				{isError && <Text>Erro ao carregar objetivo.</Text>}

				{isSuccess && (
					<>
						<View>
							<Text style={styles.objectiveTitle}>{data.title}</Text>

							<Text style={styles.objectiveLine}>Total: <Text  style={styles.objectiveStrong}>{data.total}</Text></Text>
							<Text style={styles.objectiveLine}>Falta: <Text  style={styles.objectiveStrong}>R$ 310.00</Text></Text>
							<Text style={styles.objectiveLine}>Adicionado em <Text style={styles.objectiveStrong}>29/06/2024</Text></Text>
							<Text style={styles.objectiveLine}>Criado por <Text style={styles.objectiveStrong}>User 12</Text></Text>
							<Text style={styles.objectiveLine}>Status: <Text style={styles.objectiveStrong}>ATIVO</Text></Text>
						</View>

						<View style={styles.controls}>
							<Button
								secondary
								text="Editar"
								onPress={() => router.navigate(`/objectives/${id}/edit`)}
								disabled={isDeletePending}
							/>

							<Button red text="Excluir" onPress={onSubmit} />
						</View>
					</>
				)}
			</View>
		</View>
	);
}
