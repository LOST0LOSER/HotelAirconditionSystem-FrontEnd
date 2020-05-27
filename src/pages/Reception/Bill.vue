<template>
  <v-container fluid>
    <v-layout row wrap justify-center>
      <h1>账单</h1>
    </v-layout>

    <v-row align="center">
      <v-col cols="2" md="4"></v-col>
      <v-col class="d-flex" md="4">
        <v-select :items="SignInRoom" v-model="value" label="Room" outlined dense class="mt-3"></v-select>
      </v-col>
      <v-col cols="2" md="4">
        <v-btn color="primary" class="mb-4">查询</v-btn>
      </v-col>
    </v-row>
    <v-row algin="center">
      <v-col cols="2" md="3"></v-col>
      <v-col>
        <v-card class="mx-auto elevation-8" max-width="1000" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-tile avatar class="headline mb-8">
                账单
              </v-list-item-tile>
              <v-list-item-subtitle>
                {{this.cost}}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-data-table
            headers="headers"
            items="items"
            hide-actions
            class="elevation-1"
            select-all
            pagination.sync="pagination"
            item-key="id"
            loading="true"
            search="search"
          >
          </v-data-table>
        
        </v-card>
      </v-col>
      <v-col cols="2" md="3"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import Data from "@/pages/Reception/RoomData";
export default {
  data: () => ({
    RoomData: Data,
    SignInRoom:[],
  }),
  created(){
    this.getSignInRoom();
  },
  methods: {
    getSignInRoom(){
      for (let Room of this.RoomData){
        if(Room.RoomSignInState === true){
          this.SignInRoom.push(Room.RoomID)
        }
      } 
    }
  }
};
</script>

<style>
</style>