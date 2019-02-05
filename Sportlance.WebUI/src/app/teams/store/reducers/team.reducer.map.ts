import {ITeamState} from "../states/team.state";
import {teamReducers} from "./team.reducers";

export const teamReducersMap: ActionReducerMap<ITeamState, any> = {
  teams: teamReducers
};
