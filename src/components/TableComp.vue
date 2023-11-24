<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th @click="sortBy('id'), sortByDiffParams()">#</th>
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
                    <th @click="sortBy('status'), sortByDiffParams()">Статус</th>
                </tr>
            </thead>
            <tbody>
                <TableRow v-for="client in tableData" :client="client" :key="client.o_id" />
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
            sort_by: null,
            today: new Date()
        }
    },
    methods: {
        sortBy(attr) {
            if (this.sort_by === null || this.sort_by === `${attr}_asc`) {
                this.sort_by = `${attr}_desc`
            } else {
                this.sort_by = `${attr}_asc`
            }

        },
        sortByDiffParams() {
            switch (this.sort_by) {
                case 'id_asc':
                    this.tableData.sort((a, b) => a.o_id - b.o_id);
                    console.log(this.tableData[0].dates[0].start_date)
                    break;
                case 'id_desc':
                    this.tableData.sort((a, b) => b.o_id - a.o_id);
                    console.log(this.tableData[0].dates[0].start_date)
                    break;
                case 'status_asc':
                    this.tableData.sort(this.compareDates)

                    break;
                case 'status_desc':
                    this.tableData.sort(this.compareDatesRev)
                    break;
            }
        },

        // Создать функцию сравнения
        compareDates(date1, date2) {
            const start1 = new Date(date1.dates[0].start_date)
            const start2 = new Date(date2.dates[0].start_date)
            const end1 = new Date(date1.dates[0].end_date)
            const end2 = new Date(date2.dates[0].end_date)
            if (this.today - end1 > this.today - end2) {
                return -1
            }
            return 1
        },
        compareDatesRev(date1, date2) {
            const start1 = new Date(date1.dates[0].start_date)
            const start2 = new Date(date2.dates[0].start_date)
            const end1 = new Date(date1.dates[0].end_date)
            const end2 = new Date(date2.dates[0].end_date)
            if (this.today - end1 > this.today - end2) {
                return 1
            }
            return -1
        },
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