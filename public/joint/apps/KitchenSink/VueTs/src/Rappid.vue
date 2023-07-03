<template>
  <div class="joint-app joint-theme-modern" ref="app">
    <div class="app-header">
      <div class="app-title">
        <h1>JointJS+</h1>
      </div>
      <div class="toolbar-container"/>
    </div>
    <div class="app-body">
      <div class="stencil-container"/>
      <div class="paper-container"/>
      <div class="inspector-container"/>
      <div class="navigator-container"/>
    </div>
  </div>
</template>

<script lang="ts">

import { Vue, Component, Ref } from 'vue-property-decorator';

// import rappid services
import RappidService from "./services/kitchensink-service";
import {StencilService} from "./services/stencil-service";
import {ToolbarService} from "./services/toolbar-service";
import {InspectorService} from "./services/inspector-service";
import {HaloService} from "./services/halo-service";
import {KeyboardService} from "./services/keyboard-service";

import {ThemePicker} from "./components/theme-picker";
import {sampleGraphs} from './config/sample-graphs';

@Component
export default class Rappid extends Vue {
  @Ref('app') readonly app!: HTMLElement

  rappid: RappidService;

  mounted() {
    this.rappid = new RappidService(
            this.app,
            new StencilService(),
            new ToolbarService(),
            new InspectorService(),
            new HaloService(),
            new KeyboardService()
    );

    this.rappid.startRappid();

    const themePicker = new ThemePicker({ mainView: this.rappid });
    themePicker.render().$el.appendTo(document.body);

    this.rappid.graph.fromJSON(JSON.parse(sampleGraphs.emergencyProcedure));
  }
}
</script>

<style lang="scss">
  /*import rappid styles*/
  @import "~@clientio/rappid/rappid.css";
  @import "../css/style.css";
  @import "../css/theme-picker.css";

  @import "../css/style.modern.css";
  @import "../css/style.dark.css";
  @import "../css/style.material.css";
</style>
