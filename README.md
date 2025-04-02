# Project Name
Cozmos - BE
## Requirements


- **Deno**: You need to have Deno installed on your machine. If you haven't installed Deno yet, you can follow the installation guide [here](https://deno.land/manual/getting_started/installation).


## Setup


1. Clone the repository:
   ```bash
   git clone https://gitlab.com/mostransstorage/backend_baseline_mostrans.git
   ```


2. Ensure Deno is installed and the project dependencies are correctly configured.


## Available Commands


The following tasks can be executed using `deno task` commands:

### DEVELOPMENT AND PRODUCTION
Before running or building the application make sure to run 
```bash
deno install
```
before run or build the program.


### 1. **Development Mode**


To run the program in development mode, use the `dev` task:


```bash
deno task dev
```


This command will run the project with full permissions (`--allow-all`) and execute `src/index.ts`.


### 2. **Building the Program**


To compile the project into a standalone binary, use the `build` task:


```bash
deno task build
```


This will compile your project and output an executable file named `app`. The compiled program will have full permissions (`--allow-all`).


### 3. **Start the Program (Compiled Version)**


If you want to run the program from the compiled binary, first build it using the `build` command (described above), and then use the `start` task:


```bash
deno task start
```


This will execute the compiled binary file.


## Notes


- The project uses several npm dependencies (`apollo-server-core`, `sequelize`, etc.), which are imported via Deno's compatibility layer for Node.js modules (`npm:`).
- The `--allow-all` flag grants the program full access to network, file system, and environment variables. It is recommended to narrow down permissions for production environments.
