import NotFound from '../pages/elements/404'
import Dashboard from "@/pages/Dashboard";
import NavbarForm from "@/components/FormInput/NavbarForm";
// import HeroBrandingForm from "@/components/FormInput/HeroBrandingForm";
// import BusinessSectionForm from "@/components/FormInput/BusinessSectionForm";
// import FeatureCarouselSectionForm from "@/components/FormInput/FeatureCarouselSectionForm";
// import RequirementSectionForm from "@/components/FormInput/RequirementSectionForm";
// import ProgressCircleForm from "@/components/FormInput/ProgressCircleForm";
// import PricingSectionForm from "@/components/FormInput/PricingSectionForm";
//
// import PartnerClientSectionForm from "@/components/FormInput/PartnerClientSectionForm";
// import NewsletterForm from "@/components/FormInput/NewsletterForm";
// import FooterForm from "@/components/FormInput/FooterForm";
// import ProgressListForm from "@/components/FormInput/ProgressListForm";


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
        path: "/dashboard",
        component: Dashboard,
        children: [
            {
                path: "",
                component: NavbarForm
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
                component:() => import("@/components/FormInput/StyleForm")
            }
        ]
    },

];
