<template>
  <div>
    <v-container grid-list-xs>
      <v-layout row wrap justify-center mt-10 mb-10>
        <!-- <v-card>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-tile avatar class="headline mb-8">酒店空调系统</v-list-item-tile>
            </v-list-item-content>
          </v-list-item>
        </v-card> -->
        <blockquote class="display-3">酒店空调系统</blockquote>
      </v-layout>
      <v-spacer></v-spacer>
      <v-row>
        <v-col v-for="Entry of Entries" :key="Entry.id" cols="6" md="3">
          <v-card class="elevation-8">
            <v-layout row wrap justify-center>
              <div>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title avatar class="headline mb-8">{{Entry.Name}}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </div>
            </v-layout>
            <v-divider></v-divider>
            <v-card-actions>
              <v-layout row wrap justify-center>
                <v-btn color="primary" :to="Entry.Link">
                  <v-icon>mdi-login-variant</v-icon>
                </v-btn>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    Entries: [
      {
        Name: "住户入口",
        Link: "/UserLogin"
      },
      {
        Name: "前台入口",
        Link: "/ReceptionLogin"
      },
      {
        Name: "管理员入口",
        Link: "/AdminLogin"
      },
      {
        Name: "经理入口",
        Link: "/ManagerLogin"
      }
    ]
  })
};
</script>

<style>
</style>