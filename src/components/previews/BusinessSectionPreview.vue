<template>
    <div>
        <div class="feature-icon-list-area section-space--pb_120">
            <div class="container">
                <div class="section-title-wrapper text-center section-space--mb_100">
                    <h2 class="section-title mb-30">{{ businessSection.section_title }}</h2>
                    <div class="video-button-container video-popup">
                        <silentbox-single :src="businessSection.video_url">
                            <div class="video-play">
                                <i class="fa fa-play-circle"/>
                                <span class="video-text">{{ businessSection.video_title }}</span>
                            </div>
                        </silentbox-single>
                    </div>
                </div>
            </div>
            <!-- feature list component -->
            <div class="feature-icon-list">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="feature-icon-list__media wow move-up">
                            <img :src="businessSection.image.data | pngSrc" class="img-fluid" alt>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="feature-icon-list__content">
                            <div class="feature-icon-list-wrapper">
                                <div
                                        v-for="feature in businessSection.businessFeatureList"
                                        :key="feature.id"
                                        class="single-feature-icon wow move-up"
                                >
                                    <div class="single-feature-icon__media">
                                        <img :src="feature.image.data | pngSrc" class="img-fluid" alt>
                                    </div>
                                    <div class="single-feature-icon__content">
                                        <h6 class="title">{{ feature.title }}</h6>
                                        <div class="text">{{ feature.description }}</div>
                                    </div>
                                </div>
                            </div>
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
            businessSection: {
                type: Object,
                default: null,
                required: true,
            },
        },
    }
</script>

<style lang="scss" scoped>
</style>
