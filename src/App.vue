<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>
          RCL Planner
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Menu</q-item-label>
        <q-item clickable tag="a" to="/">
          <q-item-section avatar>
            <q-icon name="app_registration" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Planner</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/price-list">
          <q-item-section avatar>
            <q-icon name="euro" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Listino</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/users">
          <q-item-section avatar>
            <q-icon name="people_alt" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Utenti</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/archive">
          <q-item-section avatar>
            <q-icon name="receipt" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Preventivi</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: 'LayoutDefault',
  data () {
      return {
        leftDrawerOpen: false
      }
  }
});
</script>