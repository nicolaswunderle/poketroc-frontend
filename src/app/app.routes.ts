import { Routes } from '@angular/router';
import { onlyAuthenticated } from "./security/only-authenticated.guard";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./layout/layout.page").then((m) => m.LayoutPage),
      canActivate: [onlyAuthenticated],
      children: [
        {
          path: 'home',
          loadComponent: () => import('./layout/home/home.page').then(m => m.HomePage)
        },
        {
          path: 'deck',
          loadComponent: () => import('./layout/deck/deck.page').then(m => m.DeckPage)
        },
        {
          path: 'ajouterCarte',
          loadComponent: () => import('./layout/ajouter-carte/ajouter-carte.page').then(m => m.AjouterCartePage)
        },
        {
          path: 'echanges',
          loadComponent: () => import('./layout/echanges/echanges.page').then(m => m.EchangesPage)
        },
        {
          path: 'profil',
          loadComponent: () => import('./layout/profil/profil.page').then(m => m.ProfilPage)
        },
        {
          path: 'message',
          loadComponent: () => import('./layout/message/message.page').then(m => m.MessagePage)
        },
        {
          path: 'echangeDetails',
          loadComponent: () => import('./layout/echange-details/echange-details.page').then( m => m.EchangeDetailsPage)
        },
        {
          path: 'messageUtilisateur',
          loadComponent: () => import('./layout/message-utilisateur/message-utilisateur.page').then( m => m.MessageUtilisateurPage)
        },
        {
          path: '',
          redirectTo: 'home',
          pathMatch: 'full'
        },
      ]
  },
  {
    path: 'login',
    loadComponent: () => import('./security/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./security/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'cartes',
    loadComponent: () => import('./layout/card/card.page').then( m => m.CardPage)
  },

];

