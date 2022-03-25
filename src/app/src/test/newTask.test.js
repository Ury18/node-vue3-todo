import { mount } from "@vue/test-utils"
import { expect, test } from "vitest"
import { nextTick } from "vue"
import NewTask from "../components/NewTask.vue"

test("Check NewTask.toggleStatus is working", async() => {
    expect(NewTask).toBeTruthy()

    const wrapper = await mount(NewTask, {})
    expect(wrapper).toBeTruthy()
    expect(wrapper.vm.status).toBe("active")

    const buttons = await wrapper.findAll("button")
    await buttons[1].trigger("click")

    expect(wrapper.vm.status).toBe("completed")

})

test("Check NewTask.clearTask is working", async() => {
    expect(NewTask).toBeTruthy()

    const wrapper = await mount(NewTask, {})
    expect(wrapper).toBeTruthy()
    expect(wrapper.vm.title).toBe("")
    expect(wrapper.vm.status).toBe("active")

    await wrapper.setData({ title: "test", status: "completed" })

    expect(wrapper.vm.title).toBe("test")
    expect(wrapper.vm.status).toBe("completed")


    const buttons = await wrapper.findAll("button")
    await buttons[2].trigger("click")

    expect(wrapper.vm.title).toBe("")
    expect(wrapper.vm.status).toBe("active")
})

test("Check NewTask.submit is working", async() => {
    expect(NewTask).toBeTruthy()

    const wrapper = await mount(NewTask, {})
    expect(wrapper).toBeTruthy()
    expect(wrapper.vm.title).toBe("")
    expect(wrapper.vm.status).toBe("active")

    await wrapper.setData({ title: "test", status: "completed" })

    expect(wrapper.vm.title).toBe("test")
    expect(wrapper.vm.status).toBe("completed")


    const buttons = await wrapper.findAll("button")
    await buttons[0].trigger("click")

    setTimeout(() => {

        expect(wrapper.vm.title).toBe("")
        expect(wrapper.vm.status).toBe("active")
    }, 100)
})
