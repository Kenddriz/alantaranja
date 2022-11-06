<template>
  <q-page padding class="flex justify-center items-center">
    <div style="max-width: 900px" class="flex justify-around q-gutter-md">
      <router-link
        v-for="(m, index) in menu"
        :key="index"
        :to="m.to"
        :class="`card ${m.to.split('/')[2]}`">
        <div class="overlay"></div>
        <div class="circle">
          <q-icon color="white" size="md" class="icon" :name="m.icon" />
        </div>
        <p>{{ $t(m.title)}}</p>
      </router-link>
    </div>
  </q-page>

</template>

<script lang="ts" setup>
  import {ROUTES_DATA} from 'layouts/routes-data';

  const menu = ROUTES_DATA.admin;
</script>

<style lang="scss" scoped>
  .dashboard {
    --bg-color: #8d6e63;
    --bg-color-light: #F2C037;
    --text-color-hover: white;
    --box-shadow-color: rgba(255, 215, 97, 0.48);
  }

  .profile {
    --bg-color: #ffab00;
    --bg-color-light: #ffcc80;
    --text-color-hover: white;
    --box-shadow-color: rgba(255, 215, 97, 0.48);
  }

  .categories {
    --bg-color: #8d6e63;;
    --bg-color-light: #F2C037;
    --text-color-hover: white;
    --box-shadow-color: rgba(184, 249, 211, 0.48);
  }

  .documents {
    --bg-color: #ff8f00;
    --bg-color-light: #ffcc80;
    --text-color-hover: white;
    --box-shadow-color: rgba(206, 178, 252, 0.48);
  }

  .users {
    --bg-color: #8d6e63;
    --bg-color-light: #F2C037;
    --text-color-hover: white;
    --box-shadow-color: rgba(220, 233, 255, 0.48);
  }

  .payments {
    --bg-color: #ffab00;
    --bg-color-light: #ffcc80;
    --text-color-hover: white;
    --box-shadow-color: rgba(184, 249, 211, 0.48);
  }

  .card {
    width: 220px;
    height: 300px;
    background: #fff;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    transition: all 0.3s ease-out;
    text-decoration: none;
  }

  .card:hover {
    transform: translateY(-5px) scale(1.005) translateZ(0);
    box-shadow: 0 24px 36px rgba(0,0,0,0.11),
    0 24px 46px var(--box-shadow-color);
  }

  .card:hover .overlay {
    transform: scale(4) translateZ(0);
  }

  .card:hover .circle {
    border-color: var(--bg-color-light);
    background: var(--bg-color);
  }

  .card:hover .circle:after {
    background: var(--bg-color-light);
  }

  .card:hover p {
    color: var(--text-color-hover);
  }

  .card:active {
    transform: scale(1) translateZ(0);
    box-shadow: 0 15px 24px rgba(0,0,0,0.11),
    0 15px 24px var(--box-shadow-color);
  }

  .card p {
    font-size: 17px;
    color: #4C5656;
    margin-top: 30px;
    z-index: 1000;
    transition: color 0.3s ease-out;
  }

  .circle {
    width: 131px;
    height: 131px;
    border-radius: 50%;
    background: #fff;
    border: 2px solid var(--bg-color);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
    transition: all 0.3s ease-out;
  }

  .circle:after {
    content: "";
    width: 115px;
    height: 115px;
    display: block;
    position: absolute;
    background: var(--bg-color);
    border-radius: 50%;
    top: 7px;
    left: 7px;
    transition: opacity 0.3s ease-out;
  }

  .circle .icon {
    z-index: 10000;
    transform: translateZ(0);
  }

  .overlay {
    width: 118px;
    position: absolute;
    height: 118px;
    border-radius: 50%;
    background: var(--bg-color);
    top: 70px;
    left: 50px;
    z-index: 0;
    transition: transform 0.3s ease-out;
  }
</style>
