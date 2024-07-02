import { Objective } from "@/interfaces/objective";
import { View } from "react-native";
import ObjectiveCard from "../ObjectiveCard";
import { Transaction } from "@/interfaces/transaction";

export default function TransactionsContent({
	objectives,
	transactions,
}: {
	objectives: Objective[];
	transactions: Transaction[];
}) {
	const calculateSummary = (transactions: Transaction[]) => {
		const availableBalance = transactions
			.filter((t) => t.type === "Receita")
			.reduce((sum, t) => sum + t.amount, 0);

		const totalExpenses = transactions
			.filter((t) => t.type === "Despesa")
			.reduce((sum, t) => sum + t.amount, 0);

		const nextMonthDebt = transactions
			.filter((t) => t.isInstallment)
			.reduce((sum, t) => {
				if (t.installmentCount) {
					return sum + t.amount / t.installmentCount;
				} else {
					return sum + t.amount;
				}
			}, 0);

		return {
			availableBalance,
			totalExpenses,
			nextMonthDebt,
		};
	};

	return (
		<View>
			{objectives.map((objective: Objective) => (
				<ObjectiveCard
					key={objective.id}
					objectiveData={objective}
					availableBalance={10}
				/>
			))}
		</View>
	);
}
