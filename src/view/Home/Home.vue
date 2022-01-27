<template>
    <div class="Home">
        <div class="title" @click="$router.push('/blog')">zys8119@张云山</div>
        <AnimationTime></AnimationTime>
    </div>
</template>

<script setup lang="ts">
import AnimationTime from "./AnimationTime.vue"

</script>

<style scoped lang="less">
.Home {
    .title{
        position: fixed;
        left: 50%;
        top: 15%;
        transform: translate(-50%, -15%);
        color: #fff;
        font-weight: bold;
        font-size: 50px;
        font-size: size(50);
        z-index: 1;
        box-shadow: 0 0 5px #ffffff;
        padding: 30px 40px;
        cursor: pointer;
        transition: all ease-in-out 0.3s;
        user-select: none;
        &:hover{
            background-color: rgba(255,255,255,0.3);
            transform: translate(-50%, -15%) scale(1.2);
        }
    }
}
</style>
