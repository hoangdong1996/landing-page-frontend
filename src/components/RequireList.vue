<template>
  <div class="requirements-list-area bg-gray" id="requirement">
    <div class="row align-items-center">
      <div class="col-lg-6 order-2 order-xl-1">
        <div class="requirements-list">
          <h2
            class="requirements-list__title mb-15 wow move-up"
          >{{ title }}</h2>
          <p
            class="requirements-list__text heading mb-30 wow move-up"
          >{{ desciption }}</p>
          <ul class="check-list green-check-list section-space--mb_50 wow move-up" >
            <li class="list-item" v-for="item in list" :key="item">{{ item }}</li>
          </ul>
          <!-- <ul class="check-list green-check-list section-space--mb_50 wow move-up">
                        <li class="list-item">Customer First Content-focused Displaying Effects </li>
                        <li class="list-item">High Definition Full-screen Sliders & Backgrounds</li>
                        <li class="list-item">Fast Loading, Reader Friendly Navigation Style</li>
                    </ul> -->
          <div class="tab-button wow move-up">
            <router-link to="branding" class="ht-btn ht-btn-md">Learn more</router-link>
          </div>
        </div>
      </div>
      <div class="col-lg-6 order-1 order-xl-2">
        <div class="requirements-list-image wow move-up">
          <img
            v-bind:src="srcImage"
            class="img-fluid"
            alt
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "requireList",
  data() {
    return {
      title: "Meeting all of your requirements for SEO",
      desciption: "AeroLand creates a prominent advantage for your business with strong features.",
      srcImage: "https://alohastudio.vn/wp-content/uploads/2019/08/Kinh-nghi%E1%BB%87m-%C4%91i-ch%E1%BB%A5p-%E1%BA%A3nh-c%C6%B0%E1%BB%9Bi-9.jpg",
      list: [
        "Customer First Content-focused Displaying Effects",
        "High Definition Full-screen Sliders & Backgrounds",
        "Fast Loading, Reader Friendly Navigation Style",
      ],
    };
  },
};
</script>