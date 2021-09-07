<h1 align="center"> Setup Cross Platform Activity Tracker
 🛠️</h1>

## Step 1

- Fork this repository by clicking `fork button`

- Clone the repository in your local machine by typing 
    ```
    git clone https://github.com/<your-username>/Cross-Platform-Activity-Tracker.git
    ``` 
    in your terminal(for _mac/linux_) or Git Bash ( for _windows_)

- Now creat a new branch using 
    ```
    git checkout -b <your-new-branch-name>
    ```

## Step 2

- Install `nodejs` and `npm` on your local machine. For [windows](https://www.geeksforgeeks.org/installation-of-node-js-on-windows/) and [linux](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04)
- Install `pnpm` by opening your terminal with administrative privileges and type 
    ```
    npm i -g pnpm
    ``` 

- Install `doceker-compose` by following the [official guide](https://docs.docker.com/compose/install/)

## Step 3
- Navigate to `/Cross-Platform-Activity-Tracker` directory and with administrative privileges run 
    ```
    docker-compose up -d
    ```

- To start the  application run 
    ```
    npm run dev
    ```
- Open a browser and enter 
    ```
    http://localhost:3001/
    ``` 
    at this address the web application will be running

</br>

If you face any issuse while setting up feel free to ask the moderators in [issues](https://github.com/OpenLake/Cross-Platform-Activity-Tracker/issues) and if you are a new to open scource reffer to this [link](https://github.com/firstcontributions/first-contributions)