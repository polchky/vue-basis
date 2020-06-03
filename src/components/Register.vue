<template>
    <vContainer>
        <vRow justify="center">
            <vCol
                cols="12"
                md="6"
            >
                <vCard>
                    <vCardTitle>Register</vCardTitle>
                    <vCardText>
                        <vForm
                            v-model="valid"
                        >
                            <vTextField
                                v-model="email"
                                type="email"
                                label="Email"
                                :rules="emailRules"
                            />
                            <vTextField
                                v-model="username"
                                label="Username"
                                :rules="usernameRules"
                            />
                            <vTextField
                                v-model="password"
                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="showPassword ? 'text' : 'password'"
                                :rules="passwordRules"
                                label="Password"
                                hint="At least 8 characters"
                                counter
                                @click:append="showPassword = !showPassword"
                            />
                            <vBtn
                                class="mr-4"
                                :disabled="!valid"
                                :loading="loading"
                                @click="register"
                            >
                                Register
                            </vBtn>
                        </vForm>
                    </vCardText>
                    <vCardText>
                        <router-link :to="'login'">
                            Already Registered?
                        </router-link>
                    </vCardText>
                </vCard>
            </vCol>
        </vRow>
    </vContainer>
</template>

<script>
import service from '@/assets/js/service';

export default {


    data: () => ({
        valid: false,
        email: '',
        emailRules: [
            (v) => !!v || 'Email required',
            (v) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'l\'email doit être valide',
        ],
        username: '',
        usernameRules: [
            (v) => !!v || 'Username required',
        ],
        password: '',
        showPassword: false,
        passwordRules: [
            (v) => v.length >= 8 || 'At least 8 characters required',
            (v) => !!v || 'Mandatory',
        ],
        loading: false,
    }),

    created() {
    },

    methods: {
        async register() {
            this.loading = true;
            try {
                await service.auth.register({
                    email: this.email,
                    password: this.password,
                    username: this.username,
                });
                this.$emit('showMessage', 'Your account has been created. Please follow the validation link that was sent to your email address.', 'success');
                this.$router.push({ name: 'login' });
            } catch (err) {
                if (err.response.status === 409) {
                    this.$emit('showMessage', 'That email is already registered', 'error');
                } else {
                    this.$emit('showMessage', 'An unknown problem occured', 'error');
                }
            }
            this.loading = false;
        },
    },
};
</script>
