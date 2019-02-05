import {Action} from "@ngrx/store";
import {TeamResponse} from "../../../shared/teams/requests/team-response";

export enum ETeamActions {
  GetTeams = '[Team] Get Teams',
  GetTeamsSuccess = '[Team] Get Teams Success',
  GetTeam = '[Team] Get Team',
  GetTeamSuccess = '[Team] Get Team Success'
}

export class GetTeams implements Action {
  public readonly type = ETeamActions.GetTeams;
}

export class GetTeamsSuccess implements Action {
  public readonly type = ETeamActions.GetTeamsSuccess;
  constructor(public payload: TeamResponse[]){}
}

export class GetTeam implements Action {
  public readonly type = ETeamActions.GetTeam;
  constructor(public payload: number){}
}

export class GetTeamSuccess implements Action {
  public readonly type = ETeamActions.GetTeamSuccess;
  constructor(public payload: TeamResponse){}
}

export type TeamActions = GetTeams | GetTeamsSuccess | GetTeam | GetTeamSuccess;
