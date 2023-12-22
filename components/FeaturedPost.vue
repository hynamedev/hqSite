<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  postDate: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
})
</script>


<style scoped>
@import "../static/css/style.css";
@import "../static/css/bootstrap.css";
@import "../static/css/font-awesome.css";
@import "../static/css/fonts.css";
@import "../static/css/schedule.css";

</style>


<template>
  <div class="post-holder">
    <div class="post-item">
      <div class="post-header">
        <div class="title">
          <a href="{{link}}">
            <h2>{{ title }}</h2>
          </a>
          <span class="author">
            <a href="u/{{author}}">{{author}}</a>
																										</span>
          <time datetime="{{postDate}}" data-format="ago" data-toggle="tooltip"></time>
        </div>
      </div>
      <div class="post-body">
        <p>
          {{ content }}
        </p>
      </div>
      <div class="btn-holder">
        <a href="/forums/{{link}}/" class="btn">
          <b>Read more...</b>
        </a>
      </div>
    </div>
  </div>
</template>