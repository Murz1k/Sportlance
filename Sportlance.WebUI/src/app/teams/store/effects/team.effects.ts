import {ITeamState} from "../states/team.state";
import {Injectable} from "@angular/core";
import {TeamsService} from "../../teams.service";
import {Store, select} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {map, switchMap, withLatestFrom} from "rxjs/operators";
import {ETeamActions, GetTeam, GetTeamSuccess} from "../actions/team.actions";
import {selectTeamList} from "../selectors/team.selectors";
import {GetTeamQuery} from "../../../shared/teams/requests/get-team-query";
import {of} from "rxjs";

@Injectable()
export class TeamEffects {

  constructor(
    private _teamsService: TeamsService,
    private _actions$: Actions,
    private _store: Store<ITeamState>
  )

  @Effect()
  getTeam$ = this._actions$.pipe(
    ofType<GetTeam>(ETeamActions.GetTeam),
    map(action => action.payload),
    withLatestFrom(this._store.pipe(select(selectTeamList))),
    switchMap(([id, teams]) => {
      const selectedTeam = teams.filter(team => team.id === +id)[0];
      return of(new GetTeamSuccess(selectedTeam));
    })
  );

  @Effect()
  getTeams$ = this._actions$.pipe(
    ofType<GetTeam>(ETeamActions.GetTeam),
    switchMap((query: GetTeamQuery) => this._teamsService.get(query))
  );
}
