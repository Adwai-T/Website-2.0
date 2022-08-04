import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { IframeContainerComponent } from './components/iframe-container/iframe-container.component';
import { ProjectsComponent } from './components/projects/projects.component';

const routes: Routes = [
  { 
    path: 'account', 
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule) 
  },
  { 
    path: 'notes', 
    component: ArticlesComponent,
    children:[
      {
        path: '**',
        component: ArticlesComponent
      },
    ]
  },
  { 
    path: 'projects', 
    component: ProjectsComponent,
    children:[
      {
        path: '**',
        component: ProjectsComponent
      },
    ]
  },
  { 
    path: 'about', 
    component: AboutComponent 
  },
  {
    path: 'iframe',
    component: IframeContainerComponent,
  },
  {
    path: '**',
    redirectTo: 'notes', 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
