export const myMixin = {
    methods: {
        getDateStatus(start, end) {
            const date = new Date()
            const startDate = new Date(start)
            const endDate = new Date(end)
            if (date < endDate && date > startDate) {
                return "is_going"
            }
            else if (date > endDate) {
                return "finished"
            }
            else if (date < endDate && date < startDate) {
                return "not_started"
            }
        },

    }
};