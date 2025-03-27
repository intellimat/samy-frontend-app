# Samy web challenge  
React app that shows Samy images.

## Requirements  
- node.js >= 22.14
- npm >= 10.9.2
- latest Google Chrome Browser

## Installation

Clone the repo  
`git clone https://github.com/intellimat/samy-frontend-app.git`

Go to _samy-frontend-app_ folder  
`cd samy-frontend-app`

and run  
`npm install`

## Run the project  
`npm run dev`

## Test

The app has been tested using _vitest_ and _React Testing Library_.  
You can run the tests by entering  
`npm test`

You can run the test coverage by entering  
`npm run coverage`

Or run see tests outcome on your browser by typing  
`npm run test-ui`

Currently implemented tests:  
 ✓ _src/test/app.test.tsx (5 tests)_  
   ✓ _App > should display a navbar_  
   ✓ _App > should display a searchbar_  
   ✓ _App > should get new data when typing on the searchbar_  
   ✓ _App > should display as many cards as the cards returned by the service_  
   ✓ _App > should mutate the card image on heart button click_  

## Tech stack  
- vite
- react 19
- apollo client
- vitest
- react testing library

## Project structure (/src)  
```
.
├── App.module.css
├── App.tsx
├── assets
│   ├── icons
│   │   ├── arrow-right-forward.svg
│   │   ├── empty-heart.svg
│   │   ├── full-heart.svg
│   │   └── lens.svg
│   └── SAMY_logo.svg
├── components
│   ├── Card
│   │   ├── card.module.css
│   │   └── Card.tsx
│   ├── Navbar
│   │   ├── navbar.module.css
│   │   └── Navbar.tsx
│   └── Searchbar
│       ├── searchbar.module.css
│       └── Searchbar.tsx
├── hooks
│   ├── useDebounce.ts
│   └── useMutateData.ts
├── index.css
├── main.tsx
├── services
│   ├── apolloClient.ts
│   ├── mutations.ts
│   └── queries.ts
├── test
│   ├── app.test.tsx
│   └── mocks
│       └── index.ts
├── types
│   └── index.ts
└── vite-env.d.ts
```

### Services (API)  
- Through _useQuery()_ we fetch data in _App.tsx_
- Through _useMutation()_ in _useMutateData()_ we execute mutation (e.g user likes image)

### Custom Hooks
- useDebounce.ts => we delayed the API call when the user types on the serachbar
- useMutateData.ts => we handle the mutation logic (cache managing is done here)

