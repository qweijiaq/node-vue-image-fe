<template>
  <div class="dashboard-access-count-panel chart large">
    <div class="header">
      {{ chartPanelTitle }}
    </div>
    <div class="media">
      <canvas width="400" height="260" ref="canvasRef"></canvas>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, watch, ref, onMounted } from 'vue';
import store from '../../../app/app.store';
import Chart from 'chart.js';

// 访问量
const accessCount = computed(
  () => store.getters['dashboard/accessCount/accessCount'],
);

const dateTimeRange = computed(
  () => store.getters['dashboard/accessCount/dateTimeRange'],
);

// 当前的 action
const currentAction = computed(
  () => store.getters['dashboard/accessCount/currentAction'],
);

// 统计图标题
const chartPanelTitle = computed(() =>
  accessCount.value ? `${accessCount.value.title}统计图` : '统计图',
);

//
const submitGetAccessCountByAction = async () => {
  try {
    await store.dispatch('dashboard/accessCount/getAccessCountByAction', {
      action: currentAction.value,
      dateTimeRange: dateTimeRange.value,
    });
  } catch (error) {
    store.dispatch('notification/pushMessage', {
      content: error.data.message,
    });
  }
};

submitGetAccessCountByAction();

watch(
  () => [dateTimeRange.value, currentAction.value],
  () => submitGetAccessCountByAction(),
);

const canvasRef = ref(null);

const accessCountChart = ref(null);

const createChart = () => {
  const context = canvasRef.value;
  const type = 'line';

  const data = {
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
      },
    ],
  };

  const options = {
    legend: {
      display: false,
    },

    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  accessCountChart.value = new Chart(context, { type, data, options });
};

const updateChart = () => {
  const [labels, values] = accessCount.value.dataset;
  accessCountChart.value.data.labels = labels;
  accessCountChart.value.data.datasets[0].data = values;
  accessCountChart.value.update();
};
onMounted(() => {
  createChart();
});

watch(
  () => accessCount.value,
  () => {
    updateChart();
  },
);
</script>

<style scoped>
@import './styles/dashboard-access-count-panel-chart.css';
</style>
