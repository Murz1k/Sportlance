import {initialTeamState, ITeamState} from "../states/team.state";
import {ETeamActions, TeamActions} from "../actions/team.actions";

export const teamReducers = (
  state = initialTeamState,
  action: TeamActions
): ITeamState => {
  switch (action.type) {
    case ETeamActions.GetTeamsSuccess: {
      return {
        ...state,
        teams: action.payload
      };
    }
    case ETeamActions.GetTeamSuccess: {
      return {
        ...state,
        selectedTeam: action.payload
      };
    }

    default:
      return state;
  }
};
