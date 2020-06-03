<template>
    <vContainer>
        <vRow justify="center">
            <vCol
                cols="12"
                sm="6"
            >
                <vCard>
                    <vCardTitle>Profil</vCardTitle>
                    <vCardText>
                        <vForm
                            v-model="valid"
                        >
                            <vTextField
                                v-model="username"
                                label="Display Name"
                                :rules="usernameRules"
                            />
                            <vBtn
                                class="mr-4"
                                :disabled="!valid"
                                :loading="loading"
                                @click="update"
                            >
                                Update
                            </vBtn>
                            <vBtn
                                class="mr-4"
                                to="/"
                            >
                                Back
                            </vBtn>
                        </vForm>
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
        valid: true,
        username: '',
        usernameRules: [
            (v) => !!v || 'Username required',
        ],
        loading: false,
    }),

    async created() {
        if (!service.auth.isLoggedIn()) this.$router.push({ name: 'login' });
        const res = await service.users.get(service.auth.getUserId());
        this.username = res.data.username;
    },

    methods: {
        async update() {
            this.loading = true;
            try {
                const userId = service.auth.getUserId();
                await service.users.update(userId, { username: this.username });
                this.$emit('showMessage', 'Profile updated.', 'success');
                this.$router.push({ name: 'home' });
            } catch (err) {
                if (service.auth.isLoggedIn()) {
                    this.$emit('showMessage', 'An unknows error happened.', 'error');
                } else {
                    this.$emit('showMessage', 'Your session expired, please login.', 'error');
                    this.$router.push({ name: 'login' });
                }
            }
            this.loading = false;
        },
    },

};
</script>
