<template>
  <div>
    <MyBlog v-for="blog in blogs" :key="blog.id" :title="blog.title"></MyBlog>
  </div>
</template>

<script type="text/ecmascript-6">
import MyBlog from "./components/MyBlog.vue";
export default {
  components: {
    MyBlog
  },
  data() {
    return {
      blogs: [
        { id: 1, title: "blogOne" },
        { id: 2, title: "blogTwo" },
        { id: 3, title: "blogThree" }
      ]
    };
  }
};
</script>

<style scoped>
</style>
