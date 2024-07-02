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
				{remaining.map((objective: Objective) => (
					<ObjectiveCard
						key={objective.id}
						objectiveData={objective}
						availableBalance={10}
					/>
				))}
			</View>
			
			<Text style={styles.secondaryTitle}>Concluídos</Text>
			{finished.map((objective: Objective) => (
				<ObjectiveCard
					key={objective.id}
					objectiveData={objective}
					availableBalance={10}
				/>
			))}
		</View>
	);
}
