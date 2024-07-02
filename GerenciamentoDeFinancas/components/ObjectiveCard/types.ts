import { Objective } from "@/interfaces/objective";

export type ObjectiveCardProps = {
	objectiveData: Objective;
	availableBalance: number;
	finished: boolean;
};
