import KanbanAPI from "../api/KanbanAPI.js";
import DropZone from "./DropZone.js";
import Item from "./Item.js";

export default class Column {
  constructor(columnId, title) {
    this.columnId = columnId;
    this.title = title;
    this.render();
    this.manageEventListener();
  }

  render() {
    this.$root = Column.createRoot();
    this.$title = this.$root.querySelector(".kanban__column-title");
    this.$items = this.$root.querySelector(".kanban__column-items");
    this.$addItem = this.$root.querySelector(".kanban__add-item");

    this.$root.dataset.id = this.columnId;
    this.$title.textContent = this.title;

    // 상단 dropZone Render
    const $topDropZone = new DropZone();
    this.$items.appendChild($topDropZone.$root);

    // Items Render
    KanbanAPI.getItems(this.columnId).forEach((item) => {
      this.renderItem(item);
    });
  }

  static createRoot() {
    const range = document.createRange();

    return range.createContextualFragment(`
        <div class="kanban__column">
            <div class="kanban__column-title"></div>
            <div class="kanban__column-items"></div>
            <button class="kanban__add-item" type="button">+ Add</button>
        </div>
   `).children[0];
  }

  renderItem(data) {
    const item = new Item(data.id, data.content);

    this.$items.appendChild(item.root);
  }

  manageEventListener() {
    this.$addItem.addEventListener("click", () => {
      const newItem = KanbanAPI.insertItem(this.columnId, "");

      this.renderItem(newItem);
    });
  }
}
