<img src="src/logo.png" width="310px" />

# Game Object Extractor

👋

## URL
https://wemyss.github.io/castle-story

## Description

A simple tool to help you pull out only the objects you want from `gameobjects.json` so that you can transfer them into a maps `gameobjects.json` without it breaking or having all these extra objects (bricktron spirits, crystal spawns, etc) you don't want.


## How to update Game Objects
1. Create a test game and insert new objects that are missing from this tool.
2. Navigate to your gamesaves directory and get the `gameobjects.json` file.
3. Open it in your favourite text editor and use find (`ctrl + f` or `cmd + f`) to search for the string `"$assetKey": "ObjetsDynamiques.`
4. This should have a list of results, you can iterate through them to find the object you are looking for (french names beware 😝). They should look like this `"$assetKey": "ObjetsDynamiques.PaintingTall",`
5. Get the last bit of the key, in this case `PaintingTall` and create a new entry in `App.js` in this repository.
6. Create a Pull Request on GitHub and assign me as a reviewer
