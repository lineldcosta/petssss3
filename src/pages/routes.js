"use strict";
/*
const route = {
        childRoutes: [ {
          path: '/',
          component: require('./index').default,
          getIndexRoute(partialNextState, cb) {
            require.ensure([], (require) => {
                cb(null, {
                  component: require('./home').default
                })
            })
          },
          childRoutes: [{
              path: '/mylist',
              getComponents(nextState, cb) {
                require.ensure([], (require) => {
                  cb(null, require('./listing').default);
                })
              }
            },
            {
              path: '*',
              getComponents(nextState, cb) {
                require.ensure([], (require) => {
                  cb(null, require('./../components/notfound').default);
                })
              }
            }
          ]
        }
      ]
    }

export default route;

*/
const routes = (
  <Route path="/" component={App}>
    <Route path="about" component={About} />
    <Route path="users" component={Users}>
      <Route path="/user/:userId" component={User} />
    </Route>
    <Route path="*" component={NoMatch} />
  </Route>
)
 
export default routes