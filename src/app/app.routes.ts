import { Routes } from '@angular/router';
import { onlyAuthenticated } from "./security/only-authenticated.guard";
import { CardPage } from './layout/card/card.page';
import { EchangesPage } from './layout/echanges/echanges.page';
import { CardPatchPage } from './layout/card/card-patch/card-patch.page';
import { CardPostPage } from './layout/card/card-post/card-post.page';
import { SendMessagePage } from './layout/message/send-message/send-message.page';



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
          path: 'deckChoixEchange',
          loadComponent: () => import('./layout/deck-choix-echange/deck-choix-echange.page').then( m => m.DeckChoixEchangePage)
        },
        {
          path: 'ajouterCarte',
          loadComponent: () => import('./layout/ajouter-carte/ajouter-carte.page').then(m => m.AjouterCartePage)
        },
        {
          path: 'ajouterCarte/:cardId', component: CardPostPage,
        },
        {
          path: 'echanges',
          loadComponent: () => import('./layout/echanges/echanges.page').then(m => m.EchangesPage)
        },
        {
          path: 'echanges/:echangeId',
          loadComponent: () => import('./layout/echanges/details/details.page').then(m => m.DetailsPage)
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
          path: 'message/exchange', component: SendMessagePage,
        },
        {
          path: 'echangeCreer',
          loadComponent: () => import('./layout/echange-creer/echange-creer.page').then( m => m.EchangeCreerPage),
        },
        {
          path: 'cartes/:cardId', component: CardPage,
        },
        {
          path: 'cartes/modifier/:cardId', component: CardPatchPage,
        },
        {
          path: 'echanges/:cardId', component: EchangesPage,
        },
        {
          path: '',
          redirectTo: 'home',
          pathMatch: 'full'
        },
      ]
  },
  {
    path: "bienvenue",
    loadComponent: () => import('./security/welcome/welcome.page').then( m => m.WelcomePage)
  },
  {
    path: 'connexion',
    loadComponent: () => import('./security/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'inscription',
    loadComponent: () => import('./security/register/register.page').then( m => m.RegisterPage)
  },






];

