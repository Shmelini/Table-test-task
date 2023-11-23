<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th @click="console.log(tableData)">#</th>
                    <th>Имя</th>
                    <th>Список диет</th>
                    <th>Тарифный план</th>
                    <th>Адрес</th>
                    <th>Номер телефона</th>
                    <th>Даты начала/конца</th>
                    <th>Скидка</th>
                    <th>Статус оплаты</th>
                    <th>Комментарий для курьера</th>
                    <th>Специфика заказа</th>
                    <th>Статус</th>
                </tr>
            </thead>
            <tbody>
                <TableRow v-for="client in tableData" :client="client"  :key="client.o_id" />
            </tbody>
        </table>
    </div>
</template>

<script>
import TableRow from '@/components/TableRow.vue'
import clientsData from '@/assets/data.json'
export default {
    components: {
        TableRow
    },
    data() {
        return {
            tableData: clientsData,
        }
    },

}
</script>

<style scoped>
table {
    border: 1px solid black;
    border-collapse: collapse;
}

th {
    border-right: 1px solid black;
}

td {
    text-align: center;
    border: 1px solid black;
    padding: 10px;
}

tbody>tr:nth-child(odd) {
    background-color: rgb(233, 233, 233);
}
</style>