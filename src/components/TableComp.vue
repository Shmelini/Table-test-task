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
import { myMixin } from '@/mixins/mixin'
export default {
    components: {
        TableRow
    },
    mixins: [myMixin],
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
                    this.tableData.sort(this.compareAsc)

                    break;
                case 'status_desc':
                    this.tableData.sort(this.compareDesc)
                    break;
            }
        },

        // Создать функцию сравнения
        compareDates(date1, date2, type) {
            // 'not_started'1
            // 'is_going'2
            // 'finished'3
            
            const start1 = new Date(date1.dates[0].start_date)
            const start2 = new Date(date2.dates[0].start_date)
            const end1 = new Date(date1.dates[0].end_date)
            const end2 = new Date(date2.dates[0].end_date)
            const status1 = this.getDateStatus(start1, end1)
            const status2 = this.getDateStatus(start2, end2)
            const sortVal1 = type === 'desc' ? 1 : -1
            const sortVal2 = type === 'desc' ? -1 : 1
            if (status1 === 'not_started') {
                if (status2 === 'not_started') {
                    return start1 > start2 ? sortVal1 : sortVal2
                }
                return sortVal1
            }
            if (status2 === 'not_started') {
                return sortVal2
            }
            if (status1 === 'is_going') {
                if (status2 === 'is_going') {
                    return end1 < end2 ? sortVal1 : sortVal2
                }
                return sortVal1
            }
            if (status2 === 'is_going') {
                return sortVal2
            }
            if (status2 === 'finished') {
                return end1 > end2 ? sortVal1 : sortVal2
            }
            return sortVal1
        },
        compareAsc(date1, date2) {
            return this.compareDates(date1, date2, 'asc')
        },
        compareDesc(date1, date2) {
            return this.compareDates(date1, date2, 'desc')
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