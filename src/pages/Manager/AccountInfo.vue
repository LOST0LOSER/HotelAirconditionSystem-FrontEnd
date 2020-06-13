<template>
  <v-container grid-list-xs>
    <v-card>
      <v-layout
        row
        wrap
        justify-center
        py-3
      >
        <h1>账号列表</h1>
      </v-layout>

      <v-layout
        row
        wrap
        justify-center
        py-3
      >
        <v-data-table
          :headers="tableHeaders"
          :items="tableDesserts"
          hide-actions
          class="mx-6 px-0 elevation-1"
          show-select
          pagination.sync="pagination"
          item-key="id"
          :items-per-page="10"
        >
          <template v-slot:item.Operation="{ }">
            <v-btn>修改</v-btn>
          </template>
          <template v-slot:header.Add="{ }">
            <v-btn
              color="primary"
              @click="newAccount.showAdd = !newAccount.showAdd"
            >
              添加
            </v-btn>
          </template>
          <template v-slot:item.Authority="{ item }">
            <v-chip
              dark
              :color="getColor(item.Authority)"
            >
              {{ item.Authority }}
            </v-chip>
          </template>
        </v-data-table>
      </v-layout>

      <transition
        v-if="newAccount.showAdd"
        name="fade"
      >
        <v-layout
          row
          wrap
          justify-center
        >
          <v-form
            ref="form"
            v-model="newAccount.valid"
            lazy-validation
          >
            <v-layout
              column
              wrap
              align-center
              my-3
            >
              <v-flex xs12>
                <v-text-field
                  v-model="newAccount.Name"
                  :counter="10"
                  label="Name"
                  required
                />
              </v-flex>

              <v-flex xs12>
                <v-select
                  v-model="newAccount.AuthorityIndex"
                  :items="newAccount.Authorities"
                  label="Authority"
                  required
                />
              </v-flex>

              <v-flex xs3>
                <v-btn
                  color="primary"
                  class="mr-4" 
                  @click="addAccount({
                    Name:newAccount.Name,
                    Authority:newAccount.Authorities[newAccount.AuthorityIndex]
                  })"
                >
                  添加
                </v-btn>
              </v-flex>
            </v-layout>
          </v-form>
        </v-layout>
      </transition>
    </v-card>
  </v-container>
</template>

<script>
import Data from "@/pages/Manager/ManagerData.js";
export default {
  data() {
    return {
      ManagerData: Data,
      tableHeaders: [
        {
          text: "姓名",
          align: "center",
          sortable: true,
          value: "Name"
        },
        {
          text: "权限",
          align: "center",
          sortable: true,
          value: "Authority"
        },
        {
          text: "操作",
          align: "center",
          sortable: true,
          value: "Operation"
        },
        {
          value: "Add"
        }
      ],
      tableDesserts: [],

      newAccount: {
        showAdd:false,
        valid: true,
        addAccountInfo: undefined,
        Name: undefined,
        AuthorityIndex: undefined,
        Authorities: ["User", "Reception", "Admin", "Manager"]
      }
    };
  },
  mounted() {
    this.setTableDesserts(this.ManagerData.AccountInfo);
  },
  methods: {
    setTableDesserts(Desserts) {
      this.tableDesserts = Desserts;
    },
    getColor(Authority) {
      if (Authority === "User") {
        return "green";
      } else if (Authority === "Reception") {
        return "primary";
      } else if (Authority === "Admin") {
        return "orange";
      } else if (Authority === "Manager") {
        return "red";
      }
    },
    addAccount: function(AccountInfo) {
      this.axios
        .post("api/addAccount", { Name: AccountInfo.Name, Authority: AccountInfo.Authority })
        .then(res => {
          if (status == 200) {
            alert("添加成功");
            let Account = { Name: Name, Authority: Authority };
            self.tableDesserts.push(Account);
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

<style>
</style>