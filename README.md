# The-EG's OctoPrint Plugins Dashboard

This is the source for https://the-eg.github.io/plugins-dashboard .

It uses NodeJS, React, Material-UI, Recharts and Gatsby. The site is built from the gh-pages branch and copied to the main branch where it is served using github pages.

## How it works in detail
The application loads the plugin-stats for all defined plugins from https://data.octoprint.org/export/plugin_stats_30d.json and builds the webpage out of this data.

This repository includes three branches and two actions.

### Branches
- ```main```: contains the statistics data (don't touch it)
- ```gh-pages```: includes the web-application which are later published to: ```https://<gitHubUser>.github.io/plugins-dashboard/``` (modify if you like)
- ```the-eg```: includes the configuration and the pipeline action-scripts (you can rename it to your own GitHubUser-Name)

### Actions
- ```Update data/*.json```: download the stats (if not executed succesful we can't build the page)
- ```Build and Deploy```: reads  the downloaded data and creates the dashboard

### plugins-dashboard-config.json
This file includes all plugins which you want to show in your dashboard.
```
{
  "gitHubUser": "The-EG",
  "plugins": [
    {"id": "camerasettings", "name": "Camera Settings", "url": "https://github.com/The-EG/OctoPrint-CameraSettings", "repo": "OctoPrint-CameraSettings"},
    {"id": "ublmeshedit", "name": "UBL Mesh Editor", "url": "https://github.com/The-EG/OctoPrint-UblMeshEditor", "repo": "OctoPrint-UBLMeshEdit"}
  ]
}
```
- ```gitHubUser```: Your github account name
- ```id``` id of your plugin, listed in plugins.octoprint.org (all lowercase). This id must be in the plugin_stats_30d.json response
- ```name```: Displayname of the Plugin in the dashboard
- ```url```: Repository URL
- ```repo```: Name of the repository

## Setup Your Own Dashboard

You can use this to track your own plugins!

1. Fork this repo
3. In branch `the-eg`, replace the contents of each .json file in data/ with an empty object (`{}`)
4. Update plugins-dashboard-config.json
5. Setup a personal access token:
    1. Go to your user settings
    2. Go to 'developer' settings
    3. Go to 'personal access tokens'
    4. Click generate new token, give it a name, etc. Give it 'public_repo' access.
    5. Copy the new token
6. Add the token as a repo secret
    1. Go to the newly forked repo settings
    2. Go to 'Secrets'
    3. 'New Repository Secret' named `REPO_TOKEN` and paste the token you copied above
6. (Optional) rename the `the-eg` branch to your own liking. 
    1. Update the reference to the above branch in .github/workflows/*.yml (in branch `gh-pages`)
7. Enable GH Pages on the `main` branch
    1. Go to repo settings
    2. Goto 'Pages'
    3. Select the `main` branch and `/ (root)`
    4. Click save
8. Manually trigger the 'Update data/*.json' workflow

After that, it should update once a day and automatically deploy.

If I make updates that you'd like to incorporate to your fork later:

1. Clone your fork locally
2. Setup this repo as upstream: `git remote add upstream https://github.com/The-EG/plugins-dashboard.git`
3. While on your `gh-pages` branch, pull my `gh-pages` branch: `git pull upstream gh-pages`
4. Push the changes back up to yours: `git push`
5. Switch to your data branch, ie `the-eg`, and merge in gh-pages: `git merge gh-pages`
6. Push those changes up too: `git push`
