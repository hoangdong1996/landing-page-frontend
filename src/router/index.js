
import NotFound from '../pages/elements/404'
import Dashboard from "@/pages/Dashboard";
import NavbarForm from "@/components/FormInput/NavbarForm";
// import AboutSectionForm from "@/components/FormInput/AboutSectionForm";
// import HeroBrandingForm from "@/components/FormInput/HeroBrandingForm";
import BusinessSectionForm from "@/components/FormInput/BusinessSectionForm";
import FeatureCarouselSectionForm from "@/components/FormInput/FeatureCarouselSectionForm";
import RequirementSectionForm from "@/components/FormInput/RequirementSectionForm";
import ProgressCircleForm from "@/components/FormInput/ProgressCircleForm";
import PricingSectionForm from "@/components/FormInput/PricingSectionForm";

import PartnerClientSectionForm from "@/components/FormInput/PartnerClientSectionForm";
import NewsletterForm from "@/components/FormInput/NewsletterForm";
import FooterForm from "@/components/FormInput/FooterForm";



export const routes = [
    {
        path:'/',
        name: 'HomeBranding',
        component: () => import("../pages/HomeBranding")
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
            },
            {
                path: "/navbar-form",
                component: NavbarForm
            },
            {
                path: "/about-section-form",
                component: import(/* webpackChunkName: "about-section */ "../components/FormInput/AboutSectionForm")
            },
            {
                path: "/hero-branding-form",
                component: () => import("../components/FormInput/HeroBrandingForm")
                // component: HeroBrandingForm
            },
            {
                path:"/business-section-form",
                component: BusinessSectionForm
            },
            {
                path: "/requirement-section-form",
                component: RequirementSectionForm
            },
            {
                path: "/feature-carousel-section-form",
                component: FeatureCarouselSectionForm
            },
            {
                path: "/progress-circle-form",
                component: ProgressCircleForm
            },
            {
                path: "/pricing-section-form",
                component: PricingSectionForm
            },
            {
                path: "/partner-client-section-form",
                component: PartnerClientSectionForm
            },
            {
                path: "/newsletter-form",
                component: NewsletterForm
            },
            {
                path: "/footer-form",
                component: FooterForm
            }
        ]
    },

];
