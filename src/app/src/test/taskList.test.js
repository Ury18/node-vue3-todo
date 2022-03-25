import { mount } from "@vue/test-utils"
import { expect, test, vi } from "vitest"
import TaskList from "../components/TaskList.vue"

const mockTasks = [{
        title: "Test1",
        status: "active",
        id: "invent1"
    },
    {
        title: "Test2",
        status: "completed",
        id: "invent2"
    },
    {
        title: "Test3",
        status: "completed",
        id: "invent3"
    }
]

test("Check TaskList.setFilter is working", async() => {
    expect(TaskList).toBeTruthy()

    const wrapper = await mount(TaskList, {
        props: {
            tasks: mockTasks
        }
    })

    expect(typeof wrapper.vm.filteredTasks.length).toBe("number")
    expect(wrapper.vm.filteredTasks.length).toBe(3)
    const buttons = await wrapper.findAll(".filters.desktop button")

    await buttons[1].trigger("click")

    expect(typeof wrapper.vm.filteredTasks.length).toBe("number")
    expect(wrapper.vm.filteredTasks.length).toBe(1)

    await buttons[2].trigger("click")

    expect(typeof wrapper.vm.filteredTasks.length).toBe("number")
    expect(wrapper.vm.filteredTasks.length).toBe(2)

    await buttons[0].trigger("click")

    expect(typeof wrapper.vm.filteredTasks.length).toBe("number")
    expect(wrapper.vm.filteredTasks.length).toBe(3)

})
