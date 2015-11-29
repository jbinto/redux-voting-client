// Curried function.
//  middleware = makeMiddleware(store)
//  middleware(nextMiddleware)(action)


export default socket => store => next => action => {
// export default function(store) {
//   return function(next) {
//     return function(action) {
  console.log('in middleware', action);
  if (action.meta && action.meta.remote) {
    socket.emit('action', action);
  }
  return next(action);
};
