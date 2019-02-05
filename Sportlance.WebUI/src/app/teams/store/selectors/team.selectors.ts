import {ITeamState} from "../states/team.state";

const selectTeams = (state: ITeamState) => state.selectedTeams;

export const selectTeamList = createSelector(
  selectTeams,
  (state: ITeamState) => state.selectedTeam
);
