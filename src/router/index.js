import NotFound from '../pages/elements/404'
import Dashboard from "@/pages/Dashboard";
import {getToken} from "@/utils/auth";

export const routes = [
    {
        path: '/',
        name: 'HomeBranding',
        component: () => import("../pages/HomeBranding")
    },
    {
        path: '*',
        name: 'NotFound',
        component: NotFound
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import("@/pages/LoginForm")
    },
    {
        path: "/dashboard",
        name: 'Dashboard',
        component: Dashboard,
        beforeEnter: (to, from, next) => {
            const hasToken = getToken()
            if(hasToken) {
                next()
            } else next({ name: 'Login'})
        },
        children: [
            {
                path: "",
                component: () => import("@/components/FormInput/NavbarForm")
            },
            {
                path: "/navbar-form",
                component: () => import("@/components/FormInput/NavbarForm")
            },
            {
                path: "/about-section-form",
                component: () => import("@/components/FormInput/AboutSectionForm")
            },
            {
                path: "/hero-branding-form",
                component: () => import("@/components/FormInput/HeroBrandingForm")
            },
            {
                path: "/business-section-form",
                component: () => import("@/components/FormInput/BusinessSectionForm")
            },
            {
                path: "/requirement-section-form",
                component: () => import("@/components/FormInput/RequirementSectionForm")
            },
            {
                path: "/feature-carousel-section-form",
                component: () => import("@/components/FormInput/FeatureCarouselSectionForm")
            },
            {
                path: "/progress-circle-form",
                component: () => import("@/components/FormInput/ProgressCircleForm"),
            },
            {
                path: "/pricing-section-form",
                component: () => import("@/components/FormInput/PricingSectionForm")
            },
            {
                path: "/partner-client-section-form",
                component: () => import("@/components/FormInput/PartnerClientSectionForm")
            },
            {
                path: "/newsletter-form",
                component: () => import("@/components/FormInput/NewsletterForm")
            },
            {
                path: "/footer-form",
                component: () => import("@/components/FormInput/FooterForm")
            },
            {
                path: "/style-form",
                component: () => import("@/components/FormInput/StyleForm")
            }
        ]
    },

];
