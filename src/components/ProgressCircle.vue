<template>
  <div class="row">
    <div class="col-md-6" v-for="(progress, index) in fearureListProgress" :key="index">
      <div class="feature-list-progress section-space--pt_60">
        <div class="feature-list-progress__counter">
          <div class="circle-progress-wrapper">
            <div class="chart-progress">
              <div class="chart-progress__inner-wrapper">
                <div class="chart-progress__inner " v-bind:class="progress.class2">
                  <vue-circle
                    :progress="progress.progress"
                    :size="160"
                    line-cap="round"
                    :fill="progress.fill"
                    :thickness="4"
                    :start-angle="0"
                    :show-percent="true"
                  ></vue-circle>
                </div>
              </div>
            </div>
            <div class="circle-design one" v-bind:class="progress.class"></div>
            <div class="circle-design two"  v-bind:class="progress.class"></div>
          </div>
        </div>
        <div class="feature-list-progress__info">
          <h6 class="feature-list-progress__title mb-20">{{progress.title}}</h6>
          <ul
            class="feature-list-progress__list"
            v-for="(list) in progress.listProgress"
            :key="list"
          >
            <li>{{list}}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- <div class="col-md-6">
      <div class="feature-list-progress section-space--pt_60">
        <div class="feature-list-progress__counter">
          <div class="circle-progress-wrapper">
            <div class="chart-progress">
              <div class="chart-progress__inner-wrapper">
                <div class="chart-progress__inner">
                  <vue-circle
                    :progress="fearureListProgress.progress[0]"
                    :size="160"
                    line-cap="round"
                    :fill="fill"
                    :thickness="4"
                    :start-angle="0"
                    :show-percent="true"
                  ></vue-circle>
                </div>
              </div>
            </div>
            <div class="circle-design one"></div>
            <div class="circle-design two"></div>
          </div>
        </div>
        <div class="feature-list-progress__info">
          <h6 class="feature-list-progress__title mb-20">{{fearureListProgress.title[0]}}</h6>
          <ul class="feature-list-progress__list">
            <li>Keyword rank tracking</li>
            <li>Website audit</li>
            <li>Marketing, SEO</li>
            <li>Social Media</li>
            <li>Social Media</li>
            <li>On-page SEO Audit</li>
          </ul>
        </div>
      </div>
    </div>-->
    <!-- <div class="col-md-6">
      <div class="feature-list-progress section-space--pt_60">
        <div class="feature-list-progress__counter">
          <div class="circle-progress-wrapper">
            <div class="chart-progress">
              <div class="chart-progress__inner-wrapper">
                <div class="chart-progress__inner chart-progress__inner--blue">
                  <vue-circle
                    :progress="fearureListProgress.progress[1]"
                    :size="160"
                    line-cap="round"
                    :fill="blue"
                    :thickness="4"
                    :start-angle="0"
                    :show-percent="true"
                  ></vue-circle>
                </div>
              </div>
            </div>
            <div class="circle-design circle-design--blue one"></div>
            <div class="circle-design circle-design--blue two"></div>
          </div>
        </div>
        <div class="feature-list-progress__info">
          <h6 class="feature-list-progress__title mb-20">{{fearureListProgress.title[1]}}</h6>
          <ul class="feature-list-progress__list">
            <li>Digital Marketing</li>
            <li>Website audit</li>
            <li>Marketing, SEO</li>
            <li>Social Media</li>
            <li>Social Media</li>
            <li>On-page SEO Audit</li>
          </ul>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>
import VueCircle from "vue2-circle-progress/src/index.vue";

export default {
  components: {
    VueCircle,
  },
  data() {
    return {
      fearureListProgress: [
        {
          progress: 80,
          title: "Digital Marketing",
          fill: { gradient: ["#fad961", "#f76b1c"] },
          class: "",
          class2: "",
          listProgress: [
            "Digital Marketing",
            "Website audit",
            "Marketing, SEO",
            "Social Media",
            "On-page  Audit",
            "On-page SEO Audit",
          ],
        },
        {
          progress: 90,
          title: "Digital Marketing",
          blue: { gradient: ["#9C7AF2", "#5E61E7"] },
          class: "circle-design--blue",
          class2: "chart-progress__inner--blue",
          listProgress: [
            "Digital Marketing",
            "Website audit",
            "Marketing, SEO",
            "Social Media",
            "On-SEO Audit",
            "On-page SEO ",
          ],
        },
      ],
    };
  },
};
</script>