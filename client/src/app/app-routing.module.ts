import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { MatchesComponent } from './matches/matches.component';
import { MessagesComponent } from './messages/messages.component';

const routes: Routes =
  [{ component: HomeComponent, path: '' },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { component: MessagesComponent, path: 'messages', canActivate: [AuthGuard] },
      { component: ListComponent, path: 'list', canActivate: [AuthGuard] },
      { component: MatchesComponent, path: 'matches', canActivate: [AuthGuard] },
    ]
  },
  { component: HomeComponent, path: '**', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
