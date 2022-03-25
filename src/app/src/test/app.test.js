import { mount } from "@vue/test-utils"
import { expect, test } from "vitest"
import App from "../App.vue"

test("Check App.fetchTasks is working", async() => {
    expect(App).toBeTruthy()

    const wrapper = await mount(App, {})
    expect(wrapper).toBeTruthy()

    await wrapper.vm.fetchTasks()

    expect(wrapper).toBeTruthy()
    expect(typeof wrapper.vm.tasks.length).toBe("number")
    expect(wrapper.vm.tasks.length).greaterThan(0)
})
