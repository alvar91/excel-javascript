import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {$} from '@core/dom'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    })
  }

  toHTML() {
    return createTable(20)
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target)
      // const $parent = $resizer.$el.parentNode // bad!
      // const $parent = $resizer.$el.closest('.column') // better but bad
      const $parent = $resizer.closest('[data-type="resizable"]')
      const coords = $parent.getCoords()
      const type = $resizer.data.resize

      const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`)

      document.onmousemove = e => {
        if (type === 'col') {
          const delta = e.pageX - coords.right
          const value = coords.width + delta
          $parent.css({width: value + 'px'})
          cells.forEach(el => el.style.width = value + 'px')
        } else {
          const delta = e.pageY - coords.bottom
          const value = coords.height + delta
          $parent.css({height: value + 'px'})
        }
      }

      document.onmouseup = () => {
        document.onmousemove = null
      }
    }
  }
}

// 589 msScripting
// 2433 msRendering

// 440 msScripting
// 1771 msRendering
