<script setup>
import config from "~/siteConfig.js";

defineProps({
  cb: {
    type: Boolean,
    default: true
  }
})

</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="shiny-border footer-banner">
        <a href="https://www.cheatbreaker.com/" target="_blank">
          <div class="banner-info">
            <div class="banner-logo">
              <img src="/static/images/logos/client.png" alt="Cheat Breaker">
            </div>
            <div class="banner-txt">
              <h2>CheatBreaker</h2>
              <p>The <span>free</span> client-side anticheat for Minecraft</p>
            </div>
          </div>
          <div class="btn-holder">
            <button class="btn btn-white">
              <i class="fa fa-download"></i>
              <span>Download the client</span>
            </button>
          </div>
        </a>
      </div>
      <div class="row">
        <div class="col-md-6">

          <ul class="social">
            <li><a href="https://twitter.com/MineHQ"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
            <li><a href="https://discord.gg/MineHQ"><img src="/static/images/discord.svg" alt="discord"></a>
            </li>
          </ul>
        </div>
        <div class="col-md-6">
          <div class="footer-right">
            <a href="https://www.minehq.com/">
              <img src="/static/images/logos/footer-logo.png" alt="footer logo" class="footer-logo">
            </a>
            <div class="copyright">
              <a href="https://www.frozenorb.net/">
                Copyright © 2018 FrozenOrb LLC.
              </a>
            </div>
            <nav class="footer-nav">
              <ul>
                <li><a href="https://www.minehq.com/terms">Terms &amp; Conditions</a></li>
                <li><a href="https://www.minehq.com/privacy">Privacy Policy</a></li>
                <li><a href="https://www.minehq.com/rules">Rules</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </footer>
  <div class="modal fade" id="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div id="modal-content" class="modal-content">
      </div>
    </div>
  </div>
</template>