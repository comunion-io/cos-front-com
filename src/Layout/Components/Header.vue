<template>
    <div :class="headerbg" class="app-header header-shadow">
        <div class="logo-src"/>
        <div class="app-header__content">
            <div class="app-header-left">
                <!--<SearchBox/>-->
                <MegaMenu/>
            </div>
            <div class="app-header-right">
                <!-- create startup -->
                <div class="page-title-actions">
                    <button type="button" class="btn-shadow d-inline-flex align-items-center btn btn-success">
                        <font-awesome-icon class="mr-2" icon="plus"/>
                        New Startup
                    </button>
                </div>

                <div class="user-info">
                    <HeaderConnect v-if="getAuth()" />
                    <UserArea v-else />
                </div>

            </div>
        </div>
    </div>
</template>

<script>

    // import SearchBox from './Header/SearchBox';
    import MegaMenu from './Header/MegaMenu';
    // import HeaderDots from './Header/HeaderDots';
    import UserArea from './Header/HeaderUserArea';
    import HeaderConnect from './Header/HeaderConnect';

    import {library} from '@fortawesome/fontawesome-svg-core'
    import {
        faEllipsisV,
    } from '@fortawesome/free-solid-svg-icons'
    import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

    library.add(
        faEllipsisV,
    );
    export default {
        name: "Header",
        components: {
            // SearchBox,
            MegaMenu,
            // HeaderDots,
            UserArea,
            HeaderConnect,
            'font-awesome-icon': FontAwesomeIcon,
        },

        data() {
            return {
                isOpen: false,
                isOpenMobileMenu: false,
            }
        },
        props: {
            headerbg: String,

        },
        methods: {

            /**
             * @description 判断登录情况， 未登录， 显示create account， 登陆了显示UserArea
             * @returns {boolean}
             */
            getAuth() {
                return true;
            }
        }
    };
</script>
