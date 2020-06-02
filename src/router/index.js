import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import About from "../views/About.vue";
import Home from "../views/Home.vue";
import Message from "../views/Message.vue";
import News from "../views/News.vue";
import MessageDatil from "../views/MessageDatil.vue";
import NewsDatil from "../views/NewsDatil.vue";

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/home",
      component: Home,
      children: [
        {
          path: "/home/message",
          component: Message,
          children: [
            {
              path: "/home/message/info:msgId",
              component: MessageDatil,
              // props: true
              props(route) {
                return {
                  msgId: route.params.msgId,
                  msgContent: route.query.msgContent,
                };
              },
              name: "msgInfo",
            },
          ],
        },
        {
          path: "/home/news",
          component: News,
          children: [
            {
              path: "/home/news/info:newsId",
              component: NewsDatil,
              props(route) {
                return {
                  newsId: route.params.newsId,
                  newsContent: route.query.newsContent,
                };
              },
              name: "newInfo",
            },
          ],
        },
        {
          path: "/home",
          redirect: "/home/message",
        },
      ],
    },
    {
      path: "/about",
      component: About,
    },
    {
      path: "/",
      redirect: "/home",
    },
  ],
});
