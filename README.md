# CardSorter
Client version for the open card sorting tool. 

The full paper that was based on this tool can be found on the ACM's directory

## How to get started

### Prerequisites
1. Node 12+ with npm and yarn
2. Docker and docker-compose
3. (Optionally) a unix-based or bashed enabled system

### Running the development 

#### The easy way
1. Clone the repo locally (e.g. `$ git clone https://github.com/CardSorter/CardSorterClient`)
2. Cd into the root folder (e.g. `$ cd CardSorterClient`)
3. If running for the first time, install dependencies (e.g. `$ sh ./install_dependencies.sh`)
4. From the root folder get up the development environment `$ docker-compose up`

#### Alternatively you can skip step 4 for:
4. Cd into the module you'd like to run (e.g. `$ cd auth`)
5. Run the development server with watch capabilities (e.g. `$ yarn start`)

### The backend
To run the backend, clone the server locally (https://github.com/CardSorter/CardSorterServer) and follow the instructions there for setting up the api.