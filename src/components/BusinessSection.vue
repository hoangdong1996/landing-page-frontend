<template>
    <div>
        <div class="feature-icon-list-area section-space--pb_120">
            <div class="container">
                <div class="section-title-wrapper text-center section-space--mb_100">
                    <h2 class="section-title mb-30">{{sectionTitle}}</h2>
                    <div class="video-button-container video-popup">
                        <silentbox-single v-bind:src="videoUrl">
                            <div class="video-play">
                                <i class="fa fa-play-circle"></i>
                                <span class="video-text">{{videoTitle}}</span>
                            </div>
                        </silentbox-single>
                    </div>
                </div>
            </div>
            <!-- feature list component -->
            <FeatureList v-bind:features="features"/>
        </div>
    </div>
</template>

<script>
    import FeatureList from './FeatureList';

    export default {
        components:{
            FeatureList
        },
        data() {
            return {
                 features: [
                    {
                        icon: require('../assets/img/icons/aeroland-branding-box-image-01-1.png'), 
                        title: 'Cross-browser Compatible Design', 
                        desc: 'Apps are built based on highly compatible design for all kinds of Internet browsers.'
                    },
                    {
                        icon: require('../assets/img/icons/aeroland-branding-box-image-02-1.png'), 
                        title: 'Highly Responsive Tools', 
                        desc: 'Apps are built based on highly compatible design for all kinds of Internet browsers.'
                    },
                    {
                        icon: require('../assets/img/icons/aeroland-branding-box-image-03-1.png'), 
                        title: 'Completely Mobile Ready', 
                        desc: 'Apps are built based on highly compatible design for all kinds of Internet browsers.'
                    },
                ],
                sectionTitle: 'Receive real-time business analytics',
                videoTitle: 'INTRO & DEMO VIDEO',
                videoUrl: 'https://www.youtube.com/watch?v=9No-FiEInLA'
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>