<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f8f8f8;
  color: #262626;
}

.wave-bg {
  background: linear-gradient(135deg, #003d7f 0%, #003d7f 100%);
  position: relative;
  overflow: hidden;
}

.wave-bg::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"><path d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z" fill="white" opacity="0.1"/></svg>')
    repeat-x;
  background-size: 600px 100px;
}

.circle-decoration {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
}

.circle-lg {
  width: 400px;
  height: 400px;
}

.circle-md {
  width: 200px;
  height: 200px;
}

.circle-sm {
  width: 100px;
  height: 100px;
}
</style>
