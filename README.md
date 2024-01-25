# Installer l'application
`npm install`

# Démarrer l'application
`ionic serve`

# Ouvrir l'application sur un smartphone
Construire l'application si ce n'est pas déjà fait ou s'il y a eu des changements après le build précédent.
`ionic build`

## IOS
### Ouvrir le simulateur en ligne de commande
`npx cap run ios`

### Ouvrir le simulateur dans Xcode
1. `npx cap open ios`
2. Ensuite si un iPhone est connecté par cable on peut le choisir dans la liste des appareils disponbiles
3. Une fois l'appareil choisi, il faut cliquer sur 'play' pour lancer l'application

## Android
### Ouvrir le simulateur en ligne de commande
`npx cap run android`

### Ouvrir le simulateur dans Android Studio
1. `npx cap open android`
2. Ensuite si un téléphone avec Android est connecté par cable on peut le choisir dans la liste des appareils disponbiles
3. Une fois l'appareil choisi, il faut cliquer sur 'play' pour lancer l'application

# Documentations

[TypeScript](https://mediacomem.github.io/comem-devmobil/latest/subjects/ts)
[Angular (Standalone)](https://mediacomem.github.io/comem-devmobil/latest/subjects/angular-standalone)


## Ionic

[Utiliser Ionic avec Angular](https://mediacomem.github.io/comem-devmobil/latest/subjects/ionic-angular)
[Liste des composants Ionic](https://ionicframework.com/docs/components)
[Liste des icônes dans Ionic](https://ionic.io/ionicons)

# APIs

## Backend

Lien vers l'API Poketroc [https://poketroc.onrender.com/api](https://poketroc.onrender.com/api)

Le lien vers l'api est défini dans le fichier src/environnements/environment.ts
1. Il suffit de l'importer `import { environment } from "src/environments/environment";`
2. Dans le code on peut réutiliser la variable `environment.apiUrl` à la place de l'url de l'API

## Carte Pokémon

Lien ver l'API [https://api.pokemontcg.io/v2/](https://api.pokemontcg.io/v2/)

Le lien vers l'api est défini dans le fichier src/environnements/environment.ts
1. Il suffit de l'importer `import { environment } from "src/environments/environment";`
2. Dans le code on peut réutiliser la variable `environment.apiPokemonTCGUrl` à la place de l'url de l'API
3. Le token d'authentification est aussi disponnible à `environment.tokenPokemonTCG`.

Pour utiliser le token de l'API il faut ajouter `X-Api-Key` dans le Header avec la valeur du token disponnible ici `environment.tokenPokemonTCG`

Documentation [https://docs.pokemontcg.io/](https://docs.pokemontcg.io/)
Rechercher une carte dans la base de donnée de pokemontcg.io [https://pokemontcg.guru/](https://pokemontcg.guru/)