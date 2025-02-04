<template>
	<div class="max-w-7xl mx-auto grid grid-cols-2 gap-4">
		<div class="main-left">
			<div class="p-12 bg-white border border-grey-200 rounded-lg">
				<h1 class="mb-6 text-2xl">Sign Up</h1>

				<p class="mb-6 text-gray-500">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Nunc tristique mauris risus, eget vehicula leo sollicitudin
					eget. Sed vel bibendum magna. Aenean dolor elit, rutrum vel
					iaculis sit amet, congue.
				</p>

				<p class="font-bold">
					Already have an account?
					<RouterLink :to="{ name: 'login' }" class="underline"
						>Click here </RouterLink
					>to log in.
				</p>
			</div>
		</div>

		<div class="main-right">
			<div class="p-12 bg-white border border-grey-200 rounded-lg">
				<div class="p-12 bg-white border border-gray-200 rounded-lg">
					<form class="space-y-6" v-on:submit.prevent="submitForm">
						<div>
							<label>Name</label><br />
							<input
								v-model="form.name"
								type="text"
								placeholder="Your name"
								class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
							/>
						</div>

						<div>
							<label>E-mail</label><br />
							<input
								v-model="form.email"
								type="email"
								placeholder="Your e-mail address"
								class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
							/>
						</div>

						<div>
							<label>Password</label><br />
							<input
								v-model="form.password1"
								type="password"
								placeholder="Your password"
								class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
							/>
						</div>
						<div>
							<label>Confirm Password</label><br />
							<input
								v-model="form.password2"
								type="password"
								placeholder="Confirm password"
								class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
							/>
						</div>
						<template v-if="errors && errors.length > 0">
							<div class="bg-red-300 text-white rounded-lg p-6">
								<p v-for="error in errors" v-bind:key="error">
									{{ error }}
								</p>
							</div>
						</template>
						<div>
							<button
								class="py-4 px-6 bg-purple-600 text-white rounded-lg"
							>
								Sign Up
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { useToastStore } from "@/stores/toast";
import axios from "axios";

export default {
	setup() {
		const toastStore = useToastStore();

		return {
			toastStore,
		};
	},

	data() {
		return {
			form: {
				email: "",
				name: "",
				password1: "",
				password2: "",
			},
			errors: [],
		};
	},

	methods: {
		submitForm() {
			this.errors = [];

			if (this.form.email === "") {
				this.errors.push("You e-mail is missing.");
			}

			if (this.form.name === "") {
				this.errors.push("You name is missing.");
			}

			if (this.form.password1 === "") {
				this.errors.push("Your password is missing");
			}

			if (this.form.password1 !== this.form.password2) {
				this.errors.push("The password doesn not match");
			}

			if (this.errors.length === 0) {
				axios
					.post("/api/signup/", this.form)
					.then((response) => {
						if (response.data.message === "success") {
							this.toastStore.showToast(
								5000,
								"You have been successfully registed. PLease log in.",
								"bg-emerald-green"
							);
							this.form.email = "";
							this.form.name = "";
							this.form.password1 = "";
							this.form.password2 = "";
						} else {
							this.toastStore.showToast(
								5000,
								"Something went wrong. Please try again.",
								"bg-red-300"
							);
						}
					})
					.catch((error) => {
						console.log("error", error);
					});
			}
		},
	},
};
</script>
