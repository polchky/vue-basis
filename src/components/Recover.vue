<template>
    <vContainer>
        <vRow justify="center">
            <vCol
                cols="12"
                md="6"
            >
                <vCard>
                    <vCardTitle>Recover Account</vCardTitle>
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
                            <vBtn
                                class="mr-4"
                                :disabled="!valid"
                                :loading="loading"
                                @click="recover"
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
        email: '',
        emailRules: [
            (v) => !!v || 'Email required',
            (v) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'l\'email doit être valide',
        ],
        loading: false,
    }),

    created() {
    },

    methods: {
        async recover() {
            this.loading = true;
            try {
                await service.auth.recover({
                    email: this.email,
                });
                this.$emit('showMessage', 'An email has been sent. Please follow its instructions.', 'success');
                this.$router.push({ name: 'login' });
            } catch (err) {
                this.$emit('showMessage', 'An unknown problem occured.', 'error');
            }
            this.loading = false;
        },
    },
};
</script>
