# The-EG's OctoPrint Plugins Dashboard

This is the source for https://the-eg.github.io/plugins-dashboard .

It uses NodeJS, React, Material-UI, Recharts and Gatsby. The site is built from the gh-pages branch and copied to the main branch where it is served using github pages.


## Setup Your Own Dashboard

You can use this to track your own plugins!

1. Fork this repo
3. Replace the contents each .json file in data/ with an empty object (`{}`)
4. Update plugins-dashboard-config.json
5. Setup a personal access token:
  - Go to your user settings
  - Go to 'developer' settings
  - Go to 'personal access tokens'
  - Click generate new token, give it a name, etc. 
  - Copy the new token
6. Add the token as a repo secret
  - Go to the newly forked repo settings
  - Go to 'Secrets'
  - 'New Repository Secret' named `REPO_SECRET` and paste the token you copied above
7. Enable GH Pages on the `main` branch
  - Go to repo settings
  - Goto 'Pages'
  - Select the `main` branch and `/ (root)`
  - Click save
