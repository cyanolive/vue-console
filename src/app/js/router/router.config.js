import NotFoundView from '_components/not-found.vue'

/*login view*/
import LoginView from '_components/login/login.vue'

/*home view*/
import HomeView from '_components/home/home.vue'
export function configRouter(router) {

    // normal routes
    router.map({
        '/': {
            component: LoginView
        },

        '/login': {
            component: LoginView
        },

        '/home': {
            component: HomeView,
            subRoutes: {

            }
        },

        // not found handler
        '*': {
            component: NotFoundView
        },
    })

    // redirect
    // router.redirect({
    //   '/': '/home'
    // })

    // global before
    // 3 options:
    // 1. return a boolean
    // 2. return a Promise that resolves to a boolean
    // 3. call transition.next() or transition.abort()
    /*router.beforeEach((transition) => {
     if (transition.to.path === '/forbidden') {
     router.app.authenticating = true
     setTimeout(() => {
     router.app.authenticating = false
     alert('this route is forbidden by a global before hook')
     transition.abort()
     }, 3000)
     } else {
     transition.next()
     }
     })*/

    router.beforeEach(function () {
        window.scrollTo(0, 0)
    })

}