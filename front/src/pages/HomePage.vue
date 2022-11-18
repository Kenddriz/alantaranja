<template>
  <q-layout view="hhh lpR fff">

    <q-header :style="`height: 90vh; background: url('/home.jpeg') no-repeat;background-size: cover;`">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar color="white">
            <img src="/collecting.svg">
          </q-avatar>
          ALANTARANJA
        </q-toolbar-title>

        <q-space />

        <q-btn
          to="/auth/register"
          unelevated
          icon-right="person_add"
          :label="$t('user.register')" />

        <q-btn
          to="/auth/login"
          unelevated
          icon-right="login"
          :label="$t('user.login')" />
      </q-toolbar>
      <div class="fit flex justify-between items-center q-pa-md">
        <div style="max-width: 600px">
          <h3 class="q-mb-sm text-capitalize">We rank the best course on the web</h3>
          <div class="q-mb-lg">
            <!--ALANTARANJA est une plateforme de partage de nombreux documents.
            Le site a été developpé dans un seul but de vous faciliter à trouver d'un document
            que vous n'imaginez même pas l'existance. Avec la participation des personnes
            diplômées dans differents domaines, vous serez satisfait d'avoir choisi notre site.-->
            ALANTARANJA is a platform for sharing many documents.
            The site has been developed for the sole purpose of making it easier for you to find a document that you do not even imagine exists.
            With the participation of graduates in different fields, you will be satisfied to have chosen our site.
          </div>
          <q-input dark outlined>
            <template v-slot:after>
              <q-btn
                color="white"
                outline
                class="fit"
                unelevated
                :label="$t('search')" />
            </template>
          </q-input>
        </div>
      </div>
    </q-header>

    <q-page-container>
      <!--<router-view />-->
      <q-page padding>
        <!--Expandable list-->
        <Questions />

        <HomeCollaborators />

      </q-page>
    </q-page-container>

    <q-footer class="bg-dark q-pa-md q-gutter-y-md">
      <div class="row q-gutter-y-md">
        <div class="col-12 col-md-8 flex items-center">
          <q-avatar size="150px" color="white">
            <img src="/collecting.svg" />
          </q-avatar>

          <q-list dense>
            <q-item-label>Links</q-item-label>
            <q-item>
              <q-item to="/auth/login">
                <q-item-section avatar>
                  <q-icon name="login" />
                </q-item-section>
                <q-item-section>{{ $t('user.login') }}</q-item-section>
              </q-item>
            </q-item>
            <q-item>
              <q-item to="/auth/register">
                <q-item-section avatar>
                  <q-icon name="person_add" />
                </q-item-section>
                <q-item-section>{{ $t('user.register') }}</q-item-section>
              </q-item>
            </q-item>
            <q-item>
              <q-item to="/welcome">
                <q-item-section avatar>
                  <q-icon name="thumb_up" />
                </q-item-section>
                <q-item-section>{{ $t('paths.welcome') }}</q-item-section>
              </q-item>
            </q-item>
          </q-list>
        </div>

        <q-form class="q-gutter-y-md col-12 col-md-4">
          <span>
            Get in touch
            <div class="text-h6">Drop as a line</div>
          </span>
          <q-input dark outlined :label="$t('topic.subject')" />
          <q-input dark outlined type="textarea" />
          <div class="flex justify-end">
            <q-btn
              :label="$t('submit')"
              outline
              color="white" />
          </div>
        </q-form>
      </div>
      <div class="text-center">Copyright - {{ new Date().getFullYear() }}</div>
    </q-footer>

  </q-layout>
</template>
<script lang="ts" setup>
import Questions from "components/home/HomeQuestions.vue";
import HomeCollaborators from "components/home/HomeCollaborators.vue";

</script>

<style lang="scss" scoped>
  .q-tab {
    .text-center {
      padding: unset;
      text-align: left!important;
      background: red!important;
    }
  }
</style>
