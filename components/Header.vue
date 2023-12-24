<script setup>
import {usernameStore, uuidStore} from "~/store/store.js";
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="row">
        <nav class="navbar navbar-expand-lg navbar-light bg-white">
          <a class="navbar-brand mr-3" href="/">
            <img src="../static/images/logos/text.png" alt="Text Logo">
          </a>
          <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item">
                <a class="nav-link" href="/forums">
                  Forums
                </a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" role="button">
                  Stats
                </a>
                <div class="dropdown-menu">
                  <ul>
                    <li>
                      <a class="dropdown-item" href="/squads">
                        Squads
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/uhc">
                        UHC
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/practice">
                        Practice
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/bunkers">
                        Bunkers
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/staff">Staff</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/store">Store</a>
              </li>
            </ul>
            <form class="form-inline" action="/search">
              <div class="form-group" id="search_wrapper">
                <input id="search" class="form-control" name="query" type="text" placeholder="search..." aria-label="Search">
                <button class="btn" type="submit">
                  <i class="fa fa-search" aria-hidden="true"></i>
                </button>
              </div>
            </form>
<!--            TODO LOGIN SHIT!! -->
            <div class="dropdown account-dropdown" v-if="false">
              <a :href="'/u/' + usernameStore().data">
                <div class="user">
                  <div class="user-info">
                    <span class="sub-txt text-uppercase">Logged in as</span>
                    <span class="user-name">{{ usernameStore().data }}</span>
                  </div>
                  <div class="user-avatar">
                    <img :src="'https://visage.surgeplay.com/face/22/' + uuidStore().data" :alt="usernameStore().data" height="42" width="42" class="avatar-face">
                  </div>
                </div>
              </a>
            </div>
            <div style="display: flex" v-else>

              <a class="nav-link" href="/login">Login</a>
              <a class="nav-link" href="/register">Register</a>

            </div>

          </div>
        </nav>
      </div>
    </div>
  </header>
</template>
W
