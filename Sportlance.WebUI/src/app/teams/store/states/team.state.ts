import {TeamResponse} from "../../../shared/teams/requests/team-response";

export interface ITeamState {
  teams: TeamResponse[];
  selectedTeam: TeamResponse;
}

export const initialTeamState: ITeamState = {
  teams = null,
  selectedTeam = null
};

export function getInitialState(): ITeamState {
  return initialTeamState;
}
