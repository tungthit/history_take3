# Chill Geo-Flight

An interactive 3D globe explorer: countries, cities, landmarks, a History layer (66 countries) and a
Science layer (143 milestones across math, CS, physics, chemistry, biology and medicine, with a time
player, per-milestone stories and computed illustrations). All UI text is English.

## Run it (no Node.js needed)

The whole game is a **static site in `docs/`** (plain HTML + prebuilt JS/CSS/images). Serve that folder
with any static web server:

- **GitHub Pages:** Settings → Pages → Deploy from branch → `main` / `/docs`.
- **Docker:** `docker run --rm -p 8095:80 -v "$PWD/docs:/usr/share/nginx/html:ro" nginx:stable-alpine`
  then open http://localhost:8095
- Any other static server (nginx, Apache, `npx serve docs`, …) works too.

Opening `docs/index.html` by double-click (`file://`) will **not** work: browsers block loading the
textures and data files from disk. It needs to be served over http(s).

## Develop (only if you change the code)

Source is in `source/` (React + three.js + Vite). Node is not required locally; `source/build.sh`
runs the build inside Docker and rewrites `docs/`:

```sh
./source/build.sh
```

Layout: `source/src/geoflight/` (game code), `source/public/geoflight/` (terrain tiles, road/rail/water
layers), `docs/` (built site, committed).

## Credits

This project is a web migration based on **Geographical Adventures** by **Sebastian Lague**
(Unity game, MIT License). The idea, the flight-over-a-globe concept and the map/terrain approach
come from his work; this repo re-implements and extends it in React + three.js.

- Video: [Polishing and Releasing My Tiny Geography Game](https://www.youtube.com/watch?v=pNp4ug5F6To)
- Original source code: https://github.com/SebLague/Geographical-Adventures
- Original game download: https://sebastian.itch.io/geographical-adventures

Country flags in `assets/flags/` have their own license (see `LICENSE.txt` in that folder).
