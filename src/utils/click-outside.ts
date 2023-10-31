import type { Directive } from 'vue'

declare global {
    interface HTMLElement {
        clickOutsideEvent?: (event: Event) => void
    }
}

const directive: Directive = {
    beforeMount: function (el: HTMLElement, binding) {
        el.clickOutsideEvent = function (event: Event) {
            if (!(el == event.target || el.contains(event.target as Node))) {
                binding.value(event)
            }
        };
        document.body.addEventListener('click', el.clickOutsideEvent)
    },
    unmounted: function (el: HTMLElement) {
        document.body.removeEventListener('click', el.clickOutsideEvent!)
    }
}

export default directive
