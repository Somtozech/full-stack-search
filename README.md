# Accommodation Search

## Technical Coding Test

This project has a simple setup with an api, hooked up to MongoDB and a frontend piece initiated with [vite](https://vitejs.dev/).

## Install and run

From the project root:

```
npm install
```

### Run

Once install has finished, you can use the following to run both the API and UI:

```
npm run start
```

### API

To run the API separately, navigate to the `./packages/api` folder

```
$ cd packages/api
```

And run the `api` server with

```
$ npm run dev
```

The API should start at http://localhost:3001

### Client

To run the `client` server separately, navigate to the `./packages/client` folder

```
$ cd ./packages/client
```

And run the `client` with

```
$ npm run start
```

The UI should start at http://localhost:3000

### Database connection & environment variables

By default, the code is set up to start and seed a MongoDB in-memory server, which should be sufficient for the test. The database URL will be logged on startup, and the seed data can be found at ./packages/api/db/seeds.

If this setup does not work for you or if you prefer to use your own MongoDB server, you can create a .env file. In the ./packages/api folder, create a .env file (or rename the existing .env.sample) and fill in the environment variables.

## Task at hand

When the project is up and running, you should see a search-bar on the screen. This one is currently hooked up to the `/hotels` endpoint.
When you type in a partial string that is part of the name of the hotel, it should appear on the screen.
Ie. type in `resort` and you should see some Hotels where the word `resort` is present.

You will also see 2 headings called **"Countries"** and **"Cities"**.

The assignment is to build a performant way to search for Hotels, Cities or Countries.
Partial searches will be fine. Hotels will need to filterable by location as well.
Ie. The search `uni` should render

- Hotels that are located in the United States, United Kingdom or have the word `uni` in the hotel name.
- Countries that have `uni` in their name Ie. United States, United Kingdom
- No Cities as there is no match

Clicking the close button within the search field should clear out the field and results.

When clicking on one of the `Hotels`, `Cities` or `Countries` links, the application should redirect to the relevant page and render the selected `Hotel`, `City` or `Country` as a heading.

### Limitations

Given the time constraints, we do not expect a fully production-ready solution. We're primarily interested in the approach and the overall quality of the solution. 
Feel free to modify the current codebase as needed, including adding or removing dependencies. 
For larger or more time-intensive changes, you're welcome to outline your ideas in the write-up section below and discuss them further during the call.

<img src="./assets/search-example.png" width="400px" />

### Write-up

### Approach and Implementation

#### Search Functionality
I implemented a search solution that allows users to search across multiple collections (Hotels, Cities, and Countries) with the following key features:
- Case-insensitive partial matching
- Unified search results: One search returns results from all categories.
- Performance boost with debouncing: Reduces unnecessary API calls by adding a small delay while typing.

#### Technical Highlights
- Frontend: React with TypeScript and Redux Toolkit, RTK Query for data fetching
- Backend: Express, MongoDb
- Testing: Vitest and React Testing Library (Frontend), Jest with Supertest (Backend)

### Challenges and Solutions

1. **Unified Search Mechanism**
   - Created a single endpoint that searches across multiple collections
   - Implemented a flexible matching system that works for different types of results using aggregation
   - Combined various types of results (hotels, cities, countries) into a single, organized response.

2. **Performance Optimization**
   - Implemented targeted indexes on searchable fields for each collection for faster queries
   - Minimized database query overhead by using a single aggregation pipeline reducing multiple separate  queries to a single database operation
   - Used `$project` to select only necessary fields required for the search results
   - Used debounce to reduce unnecessary API calls on the frontend

3. **User Experience**
   - Implemented clear search functionality
   - Loading and error states for better feedback
   - Created responsive and accessible design


### Potential Improvements

1. **Search Functionality**
   - Add advanced algorithms like full-text and fuzzy matching (e.g., using MongoDB `$text` index)
   - Implement server-side pagination

2. **Performance**
   - Add caching mechanisms
   - Currently my implemenation uses single indexes. Consider Using compound indexes for multi-field search
   - Consider integrating search engines like algolia or elasticsearch if we need features like full-text search, fuzzy matching, relevance scoring, and geo-search over a large dataset. They offers fast, scalable, and distributed search, ideal for handling large datasets and complex queries. 

3. **Configuration and Deployment**
   -  Environment Variable Validation: Add validation to the configuration to ensure all required environment variables are present, if the required environment variables are not present the application should fail fast and provide immediate feedback on misconfiguration
   -  Containerization: Add Docker configuration for easier deployment and local setup

4. **Frontend Enhancements**
   - Improve error handling UI
   - Add more detailed loading states
   - Create more comprehensive accessibility features

5. **Testing**
   - Implement end-to-end testing (using playwright)
   - Increase test coverage

_When all the behaviour is implemented, feel free to add some observations or conclusions you like to share in the section_

### Database structure

#### Hotels Collection

```json
[
  {
    "chain_name": "Samed Resorts Group",
    "hotel_name": "Sai Kaew Beach Resort",
    "addressline1": "8/1 Moo 4 Tumbon Phe Muang",
    "addressline2": "",
    "zipcode": "21160",
    "city": "Koh Samet",
    "state": "Rayong",
    "country": "Thailand",
    "countryisocode": "TH",
    "star_rating": 4
  },
  {
    /* ... */
  }
]
```

#### Cities Collection

```json
[
  { "name": "Auckland" },
  {
    /* ... */
  }
]
```

#### Countries Collection

```json
[
  {
    "country": "Belgium",
    "countryisocode": "BE"
  },
  {
    /* ... */
  }
]
```