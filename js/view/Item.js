import KanbanAPI from "../api/KanbanAPI.js";
import DropZone from "./DropZone.js";

export default class Item {
  constructor(id, content) {
    const bottomDropZone = DropZone.createDropZone();

    this.elements = {};
    this.elements.root = Item.createRoot();
    this.elements.input = this.elements.root.querySelector(
      ".kanban__item-input"
    );

    this.elements.root.dataset.id = id;
    this.elements.input.textContent = content;
    this.content = content;
    this.elements.root.appendChild(bottomDropZone);

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
    this.elements.root.addEventListener("dblclick", () => {
      const check = confirm("정말 삭제 하시겠습니까?");

      if (check) {
        KanbanAPI.deleteItem(id);

        this.elements.input.removeEventListener("blur", onBlur);
        this.elements.root.parentNode.removeChild(this.elements.root);
      }
    });

    this.elements.root.addEventListener("dragstart", (e) => {
      // drop되는 곳에 id 추가
      e.dataTransfer.setData("text/plain", id);
    });

    this.elements.input.addEventListener("drop", (e) => {
      e.preventDefault();
    });
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
