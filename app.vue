<script setup lang="ts">
const res = ref();
const url = ref();
const invalid = ref(false);

const shortenedUrl = computed(() => {
  if (!res.value) return;
  return `${window.location.origin}/u/${res.value.data.uid}`;
});

const analyticsUrl = computed(() => {
  if (!res.value) return;
  return `${window.location.origin}/api/urls/${res.value.data.uid}`;
});

const handleInput = () => {
  try {
    new URL(url.value);
    invalid.value = false;
  } catch (e) {
    invalid.value = true;
  }
};

const handleEnter = async () => {
  if (invalid.value) return;

  res.value = await useFetch('/api/urls', {
    method: 'POST',
    body: JSON.stringify({ url: url.value }),
  });
};
</script>

<template>
  <div>
    <h1>My App</h1>
    <label
      >URL:
      <input @keydown.enter="handleEnter" @keydown="handleInput" v-model="url" type="text" placeholder="https://" />
      <p v-if="invalid">invalid url</p>
    </label>
    <p v-if="shortenedUrl">
      Shortened URL: <a :href="shortenedUrl" target="_blank">{{ shortenedUrl }}</a>
    </p>
    <p v-if="analyticsUrl">
      Analytics URL: <a :href="analyticsUrl" target="_blank">{{ analyticsUrl }}</a>
    </p>
  </div>
</template>
