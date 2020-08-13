import HomeBranding from '../pages/HomeBranding'
import NotFound from '../pages/elements/404'
// import NavbarForm from "@/components/FormInput/NavbarForm";
import Dashboard from "@/pages/Dashboard";
import NavbarForm from "@/components/FormInput/NavbarForm";
import AboutSectionForm from "@/components/FormInput/AboutSectionForm";


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
    {
        path: "/dashboard",
        component: Dashboard,
        children: [
            {
                path: "",
                component: NavbarForm
            },{
                path: "navbar-form",
                component: NavbarForm
            },
            {
                path: "about-section-form",
                component: AboutSectionForm
            }
        ]
    },

];
