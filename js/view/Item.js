import KanbanAPI from "../api/KanbanAPI.js";
import DropZone from "./DropZone.js";

export default class Item {
  constructor(id, content) {
    this.root = Item.createRoot();
    this.input = this.root.querySelector(".kanban__item-input");

    this.root.dataset.id = id;
    this.input.textContent = content;
    this.content = content;

    const bottomDropZone = new DropZone();
    this.root.appendChild(bottomDropZone.$root);

    const onBlur = () => {
      // onBlur가 발생 시점의 textContent를 가져온다
      const newContent = this.input.textContent.trim();

      if (this.content == newContent) return;

      this.content = newContent;
      KanbanAPI.updateItem(id, {
        content: this.content,
      });
    };

    this.input.addEventListener("blur", onBlur);
    this.root.addEventListener("dblclick", () => {
      const check = confirm("정말 삭제 하시겠습니까?");

      if (check) {
        KanbanAPI.deleteItem(id);

        this.input.removeEventListener("blur", onBlur);
        this.root.parentNode.removeChild(this.root);
      }
    });

    this.root.addEventListener("dragstart", (e) => {
      // drop되는 곳에 id 추가
      e.dataTransfer.setData("text/plain", id);
    });

    this.input.addEventListener("drop", (e) => {
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
