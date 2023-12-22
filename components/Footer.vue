<script setup>
defineProps({
  cb: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="shiny-border footer-banner" v-if="cb">
        <a href="https://cheatbreaker.com">
          <div class="banner-info">
            <div class="banner-logo">
              <img src="../static/images/logos/client.png" width="64" height="58" alt="CheatBreaker Logo">
            </div>
            <div class="banner-txt">
              <h2>CheatBreaker</h2>
              <p>The <span>free</span> client-side anticheat for Minecraft</p>
            </div>
          </div>
          <div class="btn-holder">
            <button class="btn btn-white">
              <i class="fa fa-download"></i>
              <span>Download The Client</span>
            </button>
          </div>
        </a>
      </div>
      <div class="row">
        <div class="col-md-6">
          <ul class="social">
            <li>
              <a href="https://twitter.com/minehq">
                <i class="fa fa-twitter" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a href="https://discordapp.com/invite/Pm2Zx7Y">
                <img src="../static/images/discord.svg" alt="discord">
              </a>
            </li>
          </ul>
        </div>
        <div class="col-md-6">
          <div class="footer-right">
            <a href="/public">
              <img src="../static/images/logos/footer-logo.png" alt="footer logo" class="footer-logo">
            </a>
            <div class="copyright">
              <a href="https://www.frozenorb.net/">
                Copyright &copy; 2018 FrozenOrb LLC
              </a>
            </div>
            <nav class="footer-nav">
              <ul>
                <li>
                  <a href="/terms">Terms & Conditions</a>
                </li>
                <li>
                  <a href="/privacy">Privacy Policy</a>
                </li>
                <li>
                  <a href="/rules">Rules</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>