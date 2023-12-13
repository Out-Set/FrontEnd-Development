<template>
    <div>
        <div class="modal" tabindex="-1" role="dialog" style="display: block; background: none;">
            <div class="modal-dialog" role="document">
                <div class="customSpinner">
                    <div class="modal-header">
                        <h6 class="modal-title">Loading</h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SpinnerComponent',
}
</script>

<style scoped>
.customSpinner {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 20%;
    margin-left: 43%;
    color: var(--bs-modal-color);
    pointer-events: auto;
    background-color: var(--bs-modal-bg);
    background-clip: padding-box;
    border: var(--bs-modal-border-width) solid var(--bs-modal-border-color);
    border-radius: var(--bs-modal-border-radius);
    outline: 0;
}
</style>