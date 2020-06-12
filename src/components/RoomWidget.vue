<template>
  <v-container align-center justify-center>
    <v-layout row wrap align-center justify-center>
      <v-flex lg12 sm6>
        <v-card class="elevation-8">
          <v-card-text>
            <span>房间号{{ RoomNum }}</span>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "RoomWidget",
  props: {
    RoomNum: String
  },
  data: () => ({}),
  methods: {}
};
</script>

<style>
.block {
  margin-top: 4rem;
}
</style>
