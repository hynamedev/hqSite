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
    type: Number,
    required: true
  },
  link: {
    type: String,
    required: true
  }
})

const formatTimeAgo = (date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now - new Date(date)) / 1000);

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years} ${years > 1 ? 'Years' : 'Year'} Ago`;
  if (months > 0) return `${months} ${months > 1 ? 'Months' : 'Month'} Ago`;
  if (days > 0) return `${days} ${days > 1 ? 'Days' : 'Day'} Ago`;
  if (hours > 0) return `${hours} ${hours > 1 ? 'Hours' : 'Hour'} Ago`;
  if (minutes > 0) return `${minutes} ${minutes > 1 ? 'Minutes' : 'Minute'} Ago`;
  return 'Just Now';
};
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
          {{ formatTimeAgo(props.postDate) }}
        </div>
      </div>
      <div class="post-body">
        <p v-html="props.content"></p>
      </div>
      <div class="btn-holder">
        <a :href="'/forums/' + props.link + '/'" class="btn">
          Read more...
        </a>
      </div>
    </div>
  </div>
</template>