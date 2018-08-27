#!/bin/sh
mkdir ./public-git
cd ./public-git
git init
git config --global push.default matching
git config --global user.email "${GITHUB_EMAIL}"
git config --global user.name "${GITHUB_USER}"
git remote add origin https://${GITHUB_TOKEN}@github.com/SukkaW/CheckNetwork.git
git pull origin pages
rm -rf ./*
cp -rf ../public/* ./
git add --all .
git commit -m "Deploy SukkaW/CheckNetwork to github.com/SukkaW/CheckNetwork.git:pages"
git push --quiet --force origin HEAD:pages
