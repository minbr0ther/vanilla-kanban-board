import KanbanAPI from "../api/KanbanAPI.js";

export default class Item {
  constructor(id, content) {
    this.elements = {};
    this.elements.root = Item.createRoot();
    this.elements.input = this.elements.root.querySelector(
      ".kanban__item-input"
    );

    this.elements.root.dataset.id = id;
    this.elements.input.textContent = content;
    this.content = content;

    const onBlur = () => {
      // onBlur가 발생 시점의 textContent를 가져온다
      const newContent = this.elements.input.textContent.trim();

      if (this.content == newContent) return;

      this.content = newContent;
      KanbanAPI.updateItem(id, {
        content: this.content,
      });
    };

    this.elements.input.addEventListener("blur", onBlur);
  }

  static createRoot() {
    const range = document.createRange();

    return range.createContextualFragment(`
        <div class="kanban__item" draggable="true">
            <div class="kanban__item-input" contenteditable="true">
            </div>
        </div>
    `).children[0];
  }
}
