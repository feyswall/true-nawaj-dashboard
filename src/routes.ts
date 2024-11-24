const routers: Record<string, string> = {
    signin: '/auth/signin',
    dashboard: '/',
    riders: "/riders",
    configApi: "/api/getRemotes",

    updateConfigApi: "/api/updateRemotes",
    
    // rider: ((id: string) => `/riders/single/${id}`),
}

export default routers;
