import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './errors/not-found.component';
import { ServerErrorComponent } from './errors/server-error.component';
import { AuthGuard } from './guards/auth.guard';
import { PreventUnsavedChangesGuard } from './guards/prevent-unsaved-changes.guard';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { MatchesComponent } from './matches/matches.component';
import { MemberEditComponent } from './matches/member-edit/member-edit.component';
import { MemmberDetailsComponent } from './matches/memmber-details/memmber-details.component';
import { MessagesComponent } from './messages/messages.component';

const routes: Routes =
  [
    { component: HomeComponent, path: '' },
    {
      path: '',
      runGuardsAndResolvers: 'always',
      canActivate: [AuthGuard],
      children: [
        { component: MessagesComponent, path: 'messages' },
        { component: ListComponent, path: 'list' },
        { component: MatchesComponent, path: 'matches' },
        { component: MemmberDetailsComponent, path: 'matches/:username' },
        { component: MemberEditComponent, path: 'match/edit', canDeactivate: [PreventUnsavedChangesGuard] },
      ]
    },
    { component: NotFoundComponent, path: 'not-found' },
    { component: ServerErrorComponent, path: 'server-error' },
    { component: NotFoundComponent, path: '**', pathMatch: 'full' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
