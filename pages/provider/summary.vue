<template>

<el-container v-if="isAuthenticated">

  <el-aside width="260px">

    <el-form :model="filters"
      status-icon ref="filters"
      label-width="240px"
      class="filtersForm"
      label-position="top"
      @submit.native.prevent="submitForm">

      <el-form-item label="Max discharges" props="max_discharges">
        <el-input v-model="filters.max_discharges"></el-input>
      </el-form-item>

      <el-form-item label="Min discharges" props="min_discharges">
        <el-input v-model="filters.min_discharges"></el-input>
      </el-form-item>

      <el-form-item label="Max average covered charges" props="max_average_covered_charges">
        <el-input v-model="filters.max_average_covered_charges"></el-input>
      </el-form-item>

      <el-form-item label="Min average covered charges" props="min_average_covered_charges">
        <el-input v-model="filters.min_average_covered_charges"></el-input>
      </el-form-item>

      <el-form-item label="Max average medicare payments" props="max_average_medicare_payments">
        <el-input v-model="filters.max_average_medicare_payments"></el-input>
      </el-form-item>

      <el-form-item label="Min average medicare payments" props="min_average_medicare_payments">
        <el-input v-model="filters.min_average_medicare_payments"></el-input>
      </el-form-item>

      <el-form-item label="State" props="state">
        <el-input v-model="filters.state"></el-input>
      </el-form-item>

      <el-form-item label="Fields" props="fields">
        <el-input v-model="filters.fields"></el-input>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="search()" icon="el-icon-search">Search</el-button>
      </el-form-item>
    </el-form>

    <br />
    <hr />
    <br />
    <el-row>
      <el-button @click="logout()">&larr; Logout</el-button>
    </el-row>


  </el-aside>
  <el-main>

    <h1 class="header">Provider Summary for the Top 100 Diagnosis Related Groups (DRG)</h1>
    <p>
      (There is a hard limit set of a few dozens of records. Pagination may be implemented in the future.)
    </p>

    <div class="resultset"  v-if="!fetching">
      <div class="cards" v-if="records.length > 0">
        <div
          v-for="(item, index) in records"
          class="card"
          :key="index">
          <div v-if="item.hasOwnProperty('providerId')"><b>Provider Id</b>{{item.providerId}}</div>
          <div v-if="item.hasOwnProperty('providerName')"><b>Provider Name</b>{{item.providerName}}</div>
          <div v-if="item.hasOwnProperty('providerCity')"><b>Provider City</b>{{item.providerCity}}</div>
          <div v-if="item.hasOwnProperty('providerState')"><b>Provider State</b>{{item.providerState}}</div>
          <div v-if="item.hasOwnProperty('providerZipCode')"><b>Provider Zip Code</b>{{item.providerZipCode}}</div>
          <div v-if="item.hasOwnProperty('hospitalReferralRegionDescription')"><b>Hospital Referral Region Description</b>{{item.hospitalReferralRegionDescription}}</div>
          <div v-if="item.hasOwnProperty('drgDefinition')"><b>DRG Definition</b>{{item.drgDefinition}}</div>
          <div v-if="item.hasOwnProperty('averageCostCharges')"><b>Average Cost Charges</b>{{item.averageCostCharges}}</div>
          <div v-if="item.hasOwnProperty('averageMedicarePayments')"><b>Average Medicare Payments</b>{{item.averageMedicarePayments}}</div>
          <div v-if="item.hasOwnProperty('averageTotalPayments')"><b>Average Total Payments</b>{{item.averageTotalPayments}}</div>
          <div v-if="item.hasOwnProperty('totalDischarges')"><b>Total Discharges</b>{{item.totalDischarges}}</div>
        </div>
      </div>
      <div v-else>There is no data with the selected criteria.</div>
    </div>

  </el-main>
</el-container>

</template>

<script lang="ts">
import { getQueryParams } from "../../utils/query";
import { Delay } from "../../utils/delay";
const query = getQueryParams();

export default {
  middleware: "authenticated",
  components: {},
  data() {
    return {
      isAuthenticated: false,
      records: [],
      filter: {},
      filters: {
        max_discharges: query["max_discharges"],
        min_discharges: query["min_discharges"],
        max_average_covered_charges: query["max_average_covered_charges"],
        min_average_covered_charges: query["min_average_covered_charges"],
        max_average_medicare_payments: query["max_average_medicare_payments"],
        min_average_medicare_payments: query["min_average_medicare_payments"],
        state: query["state"],
        fields: query["fields"]
      },
      fetching: true
    };
  },
  async created() {
    try {
      if (!this.$store.getters.isAuthenticated) {
        // Redirect to the login screen
        this.$router.push("/");
      } else {
        this.isAuthenticated = true;
      }

      await this.search();
    } catch (err) {
      console.log("ERRO Index.vue....", err);
    }
    this.free();
  },
  methods: {
    async search() {
      console.log("Searching...");
      this.busy();
      try {
        await this.$store.dispatch(
          "getProviderSummaryForTheTop100DRG",
          this.filters
        );
        this.records = this.$store.getters.providerSummaryForTheTop100DRG;

        this.$router.push({ path: this.$route.path, query: this.filters });
      } catch (err) {
        console.log("ERRO summary.vue....", err);
      }
      this.free();
    },
    async busy() {
      this.fetching = true;
    },
    async free() {
      this.fetching = false;
      console.log({ loading: this.loading });
    },
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/");
    }
  }
};
</script>

<style src="./summary.styl" lang="stylus"></style>
