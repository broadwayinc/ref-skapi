<template lang="pug">
div.dummy(:style='{height:navHeight+"px"}')
nav#navBar(ref="navBar")
    .wrap
        .left
            router-link.logo(to="/my-services" v-if="route.name != 'home' && loginState && route.path !== '/my-services'")
                .material-symbols-outlined.nohover.back(style="font-size:32px") arrow_back_ios
                span.name My Services
            router-link.logo(to="/" v-else)
                img.symbol(src="@/assets/img/logo/symbol-logo-white.png" style="image-orientation: none;")
                span Skapi
        .right
            ul
                template(v-if="loginState")
                    li(v-if="route.name == 'home'" style="margin-left:1rem")
                        router-link(to="/my-services") My Services
                    li(v-else="route.name != 'home'")
                        a.doc(href="https://docs.skapi.com" target="_blank") Documentation

                    li
                        .prof(@click.stop="(e)=>{showDropDown(e)}")
                            .material-symbols-outlined.fill(style="margin: 0 .5rem 0 1rem;font-size:32px;") account_circle
                            .moreVert.profile(ref="moreVert" @click.stop style="--moreVert-right:0;display:none")
                                .inner(style="padding:0")
                                    .account {{ user.email }}
                                    ul.menu
                                        li(@click="openBillingPage")
                                            .material-symbols-outlined.fill credit_card
                                            span Billing
                                        li(@click="navigateToPage")
                                            .material-symbols-outlined.fill settings
                                            span Account Settings
                                        li(@click="logout")
                                            .material-symbols-outlined.fill logout
                                            span Logout
                                    .policy
                                        router-link(to="/pp.html" target="_blank") Terms of service • Privacy policy
                template(v-else)
                    li
                        router-link.ser(to="/login") Login
                    li
                        router-link.sign(to="/signup") Sign-up

#proceeding(v-if="running")
    .inner    
        img.loading(src="@/assets/img/loading.png")
        br
        br
        h4 Page Loading
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { skapi } from '@/code/admin';
import { loginState, user, updateUser, customer } from '@/code/user';
import { showDropDown } from '@/assets/js/event.js'

const router = useRouter();
const route = useRoute();

console.log(route.path.split('/')[1])
let navBar = ref(null);
let moreVert = ref(null);
let running = ref(false);

let openBillingPage = async() => {
    running.value = true;

    let resolvedCustomer = await customer;

    skapi.clientSecretRequest({
        clientSecretName: 'stripe_test',
        url: `https://api.stripe.com/v1/billing_portal/sessions`,
        method: 'POST',
        headers: {
            Authorization: 'Bearer $CLIENT_SECRET',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
            customer: resolvedCustomer.id,
            return_url: window.location.origin + route.path
        }
    }).then(response => {
        window.location = response.url;
        // running.value = false;
    });
}

let navigateToPage = () => {
    moreVert.value.style.display = 'none';
    router.push({ path: '/account-setting' });
}

let logout = () => {
    skapi.logout().then(() => {
        updateUser();
        router.push({ path: '/login' });
    })
}

let navHeight = ref(0);
onMounted(() => {
    navHeight.value = parseFloat(window.getComputedStyle(navBar.value).height);
})
</script>

<style lang="less" scoped>
#proceeding {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255,255,255,0.5);
    z-index: 9999999;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    text-align: center;

    .loading {
        width: 2rem;
        height: 2rem;
        filter: grayscale(1);
    }
    h4 {
        color: #fff;
    }
}

#navBar {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99999;
    width: 100%;
    padding: 12px 6px 12px 20px;
    display: flex;
    align-items: center;
    background-color: #262626;
    font-size: 18px;
    color: #fff;
    justify-content: center;

    .wrap {
        width: 100%;
        max-width: 1600px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .left {
            flex-shrink: 0;
            display: inline-block;
            vertical-align: middle;

            .logo {
                display: block;
                text-decoration: none;

                * {
                    vertical-align: middle;
                }

                img {
                    height: 32px;
                    margin-right: 10px;
                }

                span {
                    font-weight: bold;
                }
            }
        }

        .right {
            display: inline-block;
            vertical-align: middle;
            flex-grow: 1;
            font-weight: bold;

            ul {
                position: relative;
                text-align: right;
                margin: 0;
                padding: 0;
                white-space: nowrap;
                
                li {
                    display: inline-block;
                    vertical-align: middle;
                    list-style: none;
                    user-select: none;
                    cursor: pointer;
                }
            }

            .ser {
                padding: 0 1.4rem;
            }

            .sign {
                color: #fff;
                display: block;
                position: relative;
                padding: 0 1.4rem;
                text-decoration: none;
                font-size: 0.8rem;
                font-weight: 700;

                &::before {
                    content: '';
                    display: inline-block;
                    position: absolute;
                    left: 0;
                    top: -11px;
                    z-index: -1;
                    width: 100%;
                    height: 100%;
                    padding: 11px 0;
                    border-radius: 8px;
                    background: var(--main-color);
                }

                &:active {
                    &::before {
                        box-shadow: 0 0 0 2px #A5AFFF inset;
                    }
                }
            }
        }

        @media all and (pointer: fine) {
            .prof:hover {
                &>.material-symbols-outlined:first-child {
                    box-shadow: inset 0px 0px 0 4px rgba(255, 255, 255, 0.5);
                    border-radius: 50%;
                }
            }
        }

        .profile {
            text-align: left;
            color: #000;
            font-size: 16px;
            font-weight: normal;
            user-select: none;

            .account {
                padding: 14px 20px;
                border-bottom: 1px solid rgba(0, 0, 0, .15);
            }

            ul {
                display: block;
                text-align: left;
                padding: 10px 20px;
                color: var(--main-color);

                li {
                    display: block;
                    padding: 8px 0;

                    span {
                        font-weight: 500;
                    }

                    &:hover {
                        span {
                            text-decoration: underline;
                        }
                    }
                }

                .material-symbols-outlined {
                    font-size: 24px;
                    color: var(--main-color);
                    margin-right: 8px;
                }
            }

            .policy {
                border-top: 1px solid rgba(0, 0, 0, .15);
                font-size: 14px;
                font-weight: bold;
                text-align: center;
                padding: 12px 30px;
                white-space: nowrap;

                a {
                    color: var(--black-4);
                    font-weight: 300;
                }
            }
        }

        a:not(.policy a) {
            color: #fff;
        }
    }
}
</style>