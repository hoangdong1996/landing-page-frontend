<template>
    <div>
        <div class="feature-icon-list-area section-space--pb_120">
            <div class="container">
                <div class="section-title-wrapper text-center section-space--mb_100">
                    <h2 class="section-title mb-30 style-business-title">{{ businessSection.section_title }}</h2>
                    <div class="video-button-container video-popup">
                        <silentbox-single :src="businessSection.video_url">
                            <div class="video-play">
                                <i class="fa fa-play-circle"/>
                                <span class="video-text style-business-video-title">{{ businessSection.video_title }}</span>
                            </div>
                        </silentbox-single>
                    </div>
                </div>
            </div>
            <!-- feature list component -->
            <div class="feature-icon-list">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="feature-icon-list__media wow move-up style-business-image">
                            <img v-if="businessSection.image.data" v-lazy="businessSection.image.data" class="img-fluid" alt>
                            <img v-else v-lazy="businessSection.image.id" class="img-fluid" alt>
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
                                    <div class="single-feature-icon__media style-feature-image">
                                        <img v-if="feature.image.data" :src="feature.image.data" class="img-fluid" alt>
                                        <img v-else v-lazy="feature.image.id" class="img-fluid" alt>
                                    </div>
                                    <div class="single-feature-icon__content">
                                        <h6 class="title style-feature-title">{{ feature.title }}</h6>
                                        <div class="text style-feature-description">{{ feature.description }}</div>
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
