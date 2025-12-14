# Guide de Déploiement : Vercel & Render

Ce guide vous explique comment mettre en ligne votre application **Attiéké Ivoir** gratuitement.

## Prérequis
- Un compte [GitHub](https://github.com/)
- Un compte [Render](https://render.com/) (pour le Backend)
- Un compte [Vercel](https://vercel.com/) (pour le Frontend)

## Étape 1 : Pousser le code sur GitHub

1.  Assurez-vous d'avoir git installé.
2.  Initialisez et poussez votre code :
    ```bash
    git init
    git add .
    git commit -m "Déploiement initial Attiéké Ivoir"
    # Créez un repo sur GitHub et suivez les instructions pour ajouter le remote
    git remote add origin https://github.com/VOTRE_USER/attieke-ivoir.git
    git push -u origin main
    ```

## Étape 2 : Déployer le Backend sur Render (Gratuit)

1.  Connectez-vous à **Render**.
2.  Cliquez sur **"New +"** -> **"Web Service"**.
3.  Connectez votre repo GitHub.
4.  Configurez le service :
    -   **Name** : `attieke-ivoir-backend`
    -   **Root Directory** : `backend`
    -   **Runtime** : `Python 3`
    -   **Build Command** : `./build.sh`
    -   **Start Command** : `gunicorn config.wsgi:application`
    -   **Instance Type** : `Free`
5.  **Variables d'environnement** (Advanced -> Environment Variables) :
    -   `PYTHON_VERSION` : `3.9.0` (ou votre version locale)
    -   `SECRET_KEY` : Générez une clé secrète aléatoire.
    -   `DEBUG` : `False`
    -   `DATABASE_URL` : (Facultatif sur le plan gratuit si vous utilisez SQLite ephemeral, mais recommandé d'ajouter une "Render Postgres" gratuite et de lier l'URL interne ici).
6.  Cliquez sur **"Create Web Service"**.
7.  Notez l'URL de votre service (ex: `https://attieke-ivoir-backend.onrender.com`).

## Étape 3 : Déployer le Frontend sur Vercel (Gratuit)

1.  Connectez-vous à **Vercel**.
2.  Cliquez sur **"Add New..."** -> **"Project"**.
3.  Importez votre repo GitHub.
4.  Configurez le projet :
    -   **Root Directory** : Cliquez sur "Edit" et sélectionnez le dossier `frontend`.
    -   **Framework Preset** : Next.js (doit être détecté auto).
5.  **Variables d'environnement** :
    -   Nom : `NEXT_PUBLIC_API_URL`
    -   Valeur : L'URL de votre backend Render + `/api` (ex: `https://attieke-ivoir-backend.onrender.com/api`).
6.  Cliquez sur **"Deploy"**.

## C'est en ligne ! 🎉
Votre site sera accessible via l'URL fournie par Vercel.

### Notes Importantes concernant le plan gratuit :
- **Render (Backend)** : Le service "gèle" après 15 minutes d'inactivité. Le premier chargement peut prendre 50 secondes le temps qu'il redémarre.
- **Base de données** : Sur le plan gratuit Render web service, les fichiers SQLite sont éphémères (effacés à chaque redémarrage). Pour persister les données (comptes, commandes), créez une instance **Postgres** (Render propose un plan gratuit 90 jours ou un plan starter).
