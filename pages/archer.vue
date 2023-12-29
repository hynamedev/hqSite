<script setup>
import Posts from "@/components/FeaturedPostsSection.vue";
import {ref} from "vue";

</script>




<template>
  <div class="container">
    <main class="main">
      <section id="content">
        <div class="terms-section">
          <div class="block">
            <div class="heading">
              <div class="bg-stretch" id="stretch-background">
                <span data-srcset="/static/images/category-bg.png, /static/images/category-bg-2x.png 2x"></span>
              </div>
              <h1>Archer Class</h1>
            </div>
            <div class="pull-right text-muted"></div>
            <div>
              <p><strong>Summary:</strong><br>
                <br>
                Archer is a class that requires you to bow your enemies with an arrow to give them Archer Tag. Archer Tag means the enemy is going to take 25% more damage for 10 seconds which is indicated by the red name tag. You must be in full leather armor to activate this class once activated you will receive constant speed 3 and resistance 1. An archer can use sugar to give themselves speed 4 for 10 seconds however, there is a 30 second cooldown. They can also give themselves jump boost 5 for 5 seconds and there is a minute cooldown for that effect.<br>
                <br>
                <strong>Effect Items:</strong><br>
                <br>
                Sugar&nbsp;| Speed 4 Activated | 30 second cooldown<br>
                <br>
                Feather | Jump boost 5 Activated | 60 second cooldown</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>