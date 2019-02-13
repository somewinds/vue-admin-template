<!-- 自定义内容日历，参考element ui开发 -->
<!-- 可传参数：
    // 选择模式，day 单天、range 范围
    selectionMode: {
        default: 'day'
    },
    // 日期间隔，如 7（周） 30（月），selectionMode选择range时可用
    dateInterval: {
        default: null
    },
    // 选择方式为天的时候，日期是否可多选
    dateMultiple: {
        default: false
    },

    // 设置禁用状态，参数为当前日期，要求返回 Boolean
    disabledDate: {},
 -->
<!-- 可调用方法：

 -->
<!-- 将调用父级方法：
    this.$emit('datePickComplete', {
        selected_dates: this.selected_dates,
        min_date: this.min_date,
        max_date: this.max_date
    }, visible)
    // 生成单元格时，调用父级方法，父级处理cell，可通过父级为cell增加额外自定义参数
    this.$emit('handleCell', cell)
 -->
 <!-- 自定义扩展日期显示内容方法：
    <div slot="cell_expand" slot-scope="props">
        ￥ {{ props.cell | aaa }}
    </div>
 -->
<template lang="html">
  <div id="v-date-pick" class="calendars">
    <div class="el-picker-panel el-date-picker el-popper">
      <div class="el-picker-panel__body-wrapper">
        <div class="el-picker-panel__body">
          <div class="el-date-picker__header">
            <button
              :aria-label="year - 1"
              type="button"
              class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left"
              @click="prevYear"/>
            <button
              :aria-label="month"
              type="button"
              class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-arrow-left"
              @click="prevMonth"/>
            <span
              role="button"
              class="el-date-picker__header-label">{{ year }} 年</span>
            <span
              role="button"
              class="el-date-picker__header-label">{{ month + 1 }} 月</span>
            <button
              :aria-label="year + 1"
              type="button"
              class="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right"
              @click="nextYear"/>
            <button
              :aria-label="month + 2"
              type="button"
              class="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-arrow-right"
              @click="nextMonth"/>
          </div>

          <div class="el-picker-panel__content">
            <table
              :class="{ 'is-week-mode': selectionMode === 'week' }"
              class="el-date-table"
              cellspacing="0"
              cellpadding="0"
              @click="handleClick"
              @mousemove="handleMouseMove">
              <tbody>
                <tr>
                  <th v-if="showWeekNumber">{{ t('el.datepicker.week') }}</th>
                  <th v-for="(week, index) in WEEKS" :key="index">{{ t('el.datepicker.weeks.' + week) }}</th>
                </tr>
                <tr
                  v-for="(row, index) in rows"
                  :key="index"
                  class="el-date-table__row">
                  <td
                    v-for="(cell, index) in row"
                    :key="index"
                    :class="getCellClasses(cell)">
                    <div>
                      <span>
                        {{ cell.text }}
                      </span>
                    </div>

                    <slot :cell="cell" name="cell_expand"/>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div v-if="showTime" class="el-picker-panel__footer">
        <el-button
          type="danger"
          size="mini"
          class="el-picker-panel__link-btn"
          @click="handleClear">
          {{ t('el.datepicker.clear') }}
        </el-button>
        <el-button
          :disabled="btnDisabled"
          type="primary"
          size="mini"
          class="el-picker-panel__link-btn"
          @click="handleConfirm()">
          {{ t('el.datepicker.confirm') }}
        </el-button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" type="text/css">

    #v-date-pick{

        &.calendars{
            // @include center;

            .el-date-picker{
                width: 100%;
                box-sizing: border-box;

                .el-picker-panel__content{
                    width: 100%;
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0 15px 15px;

                    .el-date-table td{
                        width: 96px;
                        height: 90px;

                        &.current{

                        }
                    }
                }
            }
        }
    }

</style>

