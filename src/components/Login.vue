<template>
    <vContainer>
        <vRow justify="center">
            <vCol
                cols="12"
                md="6"
            >
                <vCard>
                    <vCardTitle>Connexion</vCardTitle>
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
                                type="button"
                                class="mr-4"
                                :disabled="!valid"
                                :loading="loading"
                                @click="login"
                            >
                                Login
                            </vBtn>
                        </vForm>
                    </vCardText>
                    <vCardText>
                        <router-link :to="'register'">
                            Register
                        </router-link>
                    </vCardText>
                    <vCardText>
                        <router-link :to="'recover'">
                            Forgot Password?
                        </router-link>
                    </vCardText>
                </vCard>
            </vCol>
        </vRow>
    </vContainer>
</template>

<script>
import utils from '@/assets/js/utils';
import service from '@/assets/js/service';

export default {


    data: () => ({
        utils,
        valid: false,
        email: '',
        emailRules: [
            (v) => !!v || 'Email is required',
            (v) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'l\'email doit être valide',
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
        async login() {
            this.loading = true;
            try {
                await service.auth.login({
                    email: this.email,
                    password: this.password,
                });
                this.$emit('login');
                this.$router.push({ name: 'bookings' });
            } catch (err) {
                this.$emit('showMessage', 'Login Error', 'error');
            }
            this.loading = false;
        },
    },
};
</script>
