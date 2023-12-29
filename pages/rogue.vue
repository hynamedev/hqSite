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
              <h1>Rogue Class</h1>
            </div>
            <div class="pull-right text-muted"></div>
            <div>
              <p>
                <p><strong>Summary:</strong><br>
                  <br>
                  Rogue is a class that requires you to stab your enemies with a golden sword in their back to backstab them. Backstab means the enemy will receive 3.5 hearts of damage which is indicated by the slowness effect given if it was successful. You must be in full chainmail armor to activate this class once activated you will receive constant speed 3 and jump boost 2. A rogue can use sugar to give themselves speed 5 for 10 seconds however, there is a 2 minute cooldown. They can also give themselves jump boost 7 for 10 seconds and there is a 2 minute cooldown for that effect.<br>
                  <br>
                  <strong>Effect Items:</strong></p>
                <p>Sugar&nbsp;| Speed 5 Activated | 2 minute cooldown</p>
                <p>Feather | Jump boost 7 Activated | 2 minute cooldown</p>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>