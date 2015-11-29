// Curried function.
//  middleware = makeMiddleware(store)
//  middleware(nextMiddleware)(action)


export default store => next => action => {
// export default function(store) {
//   return function(next) {
//     return function(action) {
  console.log('in middleware', action);
  return next(action);
};
