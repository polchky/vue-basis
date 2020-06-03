<template>
    <vContainer>
        <vRow justify="center">
            <vCol cols="6">
                <vCard>
                    <vCardTitle>Enter a new password</vCardTitle>
                    <vCardText>
                        <vForm
                            v-model="valid"
                        >
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
                            <vTextField
                                v-model="confirmationPassword"
                                :append-icon="showConfirmationPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="showConfirmationPassword ? 'text' : 'password'"
                                :rules="[confirmationPasswordRule]"
                                label="Confirm Password"
                                counter
                                @click:append="showConfirmationPassword = !showConfirmationPassword"
                            />
                            <vBtn
                                class="mr-4"
                                :disabled="!valid"
                                :loading="loading"
                                @click="reset"
                            >
                                Send
                            </vBtn>
                        </vForm>
                    </vCardText>
                    <vCardText>
                        <router-link :to="'login'">
                            Back
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
        password: '',
        showPassword: false,
        passwordRules: [
            (v) => v.length >= 8 || 'At least 8 characters',
            (v) => !!v || 'Required',
        ],
        confirmationPassword: '',
        showConfirmationPassword: false,
        loading: false,
    }),

    computed: {
        confirmationPasswordRule() {
            return this.confirmationPassword === this.password || 'Passwords do not match';
        },
    },

    created() {
    },

    methods: {
        async reset() {
            this.loading = true;
            try {
                await service.auth.reset({
                    password: this.password,
                },
                this.$route.query.token);
                this.$emit('showMessage', 'Your password was successfully changed.', 'success');
                this.$router.push({ name: 'login' });
            } catch (err) {
                this.$emit('showMessage', 'An unknown error occured', 'error');
            }
            this.loading = false;
        },
    },
};
</script>
