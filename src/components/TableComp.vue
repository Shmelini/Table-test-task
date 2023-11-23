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
                <TableRow />
            </tbody>
        </table>
    </div>
</template>

<script>
import TableRow from '@/components/TableRow.vue'

export default {
    components: {
        TableRow
    },
    data() {
        return {
        //    tHeadRow: [
        //     {id: 1, name: 'id', title: '#'},
        //     {id: 2, name: 'name', title: 'Имя'},
        //     {id: 3, name: 'diets', title: 'Список диет'},
        //     {id: 4, name: 'tariff', title: 'Тарифный план'},
        //     {id: 5, name: 'id', title: '#'},
        //     {id: 6, name: 'id', title: '#'},
        //     {id: 7, name: 'id', title: '#'},
        //     {id: 8, name: 'id', title: '#'},
        //     {id: 9, name: 'id', title: '#'},
        //     {id: 10, name: 'id', title: '#'},
        //     {id: 11, name: 'id', title: '#'},
        //     {id: 12, name: 'id', title: '#'},
        //    ]
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