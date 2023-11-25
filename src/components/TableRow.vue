<template>
    <tr>
        <td class="id">{{ client.o_id }}</td>
        <td class="name">{{ client.client_name }}</td>
        <td>
            <div v-for="diet in client.diets" class="multiple-items">{{ diet }}</div>
        </td>
        <td>
            <div v-for="singleTariff in client.tariff" class="multiple-items">{{ singleTariff }}</div>
        </td>
        <td>{{ client.address }}</td>
        <td>{{ client.phone }}</td>
        <td>
            <div v-for="date in client.dates" class="multiple-items">
                <div>{{ getDate(date.start_date) }}-</div>
                <div>{{ getDate(date.end_date) }}</div>
                <div class="days-left">
                    (<div v-if="daysPassed(date.start_date, date.end_date) >= 0">{{ daysPassed(date.start_date,
                        date.end_date) }}/</div>
                    <div>{{ daysTotal(date.start_date, date.end_date) }}</div>)
                </div>
            </div>
        </td>
        <td>{{ client.discount }}%</td>
        <td class="payment">
            <div>Стоим.:{{ client.order_sum }}</div>
            <div>{{ client.pay_status }}</div>
            <div>Долг:{{ client.order_payed }}</div>

        </td>
        <td>
            <div class="courier">{{ client.courier_comment }}</div>
        </td>
        <td>
            <div class="inner">{{ client.inner_comment }}</div>
        </td>
        <td class="status">
            <div v-for="date in client.dates" class="multiple-items">
                <div v-if="getDateStatus(date.start_date, date.end_date) === `is_going`">
                    Заканчивается через {{ daysLeft(date.start_date, date.end_date) }}
                    {{ wordEnd(daysLeft(date.start_date, date.end_date)) }}
                </div>
                <div v-else-if="getDateStatus(date.start_date, date.end_date) === `finished` && daysLeft(date.start_date, date.end_date) != 0 && daysLeft(date.start_date, date.end_date) != 1">
                    Завершилось {{ daysLeft(date.start_date, date.end_date) }} {{ wordEnd(daysLeft(date.start_date,
                        date.end_date)) }} назад
                </div>
                <div v-else-if="getDateStatus(date.start_date, date.end_date) === `finished` && daysLeft(date.start_date, date.end_date) === 0">
                    Завершилось сегодня
                </div>
                <div v-else-if="getDateStatus(date.start_date, date.end_date) === `finished` && daysLeft(date.start_date, date.end_date) === 1">
                    Завершилось вчера
                </div>
                <div v-else-if="getDateStatus(date.start_date, date.end_date) === `not_started`">
                    Начнется через {{ daysLeft(date.start_date, date.end_date) }} {{ wordEnd(daysLeft(date.start_date,
                        date.end_date)) }}
                </div>
            </div>
        </td>
    </tr>
</template>

<script>
import { myMixin } from '@/mixins/mixin'

export default {
    mixins: [myMixin],
    props: {
        client: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            options: {
                day: 'numeric',
                month: 'short'
            }
        }
    },
    methods: {
        // Преобразование даты в нужный вид
        getDate(date) {
            const transDate = new Date(date).toLocaleDateString('ru-RU', this.options)
            return transDate
        },
        // Высчитывание срока диеты
        daysTotal(start, end) {
            const startDate = new Date(start);
            const endDate = new Date(end);
            const timeDifference = endDate - startDate;
            const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            return daysDifference;
        },
        // Высчитывание прошедних дней диеты
        daysPassed(start, end) {
            const date = new Date()
            const startDate = new Date(start);
            const endDate = new Date(end);
            if (date < endDate) {
                const timeDifference = date - startDate
                const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
                return daysLeft
            }
        },

        // getDateStatus(start, end) {
        //     const date = new Date()
        //     const startDate = new Date(start)
        //     const endDate = new Date(end)
        //     if (date < endDate && date > startDate) {
        //         return "is_going"
        //     }
        //     else if (date > endDate) {
        //         return "finished"
        //     }
        //     else if (date < endDate && date < startDate) {
        //         return "not_started"
        //     }
        // },
        // Высчитывание оставшихся дней/дней после/дней до начала
        daysLeft(start, end) {
            const date = new Date()
            const startDate = new Date(start)
            const endDate = new Date(end)
            if (date < endDate && date > startDate) {
                const timeDifference = endDate - date
                let daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
                return daysLeft

            }
            else if (date > endDate) {
                const timeDifference = date - endDate
                const daysGone = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
                return daysGone
            }
            else if (date < endDate && date < startDate) {
                const timeDifference = startDate - date
                const daysBefore = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
                return daysBefore
            }
        },
        // Изменение окончаний
        wordEnd(date) {
            let result = ''
            switch (date) {
                case 1:
                    result = 'день';
                    break
                case 2:
                case 3:
                case 4:
                    result = 'дня';
                    break
                default:
                    result = 'дней';
                    break
            }
            return result
        }
    }
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

.id {
    background-color: chartreuse;
    color: #1874CF;
}

.name {
    color: #1874CF;
}

.days-left {
    display: flex;
    justify-content: center;
}

.payment {
    background-color: rgba(233, 104, 104, 0.6);
}

.payment div:not(:last-of-type) {
    margin-bottom: 10px;
}

.courier,
.inner {
    padding: 5px;
    border: 1px dashed rgb(207, 116, 116);
}

.courier::before {
    content: url(../assets/img/truck-svgrepo-com.svg);
    display: inline;
    position: relative;
    top: 3px;
    left: -2px;
}

.inner {
    background: rgba(226, 138, 138, 0.1);
}

.inner::before {
    content: url(../assets/img/chat-bubble-svgrepo-com.svg);
    display: inline;
    position: relative;
    top: 2px;
    left: -1px;
}

.status {
    background-color: rgba(138, 216, 226, 0.603);
}

.multiple-items {
    padding-top: 5px;
    padding-bottom: 5px;
}

.multiple-items:not(:last-child) {

    border-bottom: 1px dotted black;
}
</style>