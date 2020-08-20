<template>
    <div v-if="partnerClientSection">
        <div class="brand-logo-area section-space--ptb_120" id="partner">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="section-title-wrapper text-center section-space--mb_60">
                            <h2 class="section-title mb-15 wow move-up">{{ partnerClientSection.title }}</h2>
                            <span class="section-text wow move-up">{{ partnerClientSection.text }}</span>
                        </div>
                    </div>
                </div>
                <!-- brandLogo component -->
                <div class="row brand-logo-wrapper">
                    <div
                            v-for="(brand, index) in partnerClientSection.brandLogoList"
                            :key="index"
                            class="col-lg-2 col-md-3 col-sm-4 col-6 brand-logo wow move-up"
                    >
                        <div class="brand-logo__image">
                            <img :src="brand.image.data | pngSrc " class="img-fluid">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            partnerClientSection: {
                type: Object,
                default: null
            }
        },
        data() {
            return {
                sectionTitle: 'Trusted services from top-rated company',
                sectionText: 'It is about us being able to offer help with the branding campaign, product presentation, and advertisement running across social media.'
            }
        }
    }
</script>
