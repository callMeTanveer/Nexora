import { createRouter, createWebHistory } from "vue-router";
import SignUp from "../views/SignUp.vue";
import Login from "../views/Login.vue";
import Feed from "../views/Feed.vue";
import Messages from "../views/Messages.vue";
import Search from "../views/Search.vue"

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/signup",
			name: "signup",
			component: SignUp,
		},
		{
			path: "/login",
			name: "login",
			component: Login,
		},
		{
			path: "/feed",
			name: "feed",
			component: Feed,
		},
		{
			path: "/message",
			name: "message",
			component: Messages,
		},
		{
			path: "/search",
			name: "search",
			component: Search,
		},
	],
});

export default router;
