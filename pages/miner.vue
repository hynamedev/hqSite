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
              <h1>Miner Class</h1>
            </div>
            <div class="pull-right text-muted"></div>
            <div>
              <p><strong>Summary:</strong><br>
                <br>
                Miner is a class that gives you special effects as you mine X amount of diamonds (see below).You must be in full iron armor to activate this class once activated you will recieve constant haste 2, night vision 1 and invisibilty below y 20. In miner class you can use a pickaxe with efficiency 5 to quickly mine stone. However, after you mine 125&nbsp;diamond ore you will receive haste 4&nbsp;and will be able to use efficiency 4 instead of 5.<br>
                <br>
                <strong>Diamond Ore Upgrades:</strong><br>
                <br>
                50 Diamonds = Haste 3 Upgrade<br>
                100 Diamonds = Speed 1 Upgrade<br>
                125 Diamonds = Haste 4 Upgrade<br>
                250 Diamonds = Fire Resistance Upgrade<br>
                400 Diamonds = Speed 2 Upgrade<br>
                600 Diamonds = Regeneration 1 Upgrade<br>
                1000 Diamonds = Saturation 1 Upgrade<br>
                <br>
                &nbsp;</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>