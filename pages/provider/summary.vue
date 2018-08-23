<template>
  <section>
    <!-- <div>
      <span >Logout</span>
    </div> -->

    <h1 class="header">Provider Summary for the Top 100 Diagnosis Related Groups (DRG)</h1>

    <div class="cards">
      <div
        v-if="!loading"
        v-for="(item, index) in records"
        class="card"
        :key="index">
        <div v-if="item.providerId"><b>Provider Id</b>{{item.providerId}}</div>
        <div v-if="item.name"><b>Provider Name</b>{{item.name}}</div>
        <div v-if="item.city">{{item.city}}<b>Provider City</b></div>
        <div v-if="item.state"><b>Provider State</b>{{item.state}}</div>
        <div v-if="item.zipCode"><b>Provider Zip Code</b>{{item.zipCode}}</div>
        <div v-if="item.hospitalReferralRegionDescription"><b>Hospital Referral Region Description</b>{{item.hospitalReferralRegionDescription}}</div>
        <div v-if="item.drgDefinition"><b>DRG Definition</b>{{item.drgDefinition}}</div>
        <div v-if="item.averageCostCharges"><b>Average Cost Charges</b>{{item.averageCostCharges}}</div>
        <div v-if="item.averageMedicarePayments"><b>Average Medicare Payments</b>{{item.averageMedicarePayments}}</div>
        <div v-if="item.averageTotalPayments"><b>Average Total Payments</b>{{item.averageTotalPayments}}</div>
        <div v-if="item.totalDischarges"><b>Total Discharges</b>{{item.totalDischarges}}</div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  middleware: "authenticated",
  components: {},
  data() {
    return {
      records: [],
      filters: [],
      loading: true
    };
  },
  async created() {
    this.loading = true;
    try {
      if (!this.$store.getters.isAuthenticated) {
        // @TODO Redirect to the login screen
        console.log("Unauthorized!");
      } else {
        console.log("Authorized!");
      }

      await this.$store.dispatch(
        "getProviderSummaryForTheTop100DRG",
        this.filters
      );
      this.records = this.$store.getters.providerSummaryForTheTop100DRG;
    } catch (err) {
      console.log("ERRO Index.vue....", err);
    }
    this.loading = false;
  },
  async search() {
    this.loading = true;
    try {
      this.records = await this.$store.dispatch(
        "getProviderSummaryForTheTop100DRG",
        this.filters
      );
    } catch (err) {
      console.log("ERRO summary.vue....", err);
    }
    this.loading = false;
  }
};
</script>

<style src="./summary.styl" lang="stylus" scoped></style>
