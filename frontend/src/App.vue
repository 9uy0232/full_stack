<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar style="padding: 1rem;" >
        <q-toolbar-title>
          <q-avatar style="margin-right: 1rem;" >
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          FULL STACK
        </q-toolbar-title>

        <q-tabs align="left">
        <q-route-tab to="/tasks" label="task" />
      </q-tabs>
      </q-toolbar>
    </q-header>
    
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-primary text-white">
      <q-toolbar style="padding: 1rem;" >
        <q-toolbar-title>
          <div>Footer</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
  
</template>

