# Application Pokétroc 

Pokétroc est une API REST conçue pour stocker son deck de cartes Pokémon ainsi que gérer des échanges de cartes avec des personnes à proximité de soi, intégrant des fonctionnalités de notification via WebSocket.

L'application a été inspirée de l'univers de Pokémon est d'Instagram et est destinée aux dresseurs de cartes passionnés par l'univers Pokémon. Attrappez toutes les cartes, Pokétroc ! 


## Fonctionnalités 

### De Base (premier semestre Archioweb)

    - Gestion des utilisateurs : inscription, suppression, connexion, déconnexion, modification du profil.
    - Gestion des cartes : Créer, Afficher, Modifier, supprimer.
    - Gestion des échanges : Créer, Afficher, Modifier, supprimer.
    - Intégration des données Pokémon depuis le site https://pokemontcg.io/ pour chaque carte.
    - Notification Websocket pour des mises à jour des cartes, des échanges et des messages.
    - Filtrage avancé et pagination des données.
    - Authentication JWT pour sécuriser l'accès aux endpoints.
  
### Supplémentaires (deuxième semestre Dévmobil) 

1. Un utilisateur peut s'inscrire ou se logguer une fois arrivé sur Pokétroc.

2. Il peut notamment ajouter de nouvelles cartes Pokémon dans son deck. De plus, depuis son deck, un utilisateur peut modifier sa carte notamment au niveau de son état, de sa quantité, etc. 

3. Un utilisateur peut supprimer sa carte depuis son deck. 

4. Un utilisateur peut, s'il le souhaite, se faire géolocalisé sur une carte. Cette fonctionnalité est disponible via l'onglet de la page Home dans le fil d'actualité et il suffit de cliquer sur le filtre Dresseurs pour ainsi voir les dresseurs à proximité. 

5. Les dresseurs Pokémon (utilisateurs) figurent sur une carte pour savoir avec qui ils peuvent échanger à proximité.

6. Les utilisateurs ont la possibilité de rechercher un Pokémon via la barre de recherche disponible sur le menu "Ajouter carte". 

## Technologies utilisées

### 1er semestre
    - Node.js
    - MongoDB
    - WebSocket

### 2ème semestre
    - Angular
    - Ionic CLI
    - Capacitor
    - Leaflet
    - API de Poketroc [https://poketroc.onrender.com/api](https://poketroc.onrender.com/api)
    - API des cartes Pokémon [https://api.pokemontcg.io/v2/]
    - WebSocket

## Usage

### Cloner le repository
git clone https://github.com/nicolaswunderle/poketroc.git

### Installer les dépendances
cd poketroc
npm i

## Parcours utilisateur

### Page connexion / login 

Tout d'abord, l'utilisateur arrive sur la page d'inscription ou de connexion. S'il choisit la page d'inscription, il doit y mettre ses informations personnelles (figurant sur une application de base) ainsi sa photo de profil. Dans le cas où il choisit la page de connexion, il y inscrit son pseudo puis son mot de passe pour accéder à l'incroyable application Pokétroc. 

### Page d'actualité (Home)

Puis il arrive la page d'actualité. La page d'actualité est une vitrine des cartes Pokémon disponibles pour l'échange. On y voit donc la carte Pokémon ainsi que des informations utiles pour lui (quantité, description...). Il peut ainsi via un bouton entreprendre les démarches faciles pour échanger avec lui. 
Il a aussi accès à des filtres (Cartes, Dresseurs, Nouveauté, Pertinence) pour lui proposer des choix adaptés à ses besoins. Les fonctionnalités Cartes (cartes proposées pour des échanges) et Nouveauté (trié par ordre temporel) sont proposées par défaut. La fonctionnalité Dresseurs quant à elle est efficace pour savoir quels dresseurs est à proximité de lui. Le filtre Pertinence sert à obtenir les cartes les plus pertinentes en fonction de ses souhaits (pas encore implémenté).

### Page deck

La page deck, accessible via le menu, permet de voir l'ensemble de ses cartes. Il figure deux onglets : Collectée et Souhaitée. L'onglet Colllectée sert à voir l'étendue des cartes qu'il possède et Souhaitée sont celles qu'il souhaite et qui est aussi utile pour les autres utlisateurs afin de savoir ce qu'il désire particulièrement. En cliquant sur le bouton "Ajouter une carte", le dresseur est redirigé sur le 3ème bouton du menu à savoir "Ajouter Carte".

### Page ajouter carte

Cette page est donc accessible via le deck ou bien vers le menu. Ici, l'utilisateur a deux choix : 
-soit y mettre le numéro de sa carte ( il est nécessaire d'aller sur le lien proposé pour trouver la carte qu'il l'intéresse puis de copier le slug de l'url, à savoir la dernière partie du lien de la carte) et le coller sur l'application. 
- soit d'y inscrire le nom du Pokémon qu'il désire.
Une fois qu'il a inséré ses cartes, il les verra dans son Deck.

### Page échanges

Cette page permet de voir les échanges en attente de décision. L'utlisateur peut soit accepter soit refuser l'échange s'il en possède. Il peut obtenir aussi plus d'informations sur le dresseur qui propose l'échange. Il visionne ainsi les cartes : à savoir les siennes et celles de l'autre utilisateur via les deux onglets. Il peut aussi cliquer sur les flèches pour ainsi regarder les différentes cartes. Il peut aussi ici accepter, refuser ou discuter avec l'utilisateur pour son échange, redirigeant vers les messages qu'il a avec ce dernier.

### Page profil

Sur le profil, accessible via le menu, l'utilisateur a la possibilité de consulter l'intégralité de ses informations. Il peut aussi modifier ses informations et sa photo en cliquant sur le bouton crayon. De plus, Via le profil, il peut se déconnecter.

### Page déconnexion

La page déconnexion est disponible sur le bouton déconnexion, en haut à droite de l'écran.

### Page tchat

Cette page est dédiée aux messages que peuvent s'envoyer les utilisateurs lors d'un échange. Comme sur le réseau social Instagram, il figure toutes ses conversations. Il peut cliquer sur le crayon pour écrire à une personne qu'il souhaite dans sa liste de contacts ou bien choisir une discussion et la continuer.