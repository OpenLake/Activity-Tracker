# Contributing guidelines

## Getting started

- If it is your first time working on this project, it is recommended to start working on issues labelled "First Timers Only".
- Choose an issue that is labelled "Available" and claim it in the comment section of the respective issue.
- Once the maintainer of the repository assigns it to you, you can start working on it.
- Make sure you keep updating us on your work.

## Setup 🛠️

### Step 1

- Fork this repository by clicking `fork button`

- Clone the repository in your local machine by typing

  ```git
  git clone https://github.com/<your-username>/Cross-Platform-Activity-Tracker.git
  ```

  in your terminal(for _mac/linux_) or Git Bash (for _windows_)

- Now create a new branch using

  ```git
  git checkout -b <your-new-branch-name>
  ```

### Step 2

- Install `nodejs` and `npm` on your local machine. For [windows](https://www.geeksforgeeks.org/installation-of-node-js-on-windows/), [linux](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04) and [mac](https://nodesource.com/blog/installing-nodejs-tutorial-mac-os-x/)

- Install `pnpm` by opening your terminal with administrative (sudo) privileges and type

  ```git
  npm i -g pnpm
  ```

- Open your terminal in your current working directory (i.e, `Cross-Platform-Activity-Tracker`) and run the following command to install all dependencies for the project

  ```pnpm
  pnpm i
  ```

- Install docker on your machine. For [windows](https://docs.docker.com/desktop/windows/install/), [linux](https://docs.docker.com/engine/install/ubuntu/) and [mac](https://docs.docker.com/desktop/mac/install/)

### Step 3

- Install `docker-compose` by following the [official guide](https://docs.docker.com/compose/install/)

- Navigate to `Cross-Platform-Activity-Tracker` directory and with administrative privileges run

  ```docker
  docker-compose up -d
  ```

- To start the application run

  ```npm
  npm run dev
  ```

- Open a browser and enter

  ```link
  http://localhost:3001/
  ```

  at this address the web application will be running

</br>

If you face any issues while setting up feel free to ask the moderators in [issues](https://github.com/OpenLake/Cross-Platform-Activity-Tracker/issues) and if you are new to open source refer to this [link](https://github.com/firstcontributions/first-contributions)

## Raising a PR

- You can find a step-by-step proceducre on how to create a PR [here](https://github.com/OpenLake/Cross-Platform-Activity-Tracker/wiki/A-step-by-step-procedure-for-creating-a-PR)
- While raising a pull request from your branch, please follow the [PR-name-style-guide](https://github.com/OpenLake/Cross-Platform-Activity-Tracker/wiki/PR-name-style-guide).
- While submitting your PR, please follow [this template](https://github.com/OpenLake/Cross-Platform-Activity-Tracker/blob/main/.github/PULL_REQUEST_TEMPLATE.md)
