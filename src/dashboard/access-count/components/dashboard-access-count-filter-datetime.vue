<template>
  <div class="dashboard-access-count-filter-datetime">
    <div class="label">
      <button class="button basic" @click="onClickLabelButton">最近：</button>
    </div>
    <div class="fields">
      <CheckboxField
        class="compact"
        :useIcon="false"
        v-for="{ text, value } in dateTimeRangeFields"
        :key="value"
        :value="value"
        :text="text"
        name="datetime"
        type="radio"
        v-model="accessCountDateTimeRange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import store from '../../../app/app.store';
import CheckboxField from '../../../app/components/checkbox-field.vue';

const dateTimeRangeFields = ref([
  {
    value: '1-day',
    text: '一天',
  },
  {
    value: '7-day',
    text: '一周',
  },
  {
    value: '1-month',
    text: '一月',
  },
  {
    value: '3-month',
    text: '一季',
  },
]);

const dateTimeRange = computed(
  () => store.getters['dashboard/accessCount/dateTimeRange'],
);

const accessCountDateTimeRange = computed({
  get() {
    return dateTimeRange.value;
  },
  set(value) {
    store.commit('dashboard/accessCount/setDateTimeRange', value);
  },
});

const onClickLabelButton = () => {
  store.commit('dashboard/accessCount/setDateTimeRange', '1-day');
};
</script>

<style scoped>
@import './styles/dashboard-access-count-filter-datetime.css';
</style>
