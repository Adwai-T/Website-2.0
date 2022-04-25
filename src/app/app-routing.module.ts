import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IframeContainerComponent } from './components/iframe-container/iframe-container.component';

const routes: Routes = [
  { 
    path: 'articles',
    component: IframeContainerComponent,
    children:[
      { path: '**', redirectTo: ''}
    ],
  },
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
