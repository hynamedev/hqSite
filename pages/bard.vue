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
              <h1>Bard Class</h1>
            </div>
            <div class="pull-right text-muted"></div>
            <div>
              <p><strong>Summary:</strong><br>
                <br>
                Bard is a class that gives potion effects to your faction members. You must be in full gold armor to activate this class once activated you will receive constant speed 2, regen 1, and resistance 2. You may give passive effects (by holding Bard Items) to your teammates without using Bard Energy. If you right click the item you are holding it will give an activated effect for 5 seconds but this requires Bard Energy. Different activated effects require different amounts of energy. You can also give effects to your enemies such as wither.<br>
                <br>
                <strong>Effect Items:</strong></p>
              <p>Sugar | Speed 2 Passive | Speed 3 Activated | 20 Energy</p>
              <p>Blaze Powder | Strength 1 Passive | Strength 2 Activated | 45 Energy</p>
              <p>Feather | Jump boost 2 Passive | Jump boost 5 | 25 Energy</p>
              <p>Ghast Tear | Regen 1 Passive | Regen 3 Activated | 40 Energy</p>
              <p>Iron Ingot | Resistance 1 Passive | Resistance 3 Activated | 30 Energy</p>
              <p>Magma Cream | Fire Res 1 Passive | Fire Res 1 Activated (30 seconds) | 20 energy</p>
              <p>Spider Eye | None | Wither 1 Activated (Withers enemy for 5 seconds) | 45 Energy&nbsp;</p>
              <p>Wheat | None | Saturation 5 Activated (Feeds your team) | 20 Energy</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>