<script>
import {
  getFirstDayOfMonth,
  getDayCountOfMonth,
  getWeekNumber,
  getStartDateOfMonth,
  nextDate,
  // isDate,
  modifyDate,

  prevYear,
  nextYear,
  prevMonth,
  nextMonth
} from '../../plugins/util/index'
import defaultLang from '../../plugins/util/zh-CN'

const WEEKS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
const clearHours = function(time) {
  const cloneDate = new Date(time)
  cloneDate.setHours(0, 0, 0, 0)
  return cloneDate.getTime()
}

export default {
  name: 'VDatePick',
  // mixins: [Locale],
  props: {

    // 选择模式，day 单天、range 范围
    selectionMode: {
      type: String,
      default: 'day'
    },
    // 日期间隔，如 7（周） 30（月），selectionMode选择range时可用
    dateInterval: {
      type: Number,
      default: null
    },
    // 选择方式为天的时候，日期是否可多选
    dateMultiple: {
      type: Boolean,
      default: false
    },

    // 设置禁用状态，参数为当前日期，要求返回 Boolean
    disabledDate: {
      type: Object,
      default() {
        return {}
      }
    },

    // 暂时无用参数
    // 周起始日 Number  1 到 7   7
    firstDayOfWeek: {
      type: Number,
      default: 7,
      validator: val => val >= 1 && val <= 7
    },
    // 传入开始结束时间
    minDate: {
      type: Date,
      default: null
    },
    maxDate: {
      type: Date,
      default: null
    },
    // 传入选择的日期数组
    selectedDates: {
      type: Array,
      default: null
    },
    // 传入选择的单元格
    selectedCells: {
      type: Array,
      default: null
    },
    // 是否显示 “确认”、“取消”
    showTime: {
      type: Boolean,
      default: true
    },
    // “确认”按钮是否禁用
    btnDisabled: {
      type: Boolean,
      default: false
    },

    // 是否显示周index，即当前为第几周
    showWeekNumber: {
      type: Boolean,
      default: false
    }

    // defaultValue: {
    //     validator(val) {
    //         // either: null, valid Date object, Array of valid Date objects
    //         return val === null || isDate(val) || (Array.isArray(val) && val.every(isDate));
    //     }
    // },

  },
  data() {
    return {
      tableRows: [
        [],
        [],
        [],
        [],
        [],
        []
      ],
      // 当前日期
      date: new Date(),

      selected_dates: [], // 选择的日期数组
      selected_cells: [], // 选择的单元格，其中包括日期及自定义参数
      min_date: null, // 选择的开始日期
      max_date: null, // 选择的结束日期
      // 选择时间范围时的状态参数
      rangeState: {
        startDate: null,
        endDate: null,
        selecting: false,
        row: null,
        column: null
      }
    }
  },

  computed: {
    // 偏移的天数
    offsetDay() {
      const week = this.firstDayOfWeek
      // 周日为界限，左右偏移的天数，3217654 例如周一就是 -1，目的是调整前两行日期的位置
      return week > 3 ? 7 - week : -week
    },
    WEEKS() {
      const week = this.firstDayOfWeek
      return WEEKS.concat(WEEKS).slice(week, week + 7)
    },
    // 当年
    year() {
      return this.date.getFullYear()
    },
    // 当月
    month() {
      return this.date.getMonth()
    },
    // 当年当月起始日期
    startDate() {
      return getStartDateOfMonth(this.year, this.month)
    },
    // 日期行数组
    rows() {
      // TODO: refactory rows / getCellClasses
      const date = new Date(this.year, this.month, 1)
      let day = getFirstDayOfMonth(date) // day of first day
      const dateCountOfMonth = getDayCountOfMonth(date.getFullYear(), date.getMonth())
      const dateCountOfLastMonth = getDayCountOfMonth(date.getFullYear(), (date.getMonth() === 0 ? 11 : date.getMonth() - 1))

      day = (day === 0 ? 7 : day)

      const offset = this.offsetDay
      const rows = this.tableRows
      let count = 1
      let firstDayPosition

      const startDate = this.startDate
      const disabledDate = this.disabledDate
      const now = clearHours(new Date())

      for (var i = 0; i < 6; i++) {
        const row = rows[i]

        if (this.showWeekNumber) {
          if (!row[0]) {
            row[0] = {
              type: 'week',
              text: getWeekNumber(nextDate(startDate, i * 7 + 1))
            }
          }
        }

        for (var j = 0; j < 7; j++) {
          let cell = row[this.showWeekNumber ? j + 1 : j]
          if (!cell) {
            cell = {
              row: i,
              column: j,
              type: 'normal',
              inRange: false,
              start: false,
              end: false
            }
          }

          cell.type = 'normal'

          const index = i * 7 + j
          const time = nextDate(startDate, index - offset).getTime()
          cell.inRange = time >= clearHours(this.min_date) && time <= clearHours(this.max_date)
          cell.start = this.min_date && time === clearHours(this.min_date)
          cell.end = this.max_date && time === clearHours(this.max_date)
          const isToday = time === now

          if (isToday) {
            cell.type = 'today'
          }

          if (i >= 0 && i <= 1) {
            if (j + i * 7 >= (day + offset)) {
              cell.text = count++
              if (count === 2) {
                firstDayPosition = i * 7 + j
              }
            } else {
              cell.text = dateCountOfLastMonth - (day + offset - j % 7) + 1 + i * 7
              cell.type = 'prev-month'
            }
          } else {
            if (count <= dateCountOfMonth) {
              cell.text = count++
              if (count === 2) {
                firstDayPosition = i * 7 + j
              }
            } else {
              cell.text = count++ - dateCountOfMonth
              cell.type = 'next-month'
            }
          }
          cell.time = time // 该cell的时间戳
          cell.time_date = new Date(time) // 该cell的时间戳时间
          cell.date = new Date(date) // 该rows的国际时间，及当前日期块的起始时间

          // cell.date = date;
          // cell.time = 'next-month';

          cell.disabled = typeof disabledDate === 'function' && disabledDate(new Date(time))

          // 生成单元格时，调用父级方法，父级处理cell，可通过父级为cell增加额外自定义参数
          this.$emit('handleCell', cell)

          this.$set(row, this.showWeekNumber ? j + 1 : j, cell)
        }

        // if (this.selectionMode === 'week') {
        //     const start = this.showWeekNumber ? 1 : 0;
        //     const end = this.showWeekNumber ? 7 : 6;
        //     const isWeekActive = this.isWeekActive(row[start + 1]);

        //     row[start].inRange = isWeekActive;
        //     row[start].start = isWeekActive;
        //     row[end].inRange = isWeekActive;
        //     row[end].end = isWeekActive;
        // }
      }

      rows.firstDayPosition = firstDayPosition


      return rows
    }

  },
  watch: {
    selectionMode(newVal, oldVal) {
      Object.assign(this.$data, this.$options.data())
    },
    dateInterval(newVal, oldVal) {
      Object.assign(this.$data, this.$options.data())
    },
    dateMultiple(newVal, oldVal) {
      Object.assign(this.$data, this.$options.data())
    },
    'rangeState.endDate': function(newVal) {
      this.markRange(newVal)
    },
    // 开始时间
    minDate(newVal, oldVal) {
      this.min_date = this.minDate ? new Date(this.minDate) : this.min_date
    },
    // 结束时间
    maxDate(newVal, oldVal) {
      this.max_date = this.maxDate ? new Date(this.maxDate) : this.max_date
    },
    // 选择的时间
    selectedDates(newVal, oldVal) {
      this.selected_dates = this.selectedDates ? JSON.parse(JSON.stringify(this.selectedDates)) : this.selected_dates
    },

    // 开始时间
    min_date(newVal, oldVal) {
      if (newVal && !oldVal) {
        this.rangeState.selecting = true
        this.markRange(newVal)
      } else if (!newVal) {
        this.rangeState.selecting = false
        this.markRange(newVal)
      } else {
        this.markRange()
      }
    },
    // 结束时间
    max_date(newVal, oldVal) {
      if (newVal && !oldVal) {
        this.rangeState.selecting = false
        this.markRange(newVal)
        // this.$emit('pick', {
        //     min_date: this.min_date,
        //     max_date: this.max_date
        // });
      }
    }
  },
  methods: {
    init() {
      this.$nextTick(function() {
        Object.assign(this.$data, this.$options.data())
        this.max_date = this.maxDate ? new Date(this.maxDate) : this.max_date
        this.min_date = this.minDate ? new Date(this.minDate) : this.min_date
        this.selected_dates = this.selectedDates ? JSON.parse(JSON.stringify(this.selectedDates)) : this.selected_dates
        this.selected_cells = this.selectedCells ? JSON.parse(JSON.stringify(this.selectedCells)) : this.selected_cells
      })
    },
    // 语义化
    t(path) {
      let value = null
      if (value !== null && value !== undefined) return value

      const array = path.split('.')
      let current = defaultLang

      for (let i = 0, j = array.length; i < j; i++) {
        const property = array[i]
        value = current[property]
        if (i === j - 1) return value
        if (!value) return ''
        current = value
      }
      return ''
    },
    // 判断元素中是否含某样式
    hasClass(el, cls) {
      if (!el || !cls) return false
      if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.')
      if (el.classList) {
        return el.classList.contains(cls)
      } else {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
      }
    },
    // 判断cell日期是否为等于date（主要用于给予选中日期current样式）
    cellMatchesDate(cell, date) {
      const value = new Date(date)
      return this.year === value.getFullYear() &&
                    this.month === value.getMonth() &&
                    Number(cell.text) === value.getDate()
    },
    // 获得cell日期的样式
    getCellClasses(cell) {
      const selectionMode = this.selectionMode
      const selected_dates = this.selected_dates ? Array.isArray(this.selected_dates) ? this.selected_dates : [this.selected_dates] : []

      const classes = []
      if ((cell.type === 'normal' || cell.type === 'today') && !cell.disabled) {
        classes.push('available')
        if (cell.type === 'today') {
          classes.push('today')
        }
      } else {
        classes.push(cell.type)
      }

      // if (cell.type === 'normal' && defaultValue.some(date => this.cellMatchesDate(cell, date))) {
      //     classes.push('default');
      // }

      // 判断cell是否属于选择的日期数组中
      if (selectionMode === 'day' && (cell.type === 'normal' || cell.type === 'today') && selected_dates.some(date => this.cellMatchesDate(cell, date))) {
        classes.push('current')
      }

      // if (selectionMode === 'day' && (cell.type === 'normal' || cell.type === 'today') && this.cellMatchesDate(cell, this.selected_dates)) {
      //     classes.push('current');
      // }

      if (cell.inRange && ((cell.type === 'normal' || cell.type === 'today') || this.selectionMode === 'week')) {
        classes.push('in-range')

        if (cell.start) {
          classes.push('start-date')
        }

        if (cell.end) {
          classes.push('end-date')
        }
      }

      if (cell.disabled) {
        classes.push('disabled')
      }

      return classes.join(' ')
    },

    getDateOfCell(row, column) {
      const offsetFromStart = row * 7 + (column - (this.showWeekNumber ? 1 : 0)) - this.offsetDay
      return nextDate(this.startDate, offsetFromStart)
    },
    // isWeekActive(cell) {
    //     if (this.selectionMode !== 'week') return false;
    //     const newDate = new Date(this.year, this.month, 1);
    //     const year = newDate.getFullYear();
    //     const month = newDate.getMonth();

    //     if (cell.type === 'prev-month') {
    //         newDate.setMonth(month === 0 ? 11 : month - 1);
    //         newDate.setFullYear(month === 0 ? year - 1 : year);
    //     }

    //     if (cell.type === 'next-month') {
    //         newDate.setMonth(month === 11 ? 0 : month + 1);
    //         newDate.setFullYear(month === 11 ? year + 1 : year);
    //     }

    //     newDate.setDate(parseInt(cell.text, 10));

    //     return getWeekNumber(newDate) === getWeekNumber(this.date);
    // },
    markRange(max_date) {
      const startDate = this.startDate
      if (!max_date) {
        max_date = this.max_date
      }

      const rows = this.rows
      const min_date = this.min_date
      for (let i = 0, k = rows.length; i < k; i++) {
        const row = rows[i]
        for (let j = 0, l = row.length; j < l; j++) {
          if (this.showWeekNumber && j === 0) continue

          const cell = row[j]
          const index = i * 7 + j + (this.showWeekNumber ? -1 : 0)
          const time = nextDate(startDate, index - this.offsetDay).getTime()

          cell.inRange = min_date && time >= clearHours(min_date) && time <= clearHours(max_date)
          cell.start = min_date && time === clearHours(min_date.getTime())
          cell.end = max_date && time === clearHours(max_date.getTime())
        }
      }
    },
    // 鼠标在日前上滑动
    handleMouseMove(event) {
      if (!this.rangeState.selecting) return

      let target = event.target
      if (target.tagName === 'SPAN') {
        target = target.parentNode.parentNode
      }
      if (target.tagName === 'DIV') {
        target = target.parentNode
      }
      if (target.tagName !== 'TD') return

      const column = target.cellIndex
      const row = target.parentNode.rowIndex - 1
      const { row: oldRow, column: oldColumn } = this.rangeState

      // 更新鼠标所在位置的日期至rangeState
      if (oldRow !== row || oldColumn !== column) {
        this.rangeState.row = row
        this.rangeState.column = column
        this.rangeState.endDate = this.getDateOfCell(row, column)
      }
    },
    // 点击日期
    handleClick(event) {
      let target = event.target
      if (target.tagName === 'SPAN') {
        target = target.parentNode.parentNode
      }
      if (target.tagName === 'DIV') {
        target = target.parentNode
      }

      // 如果日期禁用，返回
      if (this.hasClass(target.parentNode, 'cell_expand')) {
        target = target.parentNode.parentNode
      }

      if (target.tagName !== 'TD') return

      // 如果日期禁用，返回
      if (this.hasClass(target, 'disabled')) return

      const selectionMode = this.selectionMode

      if (selectionMode === 'week') {
        target = target.parentNode.cells[1]
      }

      let year = Number(this.year)
      let month = Number(this.month)

      const cellIndex = target.cellIndex
      const rowIndex = target.parentNode.rowIndex

      const cell = this.rows[rowIndex - 1][cellIndex]
      const text = cell.text
      const className = target.className

      const newDate = new Date(year, month, 1)
      // cell.inRange = newDate
      // cell.start = newDate

      if (className.indexOf('prev') !== -1) {
        if (month === 0) {
          year = year - 1
          month = 11
        } else {
          month = month - 1
        }
        newDate.setFullYear(year)
        newDate.setMonth(month)
      } else if (className.indexOf('next') !== -1) {
        if (month === 11) {
          year = year + 1
          month = 0
        } else {
          month = month + 1
        }
        newDate.setFullYear(year)
        newDate.setMonth(month)
      }

      newDate.setDate(parseInt(text, 10))

      // 修改当前选择的日期
      this.date = modifyDate(this.date, newDate.getFullYear(), newDate.getMonth(), newDate.getDate())

      // cell.inRange = newDate // 标记颜色
      // cell.start = newDate
      if (this.selectionMode === 'range') {
        // 如果有日期间隔，直接算出结束日期
        if (this.dateInterval) {
          const min_date = new Date(newDate.getTime())
          const max_date = new Date(newDate.getTime() + (this.dateInterval - 1) * 24 * 60 * 60 * 1000)

          this.handleDatePick({
            min_date,
            max_date,
            cell
          })
          this.rangeState.startDate = min_date
          this.rangeState.endDate = max_date
          this.rangeState.selecting = false
          // this.$emit('pick', {
          //     min_date,
          //     max_date
          // }, false);
          this.markRange(this.min_date)
        } else {
          if (this.min_date && this.max_date) {
            const min_date = new Date(newDate.getTime())
            const max_date = null


            this.handleDatePick({
              min_date,
              max_date,
              cell
            })

            // this.$emit('pick', {
            //     min_date,
            //     max_date
            // }, false);
            this.rangeState.selecting = true
            this.markRange(this.min_date)
            this.$nextTick(() => {
              this.handleMouseMove(event)
            })
          } else if (this.min_date && !this.max_date) {
            if (newDate >= this.min_date) {
              const max_date = new Date(newDate.getTime())
              this.rangeState.selecting = false

              this.handleDatePick({
                min_date: this.min_date,
                max_date,
                cell
              })
              // this.$emit('pick', {
              //     min_date: this.min_date,
              //     max_date
              // });
            } else {
              const min_date = new Date(newDate.getTime())

              this.handleDatePick({
                min_date,
                max_date: this.max_date,
                cell
              })
              // this.$emit('pick', {
              //     min_date,
              //     max_date: this.max_date
              // }, false);
            }
          } else if (!this.min_date) {
            const min_date = new Date(newDate.getTime())

            this.handleDatePick({
              min_date,
              max_date: this.max_date,
              cell
            })

            // this.$emit('pick', {
            //     min_date,
            //     max_date: this.max_date
            // }, false);
            this.rangeState.selecting = true
            this.markRange(this.min_date)
          }
        }


      } else if (selectionMode === 'day') {
        this.rangeState.startDate = newDate
        this.rangeState.endDate = newDate
        this.rangeState.selecting = false
        this.handleDatePick({
          selected_date: newDate,
          cell
        })
      }
    },
    // 选择日期，处理日期
    handleDatePick(data) {
      if (this.selectionMode === 'day') {
        // // 如果数组中存在该值，移除该值
        // Array.prototype.remove = function (val) {
        //     let index = this.indexOf(val);
        //     if (index > -1) {
        //         this.splice(index, 1);
        //     }
        // };

        // 如果不是多选日期，先清空选中日期
        if (!this.dateMultiple) {
          this.selected_dates = []
          this.selected_cells = []
        }

        const time = data.selected_date.getTime()
        const cell = data.cell
        const index = this.selected_dates.indexOf(time)
        if (index < 0) {
          this.selected_dates.push(time)
          this.selected_cells.push(cell)
        } else {
          this.selected_dates.splice(index, 1)
          this.selected_cells.splice(index, 1)
        }
      } else if (this.selectionMode === 'range') {
        this.min_date = data.min_date
        this.max_date = data.max_date
        this.selected_cells = [data.cell]
      }
    },

    // 重置选择
    handleClear() {
      // this.data() = this.$options.data()
      Object.assign(this.$data, this.$options.data())
      // this.date = this.defaultValue ? new Date(this.defaultValue) : new Date();
      // this.$emit('pick', null);
    },
    // 确认选择
    handleConfirm(visible = false) {
      const data = {
        selected_dates: this.selected_dates,
        min_date: this.min_date,
        max_date: this.max_date,
        // targets_result: this.targets_result,
        selected_cells: this.selected_cells
      }
      this.$emit('datePickComplete', JSON.parse(JSON.stringify(data)))
      // this.$emit('pick', [this.minDate, this.maxDate], visible);
    },

    // 上一年
    prevYear() {
      this.date = prevYear(this.date)
    },
    // 下一年
    nextYear() {
      this.date = nextYear(this.date)
    },
    // 上一月
    prevMonth() {
      this.date = prevMonth(this.date)
    },
    // 下一月
    nextMonth() {
      this.date = nextMonth(this.date)
    }
  }
}
</script>
