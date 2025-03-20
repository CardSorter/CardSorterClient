# CardSorter
Client version for the open card sorting tool. 

The full paper this tool was based on can be found on the [ACM's directory](https://dl.acm.org/doi/abs/10.1145/3437120.3437279)
Original authors: [Georgios Melissourgos](https://scholar.google.com/citations?user=ZcEnV9oAAAAJ&hl=en&oi=ao), [Christos Katsanos](https://scholar.google.com/citations?hl=en&user=_6k57BEAAAAJ)

## How to get started

### Prerequisites
1. Node 18+ with npm and yarn

### Running the development

#### Running the backend
To run the backend, clone the server locally https://github.com/CardSorter/CardSorterServer and follow the instructions there for setting up the api.

#### Running the client
1. Clone the repo locally (e.g. `$ git clone https://github.com/CardSorter/CardSorterClient`)
2. Cd into the root folder (e.g. `$ cd CardSorterClient`)
3. Install dependencies `yarn install`
4. Run NextJs `yarn dev`
5. Open http://localhost:3000/card-sorter/en in your browser

Because the pages are dynamically created by NextJS, the first time that a page load it may take up to 2 seconds for it to appear in the browser.


## Publications
- [Original paper](https://dl.acm.org/profile/99659688318) —[Georgios Melissourgos](https://scholar.google.com/citations?user=ZcEnV9oAAAAJ&hl=en&oi=ao), [Christos Katsanos](https://scholar.google.com/citations?hl=en&user=_6k57BEAAAAJ)
- [Functionality improvements](https://ikee.lib.auth.gr/record/354705/files/KYRIACOU.pdf) —Panagiotis Kyriacou