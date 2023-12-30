<template>
  <div class="pagination">
    <v-btn 
      @click="prevPage" 
      isabled="currentPage === 1"
      rounded="xl"
      size="x-small"
      :class="currentPage === 1 ? 'disabled-class mr-3':'mr-3 active-btn' "
      flat
      :ripple="false"
      icon="mdi-arrow-left-thick"
    ></v-btn>
      <span>{{ currentPage }} / {{ totalPages }}</span>
    <v-btn 
      @click="nextPage" 
      isabled="currentPage === totalPages"
      rounded="xl"
      size="x-small"
      :class="currentPage === totalPages ? 'disabled-class ml-3':'ml-3 active-btn' "
      flat
      :ripple="false"
      icon="mdi-arrow-right-thick"
    ></v-btn>
  </div>
</template>
  
<script>
export default {
  props: {
    currentPage: Number,
    totalPages: Number,
    prevPage: Function,
    nextPage: Function,
  },
}
</script>
  
<style scoped>
.pagination {
  padding-top: 1%;
  padding-right: 3%;
}

.disabled-class {
  opacity: 0.26 !important;
}
.active-btn {
  color: #004cc5;
}
.active-btn:hover {
  background-color: inherit;
  color: #004cc5;
}
.v-btn--disabled{
  background-color: inherit !important;
}

.disabled-class {
  opacity: 0.26 !important;
}
.active-btn:hover {
  background-color: inherit;
}
</style>