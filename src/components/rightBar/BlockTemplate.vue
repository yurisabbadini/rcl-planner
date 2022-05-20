<template>
    <table v-if="value?.includes('50x50')" style="border-collapse: collapse">
        <tr>
            <td></td>
            <td style="font-size: 10px;text-align: center;">50</td>
            <td></td>
        </tr>
        <tr>
            <td style="font-size: 10px;text-align: center;">50</td>
            <td style="border: 1px solid black;padding:4px;font-size:12px">
                <span style="visibility:hidden;line-height: 40px">xx</span>
                <span style="line-height: 40px">{{ value?.split("_")[1] || "H" }}</span>
                <span style="visibility:hidden;line-height: 40px">xx</span>
            </td>
            <td><span class="q-ml-md">{{ label || '' }}</span></td>
        </tr>
    </table>
    <table v-if="value?.includes('25x50')" style="border-collapse: collapse">
        <tr>
            <td></td>
            <td style="font-size: 10px;text-align:center">50</td>
            <td></td>
        </tr>
        <tr>
            <td style="font-size: 10px">25</td>
            <td style="border: 1px solid black;padding:4px;font-size:12px;text-align: center;"><span style="visibility:hidden">xx</span>{{ value?.split("_")[1] || "H" }}<span style="visibility:hidden">xx</span></td>
            <td><span class="q-ml-md">{{ label || '' }}</span></td>
        </tr>
    </table>
    <table v-if="value?.includes('50x25')" style="border-collapse: collapse">
        <tr>
            <td></td>
            <td style="font-size: 10px;text-align:center;border-bottom:1px solid black">25</td>
            <td></td>
        </tr>
        <tr>
            <td style="font-size: 10px">50</td>
            <td style="border: 1px solid black;padding:4px;font-size:12px;text-align: center;"><span style="line-height: 40px">{{ value?.split("_")[1] || "H" }}</span></td>
            <td><span class="q-ml-md">{{ label || '' }}</span></td>
        </tr>
    </table>
    <table v-if="value?.includes('25x25')" style="border-collapse: collapse">
        <tr>
            <td></td>
            <td style="font-size: 10px;text-align: center;">25</td>
            <td></td>
        </tr>
        <tr>
            <td style="font-size: 10px;">25</td>
            <td style="border: 1px solid black;padding:4px;font-size:12px">{{ value?.split("_")[1] || "H" }}</td>
            <td><span class="q-ml-md">{{ label || '' }}</span></td>
        </tr>
    </table>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'BlockTemplate',
    props: ["label", "value"]
})
</script>
