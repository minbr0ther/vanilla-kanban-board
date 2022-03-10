import KanbanAPI from "../api/KanbanAPI.js";

export default class DropZone {
  constructor() {
    this.$root = DropZone.createRoot();
    this.manageEventListener();
  }

  static createRoot() {
    const range = document.createRange();

    range.selectNode(document.body);

    return range.createContextualFragment(`
        <div class="kanban__dropzone"></div>
    `).children[0];
  }

  manageEventListener() {
    // 드래그하면서 마우스가 대상 객체의 위에 자리 잡고 있을 때 발생함.
    this.$root.addEventListener("dragover", (e) => {
      e.preventDefault();
      this.$root.classList.add("kanban__dropzone--active");
    });

    // 드래그가 끝나서 마우스가 대상 객체의 위에서 벗어날 때 발생함.
    this.$root.addEventListener("dragleave", () => {
      this.$root.classList.remove("kanban__dropzone--active");
    });

    // 드래그가 끝나서 드래그하던 객체를 놓는 장소에 위치한 객체에서 발생함.
    this.$root.addEventListener("drop", (e) => {
      e.preventDefault();
      this.$root.classList.remove("kanban__dropzone--active");

      // drop이 되는 column 전체, id
      const columnElement = this.$root.closest(".kanban__column");
      const columnId = Number(columnElement.dataset.id);

      // dropZones중에서 event가 발생된 dropZone의 index 파악
      const targetIndex = this.getTargetIndex(columnElement);

      // drag되고 있는 item의 id
      const itemId = Number(e.dataTransfer.getData("text/plain"));

      this.rerender(itemId);

      // localStorage저장소(DB) 변경
      KanbanAPI.updateItem(itemId, {
        columnId,
        position: targetIndex,
      });
    });
  }

  getTargetIndex(columnElement) {
    // drop이 되는 column 전체의 dropZones 가져오기
    const dropZonesInColumn = Array.from(
      columnElement.querySelectorAll(".kanban__dropzone")
    );

    return dropZonesInColumn.indexOf(this.$root);
  }

  rerender(itemId) {
    // dropZone이 들어갈 Target
    //  - event가 발생된 dropZone의 부모
    //  - dropZone 부모가 'kanban__column-items' or 'kanban__item'
    const $target = this.$root.parentElement.classList.contains("kanban__item")
      ? this.$root.parentElement
      : this.$root;

    // drag되고 있는 item의 element
    const droppedItemElement = document.querySelector(`[data-id="${itemId}"]`);

    // 원래 자리에 놓으면 무시
    if (droppedItemElement.contains(this.$root)) return;

    // UI 변경
    $target.after(droppedItemElement);
  }
}
