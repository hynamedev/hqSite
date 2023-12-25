<script setup>
const props = defineProps({
  forum: {
    type: Object,
    required: true
  },
  topPosts: {
    type: Array,
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
  <div class="container">
    <main class="main">
      <section id="content">
        <div class="forum">
          <div class="forum-tools">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="/forums">
                  <i class="fa fa-home"></i>
                  Forums
                </a>
              </li>
              <li class="breadcrumb-item">
                <a :href="'/forums/' + props.forum._id">
                  {{ props.forum.displayName }}
                </a>
              </li>
            </ol>
            <div class="btn-holder">
              <div class="btn-group">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown">
                  Hot
                </button>
                <div class="dropdown-menu">
                  <a :href="'/forums/' +  + props.forum._id" class="dropdown-item">
                    Hot
                  </a>
                  <a :href="'/forums/'  + props.forum._id + '/top'" class="dropdown-item">
                    Top
                  </a>
                  <a :href="'/forums/'  + props.forum._id + '/new'" class="dropdown-item">
                    New
                  </a>
                </div>
              </div>
              <a :href="'/forums/new/official-events'  + props.forum._id" class="btn btn-success">
                New Post
              </a>
            </div>
          </div>
          <table class="table thread-list">
            <thead>
            <tr>
              <th colspan="2">
                <h3>
                  {{ props.forum.displayName }}
                </h3>
              </th>
              <th>Replies</th>
              <th>Last Reply</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="post in props.topPosts">
              <td>
              <span class="upvotes ">
              {{ post.upDoots }}
              </span>
              </td>
              <td>
                <h3>
                  <a :href="'/forums/' + post._id" class="break-word">
                    {{ post.title }}
                  </a>
                </h3>
                <div>
                  By
                  <a :href="'/u/' + post.author.name">
                    <span class="name-color-platform-admin">
                    {{ post.author.name }}
                    </span>
                  </a>
                  {{ formatTimeAgo(post.postDate) }}
                </div>
              </td>
              <td>
                {{ post.replies.length }}
              </td>
              <td>
                N/A
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>