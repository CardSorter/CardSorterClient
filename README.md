# CardSorter
Client version for the open card sorting tool. 

The full paper that was based on this tool can be found on the ACM's directory

## How to get started

### Prerequisites
1. Node 12+ with npm and yarn
2. Docker and docker-compose
3. (Optionally) a unix-based or bashed enabled system

### Running the development 

1. Clone the repo locally (e.g. `$ git clone https://github.com/CardSorter/CardSorterClient`)
2. Clone the server locally (https://github.com/CardSorter/CardSorterServer) and follow the instructions there for setting up the api.
3. Cd into the root folder (e.g. `$ cd CardSorterClient`)
4. (optional) If running for the first time, install dependencies (e.g. `$ sh ./install_dependencies.sh`). This is used for linting purposes, as packages
   are managed in the containers.
5. From the root folder get up the development environment `$ docker-compose up`

Alternatively:
5. Cd into the module you'd like to run (e.g. `$ cd auth`)
6. Run the development server with watch capabilities (e.g. `$ yarn start`)
