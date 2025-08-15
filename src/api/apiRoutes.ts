const apiRoutes = {
    user: {
        login: `/api/v1/user/sign-in`,
        register: `/api/v1/user/create-user`,
        logout: `/api/v1/user/logout`,
        refreshToken: `/auth/refresh`,
        profile: `/api/v1/user/get-profile`,
        updateProfile: `/user/update`,
        list: `/user/list`,
    },
    posts: {
        create: `/posts`,
        getAll: `/posts`,
        getById: (id: string) => `/posts/${id}`,
        delete: (id: string) => `/posts/${id}`,
    },
};

export default apiRoutes;