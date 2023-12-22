<script setup>
import Posts from "@/components/FeaturedPostsSection.vue";
import {ref} from "vue";

let posts = ref([]);
let onlinePlayers = ref(1)
function getPosts() {
  posts = ref([{title: "a", content: "a", link: "a", postDate: 0, author: "tt"},
    {
      title: "b",
      content: "b",
      link: "ac",
      postDate: 0,
      author: "tt"
    }]);
}
</script>


<style scoped>
@import "../static/css/style.css";
@import "../static/css/bootstrap.css";
@import "../static/css/font-awesome.css";
@import "../static/css/fonts.css";
@import "../static/css/schedule.css";

</style>


<template>
  <div class="container">
  <main class="main">
    <div class="login">
      <div class="container">
        <div class="row">
          <div class="col-md-6 offset-md-3">
            <section id="content">
              <div class="login-holder">
                <p>
                  Enter the email address you registered with
                </p>
                <form method="post">
                  <p>
                    <input type="text" name="email" placeholder="Email" required>
                  </p>
                  <button type="submit" class="btn btn-primary btn-block">Reset</button>
                  <input type="hidden" name="csrfmiddlewaretoken" value="hH7oWfqf6CIvCesgRgPCcSn3OaNjZ5mWNHdBulT4UiM6M5FV7Q9VtqkSAQOG8tyU">
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>
</template>