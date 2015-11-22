* Dispatch actions from React components
  * Prevent user from voting twice for same pair
  * Create client-side VOTE Redux action
  * Prevent VOTE from setting entry not currently under vote, using `votedFor`
  * Remove `votedFor` when vote advances to next pair. `resetVote`
  * Update mapStateToProps with `votedFor`
  * Define Redux "Action Creators", refactor out object literals
  * Use `react-redux` `connect` function with action creators
* Send actions to the server using Redux middleware
  * Send `VOTE` action to server
  * Create a "remote action middleware" (store => next => action => ...)
  * Just log for now
  * Use `applyMiddleware` to load our middleware, and create store with that
  * Curry the socket into `applyMiddleware` so it can access it
  * Emit `action` event from middleware
  * Prevent `SET_STATE` infinite loop by including `remote:true` metadata
* Exercises
