<template lang="pug">
br
br
br

#accountSetting 
    .infoBox
        .infoTitle Account Settings

        hr

        .infoValue(style='margin-bottom:0;')
            .smallTitle Email
            template(v-if="modifyMode")
                form.editValue(@submit.prevent="changeEmail" style='margin-bottom:12px;')
                    input.big(type="email" ref='emailInp' spellcheck="false" :value="inputEmail" @input="(e) => {e.target.setCustomValidity('');inputEmail = e.target.value;}" placeholder="your@email.com" required)

                    template(v-if="updatingValue")
                        img.loading(src="@/assets/img/loading.png")
                    label.material-symbols-outlined.save(v-else) done
                        input(type="submit" hidden)
                    span.material-symbols-outlined.cancel(@click="modifyMode = false;") close

            div(v-else style='margin-bottom:12px;')
                .ellipsis {{ user.email }}&nbsp;
                span.editHandle(@click="editEmail") [CHANGE]

            div(v-if="user.email_verified")
                Checkbox(v-model="emailSubscribed" :disabled="!user.email_verified || subing_email || emailSubscribed === null") Receive newsletters from Skapi.
            .iconClick(v-else style="color:var(--caution-color);display:inline-flex" @click="proceedVerification = true;")
                .material-symbols-outlined.fill(style='font-size:24px;') error
                span &nbsp;Click to verify your email address

        br

        .state(style='margin-bottom:2rem;')
            .smallTitle Password 
            .ellipsis ******...&nbsp;
            router-link.editHandle(to='/change-password') [CHANGE]

        hr

        div(style="text-align:right")
            router-link.iconClick(to='/delete-account' style='color:var(--caution-color);font-size:0.66rem;')
                .material-symbols-outlined.fill(style='font-size:24px;') cancel
                span &nbsp;Delete Account

Modal(:open="proceedVerification")
    h4(style='margin:.5em 0 0;') Email Verification
    hr

    div(style='font-size:.8rem;')
        p.
            Would you like to verify your email address?
            #[br]
            The verification code will be sent to #[b {{ user.email }}]
    br
    div(style='justify-content:space-between;display:flex;align-items:center;min-height:44px;')
        template(v-if='sendingEmail')
            img.loading(src="@/assets/img/loading.png")
        template(v-else)
            button.noLine(@click="proceedVerification = false") Cancel
            button.final(@click="sendEmail") Proceed

</template>

<script setup lang="ts">
import { skapi } from '@/code/admin';
import { user, updateUser, emailSubscribed } from '@/code/user';
import router from '@/router';
import { computed, ref, nextTick, watch } from 'vue';
import Modal from '@/components/modal.vue';
import Checkbox from '@/components/checkbox.vue';
let modifyMode = ref(false);
let updatingValue = ref(false);
let inputEmail = '';
let sendingEmail = ref(false);
let emailInp = ref();
let subing_email = ref(false);
let editEmail = () => {
    inputEmail = user.email;
    modifyMode.value = true;
    nextTick(() => {
        emailInp.value.focus();
    });
}
let sendEmail = async () => {
    sendingEmail.value = true;
    try {
        await skapi.verifyEmail();
        router.push('/verification');
    } catch (err) {
        window.alert(err.message);
    }
    finally {
        proceedVerification.value = false
    }
}
let changeEmail = async () => {
    updatingValue.value = true;
    try {
        await skapi.updateProfile({
            email: inputEmail
        });
        updatingValue.value = false;
        modifyMode.value = false;
        updateUser();
    }
    catch (err) {
        updatingValue.value = false;
        nextTick(() => {
            emailInp.value.focus();
            emailInp.value.setCustomValidity(err.message);
            emailInp.value.reportValidity();
        });
    }
}

let proceedVerification = ref(false);

watch(emailSubscribed, async (n, o) => {
    if(o === null) return;

    subing_email.value = true
    if (n) {
        await skapi.subscribeNewsletter({
            group: 'authorized'
        });
    }
    else {
        await skapi.unsubscribeNewsletter({
            group: 'authorized'
        });
    }
    subing_email.value = false
})
</script>

<style scoped lang="less">
#accountSetting {
    position: relative;
    padding: 8px;
}

.infoBox {
    max-width: 600px;
    margin: 0 auto;
}
</style>