# GitHub Contributions Generator
Flex with contributions graph. Creates multiple commits every day.

## Usage
Create a workflow file `.github/workflows/any-name-you-want.yml`
```
name: Generate Commits

on:
  schedule:
    - cron: "0 0 * * *"
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - uses: konradlinkowski/contributionsgenerator@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          GIT_NAME: <your git username here>
          GIT_EMAIL: <you git email here>
```

Change number of commits per day
```
name: Generate Commits

on:
  schedule:
    - cron: "0 0 * * *"
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - uses: konradlinkowski/contributionsgenerator@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          GIT_NAME: <your git username here>
          GIT_EMAIL: <you git email here>
          COMMITS: <number of commits per day>
```
