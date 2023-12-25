<script setup>
import {rankInfoStore} from "~/store/store.js";

const props = defineProps({
  post: {
    type: Object,
    required: true
  },
  forum: {
    type: Object,
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
                <a :href="'/' + forum._id">
                  {{ forum.displayName }}
                </a>
              </li>
              <li class="breadcrumb-item">
                <a :href="props.post.id">
                  {{ props.post.title }}
                </a>
              </li>
            </ol>
          </div>
          <div class="block">
            <div class="forum-post">
              <div class="forum-post-avatar">
                <a :href="'/u/' + props.post.author.name" class="circle-avatar">
                  <img :src="'https://visage.surgeplay.com/bust/124/' + props.post.author.uuid + '.png'" :alt="props.post.author.name" height="80" width="80" style="object-fit: contain;" class="avatar-half">
                </a>
              </div>
              <div class="forum-post-body">
                <h3 class="forum-post-title break-word">
                  {{ props.post.title }}
                  <a class="upvotes ">
                    <i class="fa fa-arrow-up"></i>
                    <span class="count">{{ props.post.upDoots }}</span>
                  </a>
                </h3>
                <div>
                </div>
                <div class="forum-post-info">
                  {{ formatTimeAgo(props.post.postDate) }}

                  by
                  <a :href="'/u/' + props.post.author.name">
                    <span :class="'font-weight-bold' + (rankInfoStore().data.id === 'default' ? '' : ' name-color-' + rankInfoStore().data.id)">
                    {{ props.post.author.name }}
                    </span>
                  </a>
                  <div v-if="props.post.edited">
                    Last edited {{ formatTimeAgo(props.post.editedDate) }}
                  </div>
                </div>
                <div class="forum-post-content break-word" v-html="props.post.content">

                </div>
                <div class="forum-post-controls">
                </div>
                <form id="delete-form-114598" class="collapse" method="post" :action="'/forums/delete/' + props.post.id">
                  <input type="hidden" name="csrfmiddlewaretoken" value="ykHrFulZ9nOy66ztzoBzcPlehujEPARY4kNEdAOOX3S9gXM8PYVStni33ak1YY3W">
                  <div>
                    Are you sure?
                  </div>
                  <button type="submit" class="btn btn-danger">
                    Yes, delete it
                  </button>
                  <button type="button" class="btn btn-primary" data-toggle="collapse" data-target="#delete-form-114598">
                    No
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div id="forum-replies" class="block">
            Please <a href="/login">login</a> to reply to this thread.
            <hr>
            <div id="reply-children-114598">
              <div class="forum-reply" v-for="reply in props.post.replies">
                <div class="forum-reply-gutter">
                  <div>
                    <a :href="'/u/' + reply.author.name">
                      <img :src="'https://minotar.net/avatar/' + reply.author.uuid + '/24'" :alt="reply.author.name" height="24" width="24" class="avatar-face">
                    </a>
                  </div>
                  <div class="indent-line"></div>
                </div>
                <div class="forum-reply-body">
                  <div class="forum-reply-info">
                    <a :href="'/u/' + reply.author.name">
                      <span class="font-weight-bold ">
                      {{ reply.author.name }}
                      </span>
                    </a>
                    <time datetime="1560362814863" data-format="ago" data-toggle="tooltip"></time>
                    <a class="upvotes ">
                      <i class="fa fa-arrow-up"></i>
                      <span class="count">{{ reply.upDoots }}</span>
                    </a>
                    <div v-if="reply.edited">
                      Edited {{ formatTimeAgo(reply.editedDate) }}
                    </div>
                  </div>
                  <div class="forum-reply-content break-word" v-html="reply.content"></div>
                  <div class="forum-reply-controls"></div>
                  <form id="reply-form-114683" method="post" action="https://www.lunar.gg/forums/reply" class="forum-reply-form collapse">
                    <div class="forum-reply-form-alert"></div>
                    <input type="hidden" name="parent" value="114683">
                    <div>
                      <textarea name="content" class="form-control" required=""></textarea>
                    </div>
                    <button type="submit" class="btn btn-success">Reply</button>
                  </form>
                  <form id="delete-form-114683" class="collapse" method="post" action="https://www.lunar.gg/forums/delete/114683">
                    <input type="hidden" name="csrfmiddlewaretoken" value="ykHrFulZ9nOy66ztzoBzcPlehujEPARY4kNEdAOOX3S9gXM8PYVStni33ak1YY3W">
                    <div>
                      Are you sure?
                    </div>
                    <button type="submit" class="btn btn-danger">
                      Yes, delete it
                    </button>
                    <button type="button" class="btn btn-primary" data-toggle="collapse" data-target="#delete-form-114683">
                      No
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>