# CardSorter

Thank you for considering expanding CardSorter! CardSorter is a tool aimed to make card sorting accessible to any UX Researcher,
UX Practitioner, Professional, or hobbyist.

The official live version of the tool can be found in: https://usability.csd.auth.gr/card-sorter/

## Getting started with development

### Pre-requirements

Before starting developing make sure you are familiar, at least to a high level, with the following technologies and workflows:

1. Typescript ([Docs](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html))
2. React & Functional Components ([Docs](https://react.dev/learn/thinking-in-react))
3. Redux ([Docs](https://redux.js.org/tutorials/essentials/part-1-overview-concepts) | [Video](https://www.youtube.com/watch?v=9zySeP5vH9c))
4. Redux Thunk ([Docs](https://redux.js.org/usage/writing-logic-thunks))
5. NextJS App router ([Docs](https://nextjs.org/docs/app/building-your-application/routing))

### Structure of the project

#### Designer module
The designer module is the main component of the application. It is here that the users will create a new card sort 
and will share it with their participants to complete the card sort. This is also where the analysis will happen: we show
all the data collected from the various card sorts, both in aggregate and in more complex visualisations (e.g. dendrogram).

The designer module is an authenticated system: the user will need to login in order to access their study and related data.

#### Sorter module
The sorter module is the interface that the participants of the card sort will use to complete it. When a user
creates a new study, they will share a link with the participants. This link will render the sorter module.

### Simplified directory structure

```
|-- Dockerfile # Used for instructing the production server how to run the client
|-- messages # Internationalisation of the app, see "Internationalisation" below
|   `-- en.json # English locale
|-- public # Static files 
|   `-- images # Images used throughout the application
|-- src # The code of the app lives here
|   |-- App.css # CSS classes for the designer & auth part of the application
|   |-- Store.ts # Configuration of the Redux-Store
|   |-- actions # Redux actions
|   |   |-- ActionStatus.ts # Enum for the status of thunk (async) actions (e.g. IS_FETCHING)
|   |   |-- authAction.ts # Actions related to the global authentication of the app (auth tokens)
        ...
|   |   |-- sorting # Actions for the sorting component of the app
        ...
|   |   `-- studyPageAction.ts # Actions related to the study page
|   |-- app # NextJS app router, each page corresponds to a different URL in the browser
|   |   `-- [locale] 
|   |       |-- create # http://localhost:3000/card-sorter/en/
|   |       |   |-- add-cards # http://localhost:3000/card-sorter/en/create/add-cards
|   |       |   |-- final # http://localhost:3000/card-sorter/en/create/final
|   |       |   |-- page.tsx # http://localhost:3000/card-sorter/en/create
|   |       |   `-- success # http://localhost:3000/card-sorter/en/success
|   |       |-- layout.tsx # Layout for http://localhost:3000/card-sorter/en/
|   |       |-- login # http://localhost:3000/card-sorter/en/login
|   |       |-- page.tsx # http://localhost:3000/card-sorter/en/
|   |       |-- register # http://localhost:3000/card-sorter/en/register
|   |       |-- sort # http://localhost:3000/card-sorter/en/sort
|   |       |   |-- [id] # http://localhost:3000/card-sorter/en/sort/some_id
|   |       |   |-- layout.tsx # Layout for http://localhost:3000/card-sorter/en/sort
|   |       |   |-- not-found # http://localhost:3000/card-sorter/en/sort/not-found
|   |       |   `-- thank-you # http://localhost:3000/card-sorter/en/sort/thank-you
|   |       `-- study # http://localhost:3000/card-sorter/en/study
|   |           `-- [id] # http://localhost:3000/card-sorter/en/study/some_id
|   |               |-- cards # http://localhost:3000/card-sorter/en/study/some_id/cards
|   |               |-- categories # http://localhost:3000/card-sorter/en/study/some_id/categories
|   |               |-- clusters # http://localhost:3000/card-sorter/en/study/some_id/clusters
|   |               |-- layout.tsx # Layout for http://localhost:3000/card-sorter/en/study/some_id
|   |               |-- page.tsx # http://localhost:3000/card-sorter/en/study/some_id
|   |               |-- similarity # http://localhost:3000/card-sorter/en/study/some_id/similarity
|   |               `-- sorting # http://localhost:3000/card-sorter/en/study/some_id/sorting
|   |-- elements # Reusable elements used in the pages in the NEXTJs app router
|   |   |-- sorting # Reusable elements specific to the sorting component
|   |   `-- visualisations # Visualisation used on the study page
|   |-- i18n # Setup for internationalisation
|   |-- index.css # Needs to be refactored to include css resets
|   |-- middleware.ts # NextJS middleware
|   |-- reducers # Redux reducers
|   |   |-- StateSchema.ts # The schema (type) of the state for the whole application
        ...
|   |   |-- sorting # Reducers specific to the sorting component
        ...
|   |   `-- studyPageReducer.ts # Reducer for the study page
|   |-- sorter.css # CSS classes for the sorter component
|   `-- utils # Static, reusable, utilities
```

## Best practices

### Adding a new feature workflow
When thinking of adding a new feature, it is helpful to use this workflow:
#### Plan the Redux State:
- Determine if the feature requires new state properties in the Redux store.
- Identify if new actions, reducers, or selectors are needed.

#### Create new Redux files or append to existing ones (if needed):
- **Actions**: Define action types and action creators (src/actions/).
- **Reducers**: Create or update reducers to handle the new state (e.g., src/reducers/).
- **Thunks**: Write async logic using Redux Thunk (e.g., API calls).
- **If you created a new reducer**: Update the root reducer (src/Store.ts) to include the new reducer.

#### Build UI Components or pages:
- Create new components or pages or update existing ones in the src/elements or src/app/[locale]/ directory.
- Use React hooks (useSelector, useDispatch) to connect components to the Redux store.

#### Integrate API Calls (if needed):
- Use cross-fetch to make API requests in your thunks.
- Handle loading, success, and error states in the Redux store.

### Icons
This application uses material-symbols for rendering icons. If you'd like to add an icon to a React component, you just need
to create a span with the class "material-symbols-outlined" and add as content the material icons name.

Example:
```<span className="material-symbols-outlined">arrow_back</span>```

One simple way to find the icon name is by:
1. Visiting: https://fonts.google.com/icons
2. Selecting the desired icon
3. Scrolling to the bottom of the right pane and copying the icon name

### Styles (SCSS)
- Styles are written in SCSS.
- Generally SCSS modules are preferred (i.e. moduleName.module.scss) over plain scss files.
- Colours and spaces are defined is `src/utils/var.scss` and should be imported in any new scss file `@use "utils/var" as var;`.

For an example of an SCSS file take a look at `src/elements/StudyItem/StudyItem.module.scss`.

### Internationalisation
To enable rendering the app in different languages the following process should be followed  when adding text (including hidden 
texts, e.g. image alt):
1. Add the text to the messages (messages/en.json, ...)
2. The text is added under the key corresponding to the page it will be rendered
   - For example, if we'd like to add the text "create a study" in a button that will be shown in the Studies pages, then 
    we add the key "create study" and the value "create a study" under "StudiesListPage" in the messages/en.json
3. In the component use the hook {useTranslations} from "next-intl" to add the text with the relevant key

Example:
```
messages/en.json
{
    "LoginPage": {
        ...
    },
    ...
    "StudiesListPage": {
        ...
        "create study": "Create a study",
        ...
    },
    ...
}
```

```
src/app/[locale]/study/page.tsx
import {useTranslations} from "next-intl";

export default function page() {
const t = useTranslations("StudiesListPage");

return <button>{t("create study")}</button>;
}
```

### Routing
When using NextJS app router components (Link, redirect, usePathname, useRouter, getPathname) import them from "i18n/navigation"
instead of "next/navigation". The exported component from "i18n/navigation" will also handle routing for the internationalised
context (e.g. /en/).

Example:
```
import {Link} from "i18n/navigation"; # not "next/navigation"

export default function page() => {

return <Link className="logo-container" href='/'>CardSorter</Link>;
}

```

### React State or Redux Global State?
- Use component state (`useState`) for transient UI states and unsaved changes
- Use Redux for truly global state that needs to persist or be shared across components

Here is an [excellent source for Redux best practices](https://redux.js.org/style-guide).

Happy coding!