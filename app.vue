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
    body: { url: url.value },
  });
};
</script>

<template>
  <div h-screen w-screen flex items-center justify-center font-sans>
    <div p-8 justify-center w-2xl text-gray-800>
      <h1 text-4 text-center text-sm uppercase font-bold text-gray-500>Input URL to Shorten and hit Enter</h1>
      <input
        autofocus
        mt-4
        block
        w-full
        rounded-md
        border-gray-300
        py-3
        text-xl
        shadow-sm
        focus:border-primary-400
        focus:ring
        focus:ring-primary-200
        focus:ring-opacity-50
        disabled:cursor-not-allowed
        disabled:bg-gray-50
        disabled:text-gray-500
        :class="{
          'border-red-300': invalid,
          'focus:border-red-300': invalid,
          'focus:ring-red-200': invalid,
        }"
        @keydown.enter="handleEnter"
        @keydown="handleInput"
        v-model="url"
        type="text"
        placeholder="https://"
      />
      <div v-if="shortenedUrl" m-2>
        <p mt-4 text-sm>
          Shortened URL: <a :href="shortenedUrl" target="_blank" text-blue-7>{{ shortenedUrl }}</a>
        </p>
        <p mt-2 text-sm>
          Analytics URL: <a :href="analyticsUrl" target="_blank" text-blue-7>{{ analyticsUrl }}</a>
        </p>
      </div>
    </div>
  </div>
</template>

<style>
@import '@unocss/reset/tailwind.css';
</style>
