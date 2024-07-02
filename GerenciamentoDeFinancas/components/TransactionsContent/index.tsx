import { Objective } from "@/interfaces/objective";
import { Text, View } from "react-native";
import ObjectiveCard from "../ObjectiveCard";
import { Transaction } from "@/interfaces/transaction";
import { styles } from "./styles";

export default function TransactionsContent({
	objectives,
	transactions,
}: {
	objectives: Objective[];
	transactions: Transaction[];
}) {
	const calculateBalance = (transactions: Transaction[]) => {
		const availableBalance = transactions
			.filter((t) => t.type === "Receita")
			.reduce((sum, t) => sum + t.amount, 0);

		const totalExpenses = transactions
			.filter((t) => t.type === "Despesa")
			.reduce((sum, t) => sum + t.amount, 0);

		return availableBalance - totalExpenses;
	};

	let balance = calculateBalance(transactions);

	const finished = [];
	const remaining = [];

	for (let obj of objectives) {
        if (balance >= obj.total) {
            finished.push(obj);
            balance -= obj.total;
        } else {
            remaining.push(obj);
        }
    }

	return (
		<View>
			<Text style={styles.secondaryTitle}>Ativos</Text>
			<View style={styles.objectives}>
				{remaining.length > 0 ? remaining.map((objective: Objective) => (
					<ObjectiveCard
						key={objective.id}
						objectiveData={objective}
						availableBalance={balance}
						finished={false}
					/>
				)) : <Text>Não há objetivos ativos</Text> }
			</View>
			
			<Text style={styles.secondaryTitle}>Concluídos</Text>
			<View style={styles.objectives}>
				{finished.length > 0 ? finished.map((objective: Objective) => {
					console.log(objective)
					
					return (
						<ObjectiveCard
							key={objective.id}
							objectiveData={objective}
							availableBalance={balance}
							finished
						/>
					)
				}) : <Text>Não há objetivos concluídos</Text> }
			</View>
		</View>
	);
}
