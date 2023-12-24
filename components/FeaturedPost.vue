<script setup>
const props = defineProps({
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

<template>
  <div class="post-holder">
    <div class="post-item">
      <div class="post-header">
        <div class="title">
          <a :href="props.link">
            <h2>{{ props.title }}</h2>
          </a>
          <span class="author">
            <a :href="'u/' + props.author">{{ props.author }}</a>
																										</span>
          <time :datetime="props.postDate" data-format="ago" data-toggle="tooltip"></time>
        </div>
      </div>
      <div class="post-body">
        <p>
          {{ props.content }}
        </p>
      </div>
      <div class="btn-holder">
        <a :href="'/forums/' + props.link + '/'" class="btn">
          <b>Read more...</b>
        </a>
      </div>
    </div>
  </div>
</template>