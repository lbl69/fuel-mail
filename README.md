# Mail fuel

Petite interface pour generer le mail fuel quotidien envoye au service trafic de l'aeroport.

Les poids (RTOW, BLOCK, TAXI, TRIP) sont saisis en LBS ; la conversion en KG est automatique,
et la valeur en LBS reste affichee entre parentheses pour verification. Le formulaire n'est
jamais pre-rempli, afin d'eviter d'envoyer par erreur une ancienne valeur (le probleme du
copier-coller d'un mail precedent).

## Developpement

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
