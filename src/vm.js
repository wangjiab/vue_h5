import util from './common/js/utils'
export default {
    data() {
        return {
            orderCount: null,
            courseCount: null,
            familyOrderCount: null,
            // serverMoney: 0,
            // courseMoney: 0,
            //  familyMoney: 0,
            //   allMoney: 0
        }
    },
    watch: {
        orderCount(newVal, oldVal) {
            if (util.isCorrectVal(newVal)) {
                let result = /^[0-9]*[1-9][0-9]*$/.test(newVal)
                if (!result) {
                    this.orderCount = oldVal;
                }
            }


        },
        courseCount(newVal, oldVal) {
            if (util.isCorrectVal(newVal)) {
                let result = /^[0-9]*[1-9][0-9]*$/.test(newVal)
                if (!result) {
                    this.courseCount = oldVal;
                }
            }

        },
        familyOrderCount(newVal, oldVal) {
            if (util.isCorrectVal(newVal)) {
                let result = /^[0-9]*[1-9][0-9]*$/.test(newVal)
                if (!result) {
                    this.familyOrderCount = oldVal;
                }
            }
        }
    },
    computed: {
        serverMoney() {
            let orderCount = util.isCorrectVal(this.orderCount) ? this.orderCount : 0;
            return orderCount * 500;
        },
        courseMoney() {
            let courseCount = util.isCorrectVal(this.courseCount) ? this.courseCount : 0
            if (courseCount < 10) {
                return courseCount * 500
            } else {
                return courseCount * 1000
            }
        },
        familyMoney() {
                let courseCount = util.isCorrectVal(this.courseCount) ? this.courseCount : 0
            let familyOrderCount = util.isCorrectVal(this.familyOrderCount) ? this.familyOrderCount : 0
            if (courseCount < 10) {
                return 0;
            } else if (courseCount >= 10 && courseCount < 100) {
                return familyOrderCount * 800;
            } else {
                return familyOrderCount * 1000;
            }
        },
        allMoney() {
            return this.serverMoney + this.courseMoney + this.familyMoney;
        }
    }
}