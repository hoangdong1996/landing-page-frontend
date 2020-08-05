import HomeBranding from '../pages/HomeBranding'

import NotFound from '../pages/elements/404'

export const routes = [
    {
        path:'/',
        name: 'HomeBranding',
        component: HomeBranding
    },
    {
        path:'*',
        name: 'NotFound',
        component: NotFound
    },
];