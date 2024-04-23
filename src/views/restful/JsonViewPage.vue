<template>
    <json-view-editor  :result="jsonResult"></json-view-editor>
</template>

<script setup>
import { ref } from 'vue';
import JsonViewEditor from '@/components/JsonViewEditor.vue';
const jsonResult = ref(null);

</script>

<style>

</style>