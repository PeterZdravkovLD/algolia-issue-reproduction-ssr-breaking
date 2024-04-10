Problem description:

When providing any cache object to useInfiniteHits, Error: "Too many re-renders" appears instead of providing the expected caching functionality. If commented out, all works normally.

Relevant code can be found in app/Search.tsx :46

The required outcome is to be given an example of a sample working solution that utilizes the cache object to allow users to navigate between pages and have previously loaded pages from infiniteHits be loaded, instead of just the page in the uiState. Or to provide an export from react-instantsearch of such working implementation