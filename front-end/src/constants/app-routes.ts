export const app_routes = {

    private: {

        home: {
            name: "/home"
        },
        market: {
            name: "/market"
        }
    },
    public: {

        login:"/", 
        register:"/register" 
    }
}

export const checkPublicRoute = (asPath: string) => {

    const appPublicRoutes = Object.values(app_routes.public)

    return appPublicRoutes.includes(asPath)
}